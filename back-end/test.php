<?php
require_once "database/ThemeDb.class.php";
require_once "database/mysql.php";
require_once "authentication/authentication.php";

// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, Accept');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    exit;
}

header("Access-Control-Allow-Origin: *");

$connection = db_connection($DB_CONFIG);
$db = new ThemeDb($connection);
$theme = $db->query_site_theme();

// $db->set_site_theme($_GET['themeId']);

// $user = login(new UserDb($connection), "admin", "admin");

// echo json_encode(session_id());
echo json_encode($theme);
// echo var_dump($user);

?>