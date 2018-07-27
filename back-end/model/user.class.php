<?php

    class User {
        private $id;
        private $name;
        private $role;

        public function __construct(int $id, string $name, string $role) {
            $this->id = $id;
            $this->name = $name;
            $this->role = $role;
        }

        public function __get($get) {
            if ($get === 'id')
                return $this->id;
            if ($get === 'name')
                return $this->name;
            if ($get === 'role')
                return $this->role;

            throw Exception('Invalid property accessed: ' . $get);
        }
    }

?>