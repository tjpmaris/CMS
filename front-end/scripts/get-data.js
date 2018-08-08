var elements = [];
var pages = [];
var currentpage;

function getData(){
    //api call to get pages
    pages.push({ id:1, name:"Home", path:"/home/", filename:""});
    pages.push({ id:2, name:"About", path:"/about/", filename:""});
    pages.push({ id:3, name:"Contact Us", path:"/contact/", filename:""});

    var path = window.location.pathname;
    currentpage = pages.find(s => (s.path + s.filename) == path);
    console.log(currentpage);

    //api call to get elements with page id 1
    elements.push({ type:"h1", content:"Some Header"});
    elements.push({ type:"p", content:"some information that is awesome"});
    elements.push({ type:"p", content:"some other information that is even more awesome than the first because it it soooooo much longer than the first"});
    
    callback();
}

function callback(){
    addElementsCallback(elements);
    addLinksCallback(pages);
}