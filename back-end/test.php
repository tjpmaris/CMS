<?php
require_once "database/ThemeDb.class.php";
require_once "database/mysql.php";

// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Accept');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    exit;
}

header("Access-Control-Allow-Origin: *");

$db = new ThemeDb(db_connection($DB_CONFIG));
$theme = $db->query_theme_by_id(1);

echo json_encode($theme);

?>