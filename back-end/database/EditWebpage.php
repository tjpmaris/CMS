<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);

    if(isset($_GET['id'])){
        $sql = 'UPDATE webpage SET ';
        
        if(isset($_GET['name']))
            $sql.= "name = '".$_GET["name"]."',";
        
        if(isset($_GET['filepath']))
            $sql.= "filepath = '".$_GET["filepath"]."',";
        
        if(isset($_GET['isParent']))
            $sql.= "isParent = '".$_GET["isParent"]."',";
            
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