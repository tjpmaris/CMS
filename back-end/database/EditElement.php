<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    
    if(isset($_GET['id'])){
        $sql = 'UPDATE element SET ';
        
        if(isset($_GET['webpageId']))
            $sql.= "webpageId = '".$_GET["webpageId"]."',";
        
        if(isset($_GET['name']))
            $sql.= "name = '".$_GET["name"]."',";
        
        if(isset($_GET['content']))
            $sql.= "content = '".$_GET["content"]."',";

        if(isset($_GET['type']))
            $sql.= "`type` = '".$_GET["type"]."',";

        if(isset($_GET['color']))
            $sql.= "color = '".$_GET["color"]."',";

        if(isset($_GET['backgroundColor']))
            $sql.= "backgroundColor = '".$_GET["backgroundColor"]."',";

        if(isset($_GET['fontSize']))
            $sql.= "fontSize = '".$_GET["fontSize"]."',";
        
        if(isset($_GET['size']))
            $sql.= "`size` = '".$_GET["size"]."',";
            
        $sql = rtrim($sql, ",");
        $sql .= " WHERE id = ".$_GET["id"];

        if( !$mysqli->query($sql) ) {
            echo "Database Error: Unable to delete record.";
        }
    }
    else{
        echo "Invalid Request";
    }
    $mysqli->close();
?>