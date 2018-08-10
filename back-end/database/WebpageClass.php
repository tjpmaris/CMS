<?php
    class Webpage{
        public $webpageName;
        public $webpageId;
        public $webFileName;
        public $webFilePath;
        public $isParentPage;
        public $elements = array();

        public function __construct($webName, $webId, $webFileName, $webFilePath, $isParentPage){
            $this->webpageName = $webName;
            $this->webpageId = $webId;
            $this->webFileName = $webFileName;
            $this->webFilePath = $webFilePath;
            $this->isParentPage = $isParentPage;
        }

        public function addElementToPage(Element $element){
            array_push($this->elements, $element);
        }
    }
?>