var elements = [];
var elementsToRemove = [];
var elementsToAdd = [];
var pages = [];
var pageToRemove;
var pageToAdd;
var mainPages = [];
var childPages= [];
var currentPageName;
var currentPage;
var editing = true;
var request = new XMLHttpRequest();    

function getData(){
    var url = 'http://localhost/php/cms/back-end/database/Webpage.php';

    request.open('GET', url);
    request.onload = webpagesCallback;
    request.send();
}

function webpagesCallback(){
    var results = JSON.parse(request.responseText);
    pages = results.pages;
    // console.log(pages);
    var path = window.location.pathname;
    if(currentPageName === undefined){
        currentPage = pages.find(s => s.details.isHome == true);
    }
    else{
        currentPage = pages.find(s => s.details.name == currentPageName);
    }

    // console.log(currentPage);
    elements = currentPage.elements;

    mainPages = pages.filter(s => s.details.parentId === null);
    childPages = pages.filter(s => s.details.parentId !== null);
    addLinksCallback(mainPages, childPages);
    addElementsCallback(elements);
}

function addElementsCallback(elements){
    if(editing){
        addPageDeleteButton();
        // startForm();
        elements.forEach(addFormElements);
        addSaveButton();
    } else{
        elements.forEach(addElement);
    }
}

function addPageDeleteButton(){
    var header = document.getElementById("NavBar");
    var button = document.createElement("button");
    button.innerHTML = "Remove Page";
    button.addEventListener('click', deletePageClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addSaveButton(){
    var header = document.getElementById("main-content");
    var button = document.createElement("button");
    button.innerHTML = "Save";
    button.addEventListener('click', saveClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function deletePageClick(){
    var url = 'http://localhost/php/cms/back-end/database/DeleteWebpage.php?id=' + currentPage.details.id;
    
    request.open('GET', url);
    request.onload = deletePageCallback;
    request.send();
}

function deletePageCallback(){
    hardRefresh();
}

function addElement(item, index) {
    var div = document.getElementById("main-content");
    var element = document.createElement(item.type);
    var content = document.createTextNode(item.content);
    element.appendChild(content);
    div.appendChild(element);
}

function startForm() {
    var div = document.getElementById("main-content");
    var form = document.createElement("form");
    form.id = "edit-form";
    div.appendChild(form);
}

function addFormElements(item, index){
    var form = document.getElementById("main-content");
    // var form = document.getElementById("edit-form");
    var div = document.createElement("div");
    div.id = item.name;
    div.style.borderBottom = "1px solid #000000";
    form.appendChild(div);
    
    var label = document.createElement("label");
    var labelContent = document.createTextNode(item.name);
    label.appendChild(labelContent);
    div.appendChild(label);

    if(item.type === "p"){
        var text = document.createElement("textarea");
        var textContent = document.createTextNode(item.content);

        text.appendChild(textContent);
        div.appendChild(text);
    } else {
        var input = document.createElement("input");
        input.type = "text";
        input.value = item.content

        div.appendChild(input);
    }
    
    var button = document.createElement("button");
    button.addEventListener('click', deleteElementClick);
    button.innerHTML = "Delete";
    div.appendChild(button);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag)
}

function deleteElementClick(evt){
    var elementId = elements.find(s => s.name === evt.target.parentElement.id).id;
    elementsToRemove.push(elementId);

    evt.target.parentElement.parentElement.removeChild(evt.target.parentElement);
    console.log(elementsToRemove);
}

function addLinksCallback(mainPages, childPages){
    mainPages.forEach(addMainLink);
    childPages.forEach(addChildLink);
}

function addMainLink(item, index) {
    var header = document.getElementById("NavBar");
    var button = document.createElement("button");
    button.innerHTML = item.details.name;
    button.addEventListener('click', linkClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addChildLink(item, index) {
    if(currentPage.details.id === item.details.parentId || currentPage.details.parentId === item.details.parentId){
        var header = document.getElementById("NavBar");
        var button = document.createElement("button");
        button.innerHTML = item.details.name;
        button.addEventListener('click', linkClick);
        header.appendChild(button);
        
        var btag = document.createElement("br");
        header.appendChild(btag);
    }
}

function linkClick(evt){
    currentPageName = evt.target.innerHTML;
    softRefresh();
}

function removePageElements() {
    var div = document.getElementById("main-content");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function removeNavBarElements() {
    var div = document.getElementById("NavBar");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function clearPage(){
    removePageElements();
    removeNavBarElements();
}

function softRefresh(){
    elements = [];
    elementsToRemove = [];
    elementsToAdd = [];
    pages = [];
    pageToRemove = undefined;
    pageToAdd = undefined;
    mainPages = [];
    childPages= [];
    currentPage = undefined;
    clearPage();
    webpagesCallback();
}

function hardRefresh(){
    elements = [];
    elementsToRemove = [];
    elementsToAdd = [];
    pages = [];
    pageToRemove = undefined;
    pageToAdd = undefined;
    mainPages = [];
    childPages= [];
    currentPageName = undefined;
    currentPage = undefined;
    clearPage();
    getData();
}

function saveClick(){
    elementsToRemove.forEach(deleteElementCall);
    elementsToRemove = [];

    editing = false;
}

function deleteElementCall(id, index){
    var url = 'http://localhost/php/cms/back-end/database/deleteelement.php?id=' + id;
    
        request.open('GET', url);
        request.send();
}
