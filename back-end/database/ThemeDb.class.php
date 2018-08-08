<?php
    require_once(realpath(dirname(__FILE__) . '/..') . '/model/Theme.class.php');

    class ThemeDb {
        private $db;

        public function __construct(mysqli $db) {
            $this->db = $db;
        }

        private function query_theme($theme_id) {
            $db = $this->db;
            $query = 'SELECT * FROM theme ' .
                'WHERE theme_id = ' . $db->real_escape_string($theme_id) . ';';

            $result = $db->query($query);

            if (!$result) {
                throw new Exception($db->error);
            }

            return $result->fetch_assoc();
        }

        private function query_rules($theme_id) {
            $db = $this->db;
            $query = 'SELECT * FROM theme_rule ' .
                'JOIN theme ON theme.theme_id = theme_rule.theme_id ' .
                'AND theme.theme_id = ' . $db->real_escape_string($theme_id);

            $result = $db->query($query);

            if (!$result) {
                throw new Exception($db->error);
            }

            $num_rows = $result->num_rows;
            $rules = array();

            if ($num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $rules[] = $row['rule_value'];
                }
            }

            return $rules;
        }

        private function query_properties($theme_id) {
            $db = $this->db;
            $query = 'SELECT theme_property.* FROM theme_property ' .
                'JOIN theme ON theme.theme_id = theme_property.theme_id ' .
                'AND theme.theme_id = ' . $db->real_escape_string($theme_id);

            $result = $db->query($query);

            if (!$result) {
                throw new Exception($db->error);
            }

            $num_rows = $result->num_rows;
            $properties = array();

            if ($num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $properties[] = (object)[
                        $row['property_name'] => $row['property_value']
                    ];
                }
            }

            return $properties;
        }

        public function query_theme_by_id($theme_id) {
            $theme = $this->query_theme($theme_id);
            $properties = $this->query_properties($theme_id);
            $rules = $this->query_rules($theme_id);

            return new Theme($theme['theme_id'], $theme['theme_name'], $properties, $rules);
        }

        public function query_all_themes() {
            $db = $this->db;
            $query = 'SELECT * FROM theme;';

            $result = $db->query($query);

            if (!$result) {
                throw new Exception($db->error);
            }

            $num_rows = $result->num_rows;
            $themes = array();

            if ($num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $themes[] = new Theme(row['theme_id'], row['theme_name'], null, null);
                }
            }

            return $themes;
        }
    }

?>