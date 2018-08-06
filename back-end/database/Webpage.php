<?php
    include 'mysql.php';
    include 'WebpageClass.php';
    // include 'ElementClass.php';
    $mysqli = db_connection($DB_CONFIG);
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
            echo $webpage_id." ".$webpage_name." ".$webpage_filename." ".$webpage_filepath."<br/>";
            array_push($webPages, new Webpage($webpage_name, $webpage_id));
        }
    }else{
        //if database table is empty
    
    }
    //disconnect from database
    $pages_result->free();
    $mysqli->close();

    $mysql = db_connection($DB_CONFIG);
    $query_elements = "select * from elements";
    $elements_result = $mysql->query( $query_elements );
    echo $elements_result."resutlsa;hgdks";
    // echo $elements_result->num_rows;
    // $num_eleresults = $elements_result->num_rows;
    if(true){//$num_eleresults > 0){ 
          while( $row = $elements_result->fetch_assoc() ){
              extract($row);
              header("Access-Control-Allow-Origin: *");
              echo $webpage_id." ".$element_name." ".$element_id." ".$element_content."<br/>";
              //$webPages[$webpage_id]->addElementToPage(new ElementClass($element_id, $element_name));
          }
    }else{
      
    }
    $elements_result->free();
    $mysql->close();
?>