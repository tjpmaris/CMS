<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "insert into webpage (";

    if(isset($_GET['name']) && isset($_GET['filepath']) && isset($_GET['isParent'])){
        $sql.= "name,";
        $sql.= "filepath,";
        $sql.= "isParent";
        $sql .= ")values(";
        $sql.= "'".$_GET['name']."',";
        $sql.= "'".$_GET['filepath']."',";
        $sql.= "".$_GET['isParent'];
        $sql .= ");";
    
        if( !$mysqli->query($sql) ) {
            echo "Database Error: Unable to update record.";
        }
    }
    else
    {
        echo "Invalid Request";
    }

    $mysqli->close();
?>