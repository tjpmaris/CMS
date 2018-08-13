var elements = [];
var pages = [];
var mainPages = [];
var childPages= [];
var currentPageName;
var currentPage;
var request = new XMLHttpRequest();    

function loadData() {
    
    if(filter != null && filter != ""){
      if (url.includes("?")) {
        url = url + "&"
      }
      else {
        url = url + "?";
      }
  
      url = url + "filter=" + filter;
    }
  
    if(gender != null && gender != ""){
      if (url.includes("?")) {
        url = url + "&"
      }
      else {
        url = url + "?";
      }
  
      url = url + "gender=" + gender;
    }
  
    if(limit != null && limit != ""){
      if (url.includes("?")) {
        url = url + "&"
      }
      else {
        url = url + "?";
      }
  
      url = url + "limit=" + limit;
    }
    
    request.open('GET', url);
    request.onload = loadComplete;
    request.send();
  }

function getData(){
    var url = 'http://localhost/php/cms/back-end/database/Webpage.php';

    request.open('GET', url);
    request.onload = webpagesCallback;
    request.send();

    //api call to get elements with page id 1
    elements.push({ type:"h1", content:"Some Header"});
    elements.push({ type:"p", content:"some information that is awesome"});
    elements.push({ type:"p", content:"some other information that is even more awesome than the first because it it soooooo much longer than the first"});
}

function webpagesCallback(){
    var results = JSON.parse(request.responseText);
    pages = results.pages;
    console.log(pages);
    var path = window.location.pathname;
    if(currentPageName === undefined){
        var tempname = path.substring(1, path.length - 1);
        tempname = tempname.charAt(0).toUpperCase() + tempname.substring(1);
        currentPage = pages.find(s => s.details.filepath == path && s.details.name == tempname);
    }
    else{
        currentPage = pages.find(s => s.details.filepath == path && s.details.name == currentPageName);
    }
    console.log(currentPage);
    elements = currentPage.elements;

    addElementsCallback(elements);
    addLinksCallback(pages, pages);
}

function addElementsCallback(elements){
    elements.forEach(addElement);
}

function addElement(item, index) {
    console.log(item);
    var div = document.getElementById("main-content");
    var element = document.createElement(item.type);
    var content = document.createTextNode(item.content);
    element.appendChild(content);
    div.appendChild(element);
}

function addLinksCallback(mainPages, childPages){
    mainPages.forEach(addMainLink);
    // notmainpages.forEach(addNotMainLink);
}

function addMainLink(item, index) {
    var header = document.getElementById("NavBar");
    var aTag = document.createElement('a');
    aTag.setAttribute('href', item.details.filepath);
    aTag.innerHTML = item.details.name;
    aTag.id = "MainLink" + item.details.name;
    header.appendChild(aTag);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addNotMainLink(item, index) {
    var header = document.getElementById("NavBar");
    var aTag = document.createElement('a');
    aTag.onclick = childPageLinkClick();
    aTag.innerHTML = item.name;
    header.appendChild(aTag);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function childPageLinkClick(){

}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function getNewElements(pagename){
    getElements();
}

document.getElementById("addPageButton").addEventListener("click", addPage)
function addPage(){
    var content = '<!DOCTYPE html\><html\><head\><link rel="stylesheet" href="../css/stylez.css"\></head\><body\><header id="NavBar"\>'+
    '</header\><div id="main-content"\></div\><script src="../scripts/script.js"></script\><script>getData();</script\></body\></html\>';
    var filePath = window.location.href;
    var file = new File(filePath);
    file.open("w");
    file.writeln(content);
    file.msClose();
}