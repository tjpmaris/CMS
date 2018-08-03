var elements = [];
elements.push({ type:"h1", content:"Some Header"})
elements.push({ type:"p", content:"some information that is awesome"})
elements.push({ type:"p", content:"some other information that is even more awesome than the first because it it soooooo much longer than the first"})

elements.forEach(addElement);

function addElement(item, index) {
    var div = document.getElementById("main-content");
    var element = document.createElement(item.type);
    var content = document.createTextNode(item.content);
    element.appendChild(content);
    div.appendChild(element);
}