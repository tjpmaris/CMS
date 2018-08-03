<?php
    include 'mysql.php';
    include 'WebpageClass.php';
    include 'ElementClass.php';
    db_connection();
    //query all records from the database
    $query_webpages = "select * from webpage";
    $webPages = array();
    //execute the query
    $pages_result = $mysqli->query( $query_webpages );
    
    //get number of rows returned
    $num_results = $pages_result->num_rows;

    if( $num_results > 0){ 
        while( $row = $pages_result->fetch_assoc() ){
            extract($row);
            header("Access-Control-Allow-Origin: *");
            array_push($webPages, new WebpageClass($web_name, $webpage_id));
        }
    }else{
        //if database table is empty
    
    }
    //disconnect from database
    $result->free();
    $mysqli->close();
    $query_elements = "select * from elements";
    $elements_result = $mysqli->query( $query_elements );
    $num_results = $elements_result->num_rows;
    if( $num_results > 0){ 
          while( $row = $pages_result->fetch_assoc() ){
              extract($row);
              header("Access-Control-Allow-Origin: *");
              
          }
    }else{
      
    }
    $result->free();
    $mysqli->close();
?>