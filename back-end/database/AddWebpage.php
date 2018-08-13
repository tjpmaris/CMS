<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "insert into webpage (";

    if(isset($_GET['name']) && isset($_GET['parentId']) && isset($_GET['isHome'])){
        $sql.= "name,";
        $sql.= "parentId,";
        $sql.= "isHome";
        $sql .= ")values(";
        $sql.= "'".$_GET['name']."',";
        $sql.= "'".$_GET['parentId']."',";
        $sql.= "".$_GET['isHome'];
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