<?php

    class Theme {
        public $id;
        public $properties;
        public $rules;

        public function __construct($id, $properties, $rules) {
            $this->id = $id;
            $this->properties = $properties;
            $this->rules = rules;
        }
    }



?>