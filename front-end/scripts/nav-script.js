function addLinksCallback(mainpages, notmainpages){
    mainpages.forEach(addMainLink);
    notmainpages.forEach(addNotMainLink);
}

function addMainLink(item, index) {
    var header = document.getElementById("NavBar");
    var aTag = document.createElement('a');
    aTag.setAttribute('href', item.path);
    aTag.innerHTML = item.name;
    header.appendChild(aTag);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addNotMainLink(item, index) {
    var header = document.getElementById("NavBar");
    var aTag = document.createElement('a');
    aTag.onclick = 
    aTag.innerHTML = item.name;
    header.appendChild(aTag);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function getNewElements(pagename){
    
}
