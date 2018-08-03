console.log("things");
var pages = [];
pages.push({ name:"Home", path:"/home/", filename:""})
pages.push({ name:"About", path:"/about/", filename:""})
pages.push({ name:"Contact Us", path:"/contact/", filename:""})

pages.forEach(addLink);

function addLink(item, index) {
    var header = document.getElementById("NavBar");
    var aTag = document.createElement('a');
    aTag.setAttribute('href', item.path + item.filename);
    aTag.innerHTML = item.name;
    header.appendChild(aTag);
    
    var btag = document.createElement("br");
    header.appendChild(btag);
}
