<?php
    include 'mysql.php';
    include 'WebpageClass.php';
    db_connection();
    //query all records from the database
    $query_webpages = "select * from webpage";
    $query_elements = "select * from elements";
    
    //execute the query
    $pages_result = $mysqli->query( $query_webpages );
    $elements_result = $mysqli->query( $query_elements );
    
    //get number of rows returned
    $num_results = $pages_result->num_rows;

    if( $num_results > 0){ 
      $personJson = '{';
      $personJson .= '"pages": [';
        while( $row = $pages_result->fetch_assoc() ){
            extract($row);
            header("Access-Control-Allow-Origin: *");
            $personJson .= '{"webId":'.$webpage_id.',"webName":"'.$web_name.'", "elements":[{';
        }
      $personJson .= '}';
      $personJson = str_replace("},}", "}]}", $personJson);
      echo $personJson;
    }else{
        //if database table is empty
    
    }
    //disconnect from database
    $result->free();
    $mysqli->close();
?>