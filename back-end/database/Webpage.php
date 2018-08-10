<?php
    include 'mysql.php';
    $mysqli = db_connection($DB_CONFIG);

    $query_webpages = "select * from webpage";
    $pages_result = $mysqli->query( $query_webpages );

    $query_elements = "select * from element";
    $elements_result = $mysqli->query( $query_elements );

    $elements = [];
    while($row = $elements_result->fetch_assoc()){
        array_push($elements, $row);
    }

    $response = "{ \"pages\" : [";

    while($row = $pages_result->fetch_assoc()){
        $json = json_encode($row);

        $response .= "{\"details\" : ";
        $response .= $json;
        $response .= ", \"elements\" : [";
        foreach($elements as $element){
            if($element["webpageId"] == $row["id"]){
                $json = json_encode($element);
                $response .= $json;
                $response .= ",";
            }
        }

        $response = rtrim($response, ",");
        $response .= "]},";
    }

    $response = rtrim($response, ",");
    $response .= "]}";

    $mysqli->close();
    echo $response;
?>