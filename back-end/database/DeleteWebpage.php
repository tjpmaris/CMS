<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "delete from webpage where webpage_id = ".$_GET['id'];
    $mysqli->query($sql);
    $mysqli->close();
?>