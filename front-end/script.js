console.log("Things");
function addButtonClick(){
    console.log("Starting");
    var element = document.getElementById("add-widget");
    console.log(element);
    if(element.style.visibility === "hidden"){
        element.style.visibility = "visible";
        console.log("setting visible");
    }
    else{
        element.style.visibility = "hidden";
        console.log("setting hidden");
    }
}

function myFunction() {
    var x = document.getElementById('myDIV');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
    } else {
        x.style.visibility = 'hidden';
    }
}

function addButtonClick(){
    
}