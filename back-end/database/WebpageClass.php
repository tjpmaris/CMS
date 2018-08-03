<?php
    class Webpage{
        private $webpageName;
        private $webpageId;
        private $elements = array();

        public function __construct($webName, $webId){
            $this->webpageName = $webName;
            $this->webpageId = $webId;
        }

        public function addElementToPage(Element $element){
            array_push($this->elements, $element);
        }

        public function getPageName(){
            return $this->webpageName;
        }

        public function getPageId(){
            return $this->webpageId;
        }
        
        public function getElements(){
            return $this->elements;
        }
    }
?>