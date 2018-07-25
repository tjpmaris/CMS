console.log("Things");

function myFunction() {
    var x = document.getElementById('myDIV');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
    } else {
        x.style.visibility = 'hidden';
    }
}

function visibleButtonClick(id){
    console.log("Starting");
    var element = document.getElementById(id);
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
