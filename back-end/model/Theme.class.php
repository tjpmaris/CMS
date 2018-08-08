<?php

    class Theme {
        public $id;
        public $name;
        public $properties;
        public $rules;

        public function __construct($id, $name, $properties, $rules) {
            $this->id = $id;
            $this->name = $name;
            $this->properties = $properties;
            $this->rules = $rules;
        }
    }



?>