<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "insert into element (";

    if(isset($_GET['webpageId']) && isset($_GET['name']) && isset($_GET['content']) && isset($_GET['type'])){
        $sql.= "webpageId,";
        $sql.= "name,";
        $sql.= "content,";
        $sql.= "`type`,";

        if(isset($_GET['color']))
            $sql.= "color,";
        
        if(isset($_GET['backgroundColor']))
            $sql.= "backgroundColor,";

        if(isset($_GET['fontSize']))
            $sql.= "fontSize,";    
        
        if(isset($_GET['size']))
            $sql.= "`size`,";
        
        $sql = rtrim($sql, ",");
        $sql .= ")values(";
        $sql.= $_GET['webpageId'].",";
        $sql.= "'".$_GET['name']."',";
        $sql.= "'".$_GET['content']."',";
        $sql.= "'".$_GET['type']."',";

        if(isset($_GET['color']))
            $sql.= "'".$_GET['color']."',";
            
        if(isset($_GET['backgroundColor']))
            $sql.= "'".$_GET['backgroundColor']."',";

        if(isset($_GET['fontSize']))
            $sql.= "'".$_GET['fontSize']."',";

        if(isset($_GET['size']))
            $sql.= "'".$_GET['size']."',";
        
        $sql = rtrim($sql, ",");
        $sql .= ");";
        if( !$mysqli->query($sql) ) {
            echo "Database Error: Unable to update record.";
        }
    }
    else{
        echo "Invalid Request";
    }

    $mysqli->close();
?>