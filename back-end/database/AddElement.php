<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);
    $sql = "insert into element (webpage_id, element_name,element_content, element_type, element_color, element_background_color, element_font_size, element_size)
    values(".$_GET["id"].",'".$_GET["name"]."','".$_GET["content"]."','".$_GET["type"]."','".$_GET["color"]."','".$_GET["background"]."',".$_GET["font"].",".$_GET["size"].")";
    $mysqli->query($sql);
    $mysqli->close();
    echo "Element Inserted";
?>