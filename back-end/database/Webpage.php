<?php
    include 'mysql.php';
    include 'WebpageClass.php';
    include 'ElementClass.php';
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
            array_push($webPages, new Webpage($webpage_name, $webpage_id, $webpage_filename, $webpage_filepath));
        }
    }else{
        //if database table is empty
    
    }
    //disconnect from database
    $pages_result->free();
    $mysqli->close();

    $mysql = db_connection($DB_CONFIG);
    $query_elements = "select * from element";
    $elements_result = $mysql->query( $query_elements );
    $num_eleresults = $elements_result->num_rows;
    if($num_eleresults > 0){ 
        while( $row = $elements_result->fetch_assoc() ){
            extract($row);
            header("Access-Control-Allow-Origin: *");
            foreach($webPages as &$page){
                if($page->webpageId == $webpage_id){
                    $page->addElementToPage(new Element($element_name,$element_id, $webpage_id, $element_color, $element_background_color,$element_type,$element_font_size,$element_size));
                }
            }
        }
    }else{
      
    }
    $elements_result->free();
    $mysql->close();
    $responce = '{"pages":[';
    for($i = 0; $i < count($webPages); $i++){
        $page = $webPages[$i];
        $responce .= '{ "webpage_name":"'.$page->webpageName.'", "webpage_id":'.$page->webpageId;
        $responce .= ',"webpage_filename":"'.$page->webFileName.'", "webpage_file_path":"'.$page->webFilePath.'"';
        $responce .= ',"webpage_elements": [';
        foreach($page->elements as &$element){
            $responce .= '{"element_name":"'.$element->elementName.'","element_id":'.$element->elementId.',"element_color":"'.$element->elementColor.'","element_background":"';
            $responce .= $element->elementBackground.'","element_type":"'.$element->elementType.'","element_font":"'.$element->elementFont.'","element_size":';
            $responce .= $element->elementSize.'},';
        }
        $responce .= ']},';
    }
    $responce .= ']}';
    $responce = str_replace("},]}","}]}", $responce);
    echo $responce;
?>