<?php
    class Element{
        $elementName;
        $elementId;
        $elementColor;
        $elementBackground;
        $elementType;
        $elementWebpageId;
        $elementFont;
        $elementSize;
        public function __construct($elementName,$elementId, $elementWebpageId, $elementColor, $elementBackground
        $elementType,$elementFont,$elementSize){
            $this->elementName = $elementName;
            $this->elementId = $elementId;
            $this->elementWebpageId = $elementWebpageId;
            $this->elementColor = $elementColor;
            $this->elementType = $elementType;
            $this->elementFont = $elementFont;
            $this->elementSize = $elementSize;
        }
    }
?>