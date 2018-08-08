<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "delete from element where element_id =".$_GET['id'];
    $mysqli->query($sql);
    $mysqli->close();
?>