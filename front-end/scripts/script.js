var elements = [];
var elementsToRemove = [];
var elementsToAdd = [];
var pages = [];
var pageToAdd;
var mainPages = [];
var childPages= [];
var currentPageName;
var currentPage;
var editing = false;
var allTypes = ["p", "h1"];
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
        addPageCreateButton();
        elements.forEach(addFormElements);
        addAddButton();
        addSaveButton();
    } else{
        elements.forEach(addElement);
        if(isUserLoggedIn(session)){
            addEditButton();            
        }
    }
}

function addLoginButton(){
    var header = document.getElementById("NavBar");
    var button = document.createElement("button");

    button.innerHTML = "Login";
    button.addEventListener('click', loginClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addLogoutButton(){
    var header = document.getElementById("NavBar");
    var button = document.createElement("button");

    button.innerHTML = "Logout";
    button.addEventListener('click', logoutClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function logoutClick(){
    var url = "http://localhost/php/cms/back-end/logout.php";

    logout(url);
}

function loginClick(){
    removeMainContentElements();
    removeButtonDivElements();

    var form = document.getElementById("main-content");
    var div = document.createElement("div");
    div.id = "login-div";
    form.appendChild(div);
    
    var label = document.createElement("label");
    var labelContent = document.createTextNode("Username:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);

    var label = document.createElement("label");
    var labelContent = document.createTextNode("Password:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);
    
    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);
    
    var button = document.createElement("button");
    button.addEventListener('click', loginFormFinish);
    button.innerHTML = "Login";
    div.appendChild(button);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag)
}

function addEditButton(){
    var header = document.getElementById("main-content");
    var button = document.createElement("button");

    button.innerHTML = "Edit";
    button.addEventListener('click', editClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function editClick(){
    editing = true;
    softRefresh();
}

function deletePageClick(){
    var url = 'http://localhost/php/cms/back-end/database/DeleteWebpage.php?id=' + currentPage.details.id;
    
    request.open('GET', url);
    request.onload = deletePageCallback;
    request.send();
}

function createPageClick(){
    removeMainContentElements();
    removeButtonDivElements();

    var form = document.getElementById("main-content");
    var div = document.createElement("div");
    div.id = "create-page-div";
    form.appendChild(div);
    
    var label = document.createElement("label");
    var labelContent = document.createTextNode("Page Name:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);

    var label = document.createElement("label");
    var labelContent = document.createTextNode("Parent Page Name:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);
    
    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);
    
    var button = document.createElement("button");
    button.addEventListener('click', addPage);
    button.innerHTML = "Save";
    div.appendChild(button);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag)
}

function loginFormFinish(){
    var div = document.getElementById("login-div");
    var children = div.children;

    var username = children[1].value;
    var password = children[4].value;
    var url = "http://localhost/php/cms/back-end/login.php";

    console.log(username);
    console.log(password);
    console.log(url);
    login(url, session, username, password).then(e => {
        console.log("Admin logged in:", isUserLoggedIn(session));
        softRefresh();
    }).catch(error => console.log(error));
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

function addPageCreateButton(){
    var header = document.getElementById("NavBar");
    var button = document.createElement("button");

    button.innerHTML = "Add Page";
    button.addEventListener('click', createPageClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addSaveButton(){
    var header = document.getElementById("button-div");
    var button = document.createElement("button");

    button.innerHTML = "Save";
    button.addEventListener('click', saveClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addAddButton(){
    var header = document.getElementById("button-div");
    var button = document.createElement("button");

    button.innerHTML = "Add";
    button.addEventListener('click', addClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function addClick(){
    var elementName = "New Element " + (elementsToAdd.length + 1);
    var form = document.getElementById("main-content");
    var div = document.createElement("div");
    div.id = elementName;
    div.style.borderBottom = "1px solid #000000";
    form.appendChild(div);
    
    var nameInput = document.createElement("input");
    nameInput.value = elementName;
    div.appendChild(nameInput);
    
    var text = document.createElement("textarea");
    var textContent = document.createTextNode("Input your text here");
    text.appendChild(textContent);
    div.appendChild(text);

    var dropdown = document.createElement("select");
    allTypes.forEach((item, index) => dropdown.options.add(new Option(item, item)));
    dropdown.selectedIndex = 0;
    div.appendChild(dropdown);
    
    var button = document.createElement("button");
    button.addEventListener('click', deleteElementClick);
    button.innerHTML = "Delete";
    div.appendChild(button);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag)

    elementsToAdd.push(elementName);
}

function addEditButton(){
    var header = document.getElementById("main-content");
    var button = document.createElement("button");

    button.innerHTML = "Edit";
    button.addEventListener('click', editClick);
    header.appendChild(button);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}

function editClick(){
    editing = true;
    softRefresh();
}

function deletePageClick(){
    var url = 'http://localhost/php/cms/back-end/database/DeleteWebpage.php?id=' + currentPage.details.id;
    
    request.open('GET', url);
    request.onload = deletePageCallback;
    request.send();
}

function createPageClick(){
    removeMainContentElements();
    removeButtonDivElements();

    var form = document.getElementById("main-content");
    var div = document.createElement("div");
    div.id = "create-page-div";
    form.appendChild(div);
    
    var label = document.createElement("label");
    var labelContent = document.createTextNode("Page Name:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);

    var label = document.createElement("label");
    var labelContent = document.createTextNode("Parent Page Name:");
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.type = "text";
    div.appendChild(input);
    
    var breakTag = document.createElement("br");    
    div.appendChild(breakTag);

    // var label = document.createElement("label");
    // var labelContent = document.createTextNode("Is Home Page:");
    // label.appendChild(labelContent);
    // div.appendChild(label);
    
    // var input = document.createElement("input");
    // input.type = "checkbox";
    // div.appendChild(input);
    
    // var breakTag = document.createElement("br");    
    // div.appendChild(breakTag);
    
    var button = document.createElement("button");
    button.addEventListener('click', addPage);
    button.innerHTML = "Save";
    div.appendChild(button);

    var breakTag = document.createElement("br");    
    div.appendChild(breakTag)
}

function addPage(evt){
    var div = document.getElementById("create-page-div");
    var children = div.children;

    var page = {};
    page.name = children[1].value;
    page.parentId = pages.find(s => s.details.name === children[4].value).details.id;

    addPageCall(page);
}

function addPageCall(page){
    var url = 'http://localhost/php/cms/back-end/database/AddWebpage.php?';
    url += "name=" + page.name;
    url += "&parentId=" + page.parentId;
    url += "&isHome=" + false;

    var url = encodeURI(url);
    console.log(url);
    
    request.open('GET', url);
    request.onload = deletePageCallback;
    request.send();
}

function addPageCallback(){
    hardRefresh();
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

function addFormElements(item, index){
    var form = document.getElementById("main-content");
    var div = document.createElement("div");
    div.id = item.name;
    div.style.borderBottom = "1px solid #000000";
    form.appendChild(div);
    
    var label = document.createElement("label");
    var labelContent = document.createTextNode(item.name);
    label.appendChild(labelContent);
    div.appendChild(label);
    
    var dropdown = document.createElement("select");
    allTypes.forEach((item, index) => dropdown.options.add(new Option(item, item)));

    if(item.type === "p"){
        var text = document.createElement("textarea");
        var textContent = document.createTextNode(item.content);

        text.appendChild(textContent);
        div.appendChild(text);

        dropdown.selectedIndex = 0;
    } else {
        var input = document.createElement("input");
        input.type = "text";
        input.value = item.content

        div.appendChild(input);

        dropdown.selectedIndex = 1;
    }

    div.appendChild(dropdown);
    
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
}

function addLinksCallback(mainPages, childPages){
    if(isUserLoggedIn(session)){
        addLogoutButton();
    } else{
        addLoginButton();            
    }
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

function removeMainContentElements() {
    var div = document.getElementById("main-content");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function removeButtonDivElements() {
    var div = document.getElementById("button-div");

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
    removeMainContentElements();
    removeButtonDivElements();
    removeNavBarElements();
}

function softRefresh(){
    elements = [];
    elementsToRemove = [];
    elementsToAdd = [];
    pages = [];
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
    pageToAdd = undefined;
    mainPages = [];
    childPages= [];
    currentPageName = undefined;
    currentPage = undefined;
    clearPage();
    getData();
}

function saveClick(){
    if(elementsToRemove.length > 0){
        var id = elementsToRemove.pop();
        var index = elements.indexOf(elements.find(s => s.id == id));

        if (index > -1) {
          elements.splice(index, 1);
        }

        deleteElementCall(id);
    } else if(elements.length > 0){
        var originalElement = elements.pop();
        var element = { id: originalElement.id };

        constructEditElement(originalElement.name, element);
        updateElementCall(element);
    } else if(elementsToAdd.length > 0){
        var tempName = elementsToAdd.splice(0, 1);
        var element = {webpageId: currentPage.details.id};
        console.log(tempName);
        constructAddElement(tempName, element);
        console.log(element);
        addElementCall(element);
    } else{
        editing = false;
        hardRefresh();
    }
}

function constructAddElement(elementName, element){
    var div = document.getElementById(elementName);
    var children = div.children;

    element.name = children[0].value;
    element.content = children[1].value;  
    element.type = children[2].options[children[2].selectedIndex].value;
}

function constructEditElement(elementName, element){
    var div = document.getElementById(elementName);
    var children = div.children;

    element.content = children[1].value;  
    element.type = children[2].options[children[2].selectedIndex].value;
}

function addElementCall(element){
    var url = 'http://localhost/php/cms/back-end/database/AddElement.php?';
    url += "webpageId=" + element.webpageId;
    url += "&name=" + element.name;
    url += "&content=" + element.content;
    url += "&type=" + element.type;

    var url = encodeURI(url);
    console.log(url);
    request.open('GET', url);
    request.onload = saveClick;
    request.send();
}

function updateElementCall(element){
    var url = 'http://localhost/php/cms/back-end/database/EditElement.php?';
    url += "id=" + element.id;
    url += "&content=" + element.content;
    url += "&type=" + element.type;

    var url = encodeURI(url);
    request.open('GET', url);
    request.onload = saveClick;
    request.send();
}

function deleteElementCall(id){
    var url = 'http://localhost/php/cms/back-end/database/DeleteElement.php?id=' + id;
    request.open('GET', url);
    request.onload = saveClick;
    request.send();
}
