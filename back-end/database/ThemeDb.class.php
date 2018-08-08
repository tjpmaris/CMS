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


        public function query_theme_by_id($theme_id) {
            $theme = $this->query_theme($theme_id);
            return new Theme($theme['theme_id'], $theme['theme_name'], $theme['theme_css']);
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
                    $themes[] = new Theme(row['theme_id'], row['theme_name'], row['theme_css']);
                }
            }

            return $themes;
        }
    }

?>