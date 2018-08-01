function visibleButtonClick(id){
    var element = document.getElementById(id);

    if(element.style.visibility === "hidden"){
        element.style.visibility = "visible";
    }
    else{
        element.style.visibility = "hidden";
    }
}

function hideEditWidget(){
    var element = document.getElementById("edit-widget");
    element.style.visibility = "hidden";
}

function showEditWidget(){
    var element = document.getElementById("edit-widget");
    element.style.visibility = "visible";
}

function hideAddWidget(){
    var element = document.getElementById("add-widget");
    element.style.visibility = "hidden";
}

function showAddWidget(){
    var element = document.getElementById("add-widget");
    element.style.visibility = "visible";
}

function hideAddButton(){
    var element = document.getElementById("add-button");
    element.style.visibility = "hidden";
}

function showAddButton(){
    var element = document.getElementById("add-button");
    element.style.visibility = "visible";
}

function addParagraph(){
    var id = ID();

    var para = document.createElement("P");
    var t = document.createTextNode(id);
    para.appendChild(t);
    var main = document.getElementById("main-content");
    main.appendChild(para);

    var edit = document.createElement("TextArea");
    var t2 = document.createTextNode(id);
    edit.appendChild(t2);
    var main = document.getElementById("main-content");
    main.appendChild(edit);
    edit.style.display = "none";
}

var ID = function () {
    return Math.random().toString(36).substr(2, 9);
  };
