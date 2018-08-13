<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);

    if(isset($_GET["id"])){
        $sql = "delete from webpage where id =".$_GET['id'];

        if( !$mysqli->query($sql) ) {
            echo "Database Error: Unable to delete record.";
        }
    }
    else{
        echo "Invalid Request";
    }

    $mysqli->close();
?>