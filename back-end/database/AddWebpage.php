<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "insert into webpage (webpage_name, webpage_filepath, webpage_filename)
    values('".$_GET['name']."', '".$_GET['path']."','".$_GET['filename']."')";
    $mysqli->query($sql);
    $mysqli->close();
    echo $_GET['name']."<br/>";
    echo $_GET['path']."<br/>";
    echo $_GET['filename']."<br/>";
    echo "inserted";
?>