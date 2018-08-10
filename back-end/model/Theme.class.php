<?php

    class Theme {
        public $id;
        public $css;

        public function __construct($id, $name, $css) {
            $this->id = $id;
            $this->name = $name;
            $this->css = $css;
        }
    }



?>