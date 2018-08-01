<?php
    require_once(realpath(dirname(__FILE__) . '/..') . '/database/mysql.php');
    require_once(realpath(dirname(__FILE__) . '/..') . '/database/UserDb.class.php');

    function add_user_to_session(User $user) {
        session_start();
        $_SESSION['user'] = $user;
    }

    function retrieve_user_from_session() {
        session_start();
        session_regenerate_id();

        if (isset($_SESSION['user'])) {
            return $_SESSION['user'];
        }

        return null;
    }

    function login(UserDb $user_db, $username, $password) {
        $user = $user_db->try_login_user($username, $password);

        if (!$user) {
            return null;
        }

        add_user_to_session($user);
        return $user;
    }

    function logout() {
        $user = retrieve_user_from_session();

        if (!user) {
            throw new Exception('No user logged in');
        }

        unset($_SESSION['user']);
    }

    function authorize($role = null) {
        $user = retrieve_user_from_session();

        if (!$user) {
            return false;
        }

        if (!isset($role)) {
            return true;
        }

        if (is_string($role)) {
            return $user->role === $role;
        }

        if (is_array($role)) {
            foreach ($role as $r) {
                if ($user->role === $r) {
                    return true;
                }
            }
        }

        return false;
    }
?>