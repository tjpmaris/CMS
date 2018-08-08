<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = 'UPDATE element SET webpage_id ='.$_GET["webId"].', element_name="'.$_GET["name"].'",element_content="'.$_GET["content"].'", element_type="'.$_GET["type"];
    $sql .= '", element_color="'.$_GET["color"].'", element_background_color="'.$_GET["background"].'", element_font_size='.$_GET["font"].', element_size ='.$_GET["size"];
    $sql .= ' WHERE element_id = '.$_GET["elementId"];
    $mysqli->query($sql);
    $mysqli->close();
?>