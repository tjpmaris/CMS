function addElementsCallback(elements){
    elements.forEach(addElement);
}

function addElement(item, index) {
    var div = document.getElementById("main-content");
    var element = document.createElement(item.type);
    var content = document.createTextNode(item.content);
    element.appendChild(content);
    div.appendChild(element);
}