<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="stylez.css">
    </head>

    <body>
        <div class="container">
            <div id="main-content" class="main-content">

            </div>

            <div id="add-widget" class="add-widget">
            
            </div>

            <div id="edit-widget" class="edit-widget">
                <button id="edit-button" class="edit-button" onclick="visibleButtonClick('edit-widget')">X</button>

            </div>

            <button id="add-button" class="add-button" onclick="visibleButtonClick('add-widget')">Add</button>



        </div>
            <script>
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
            </script>

            <!-- <script src="script.js"></script> -->
    </body>
</html>