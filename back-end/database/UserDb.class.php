<?php
    require_once(realpath(dirname(__FILE__) . '/..') . '/model/User.class.php');

    class UserDb {
        private $db;

        public function __construct(mysqli $db) {
            $this->db = $db;
        }

        public function try_login_user($username, $password) {
            $result = $this->query_by_name($username);

            $valid_password = password_verify($password, $result['password']);
            if (!$valid_password) {
                return null;
            }

            return new User($result['id'], $result['name'], $result['role']);
        }

        private function query_by_name($name) {
            $db = $this->db;
            $query = 
                'SELECT id, name, role, password ' .
                'FROM users ' .
                "WHERE name = '" . $db->real_escape_string($name) . "';";

            $result = $db->query($query);
            if (!$result) {
                throw new Exception($db->error);
            }

            return $result->fetch_assoc();
        }

        public function try_add_user(User $user, $raw_password) {
            $existing_user = $this->query_by_name($user->name);

            if ($existing_user) {
                return null;
            }

            $hashed_password = UserDb::encrypt_password($raw_password);
            $id = $this->add_user($user, $hashed_password);

            return new User($id, $user->name, $user->role);
        }

        private function add_user(User $user, $hashed_password) {
            $db = $this->db;

            $query =
                'INSERT INTO users (name, role, password) VALUES(' .
                "'" . $db->real_escape_string($user->name) . "'," .
                "'" . $db->real_escape_string($user->role) . "'," .
                "'" . $db->real_escape_string($hashed_password) . "');";

            $result = $db->query($query);
            if (!$result) {
                throw new Exception($db->error);
            }

            return $db->insert_id;
        }

        private static function encrypt_password($password) {
            return password_hash($password, PASSWORD_BCRYPT);
        }

        public function seed() {
            $existing_admin = $this->query_by_name('admin');

            if ($existing_admin) {
                return;
            }

            $user = new User(0, 'admin', 'admin');
            $password = 'admin';
            $this->try_add_user($user, $password);
        }
        
    }

?>