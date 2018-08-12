<?php
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

if (isset($_GET['userName']) && isset($_GET['password'])) {
    $connection = db_connection($DB_CONFIG);
    $db = new UserDb($connection);
    $user = login($db, $_GET['userName'], $_GET['password']);
    
    echo json_encode(session_id());
} else {
    http_response_code(400);
}

?>