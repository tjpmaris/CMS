<?php
include 'mysql.php';
$mysqli = db_connection($DB_CONFIG);
$sql = 'UPDATE webpage SET webpage_name ="'.$_GET["name"].'", webpage_filename="'.$_GET["fileName"].'",webpage_filepath="'.$_GET["filePath"].'" WHERE webpage_id = '.$_GET["id"];
$mysqli->query($sql);
$mysqli->close();
?>