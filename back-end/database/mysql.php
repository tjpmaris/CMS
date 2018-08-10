<?php

$DB_CONFIG = array(
    'host' => 'localhost',
    'username' => 'tom',
    'password' => 'pass',
    'db_name' => 'cmsphp'
);

function db_connection($db_config)
{
    $mysqli = new mysqli(
        $db_config['host'],
        $db_config['username'],
        $db_config['password'],
        $db_config['db_name']
    );
    
    if(mysqli_connect_errno()) {
        throw new Exception('Error: Could not connect to database. ' . mysqli_connection_errno());
    }

    return $mysqli;
}

?>