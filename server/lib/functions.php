<?php
    function Hdebug($data) {

        if(DEBUG) {
            echo '<pre>'.print_r($data, true).'</pre>';
        }
    }

    function HdestroySession () {

        $_SESSION = array();

        if (session_id() != "" || isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time()-2592000, '/');
        }
            
        session_destroy();
    }

    function HcheckFetch() {

        if(!($_SERVER['HTTP_SEC_FETCH_SITE'] === "same-origin")) {

            // header("HTTP/1.0 400 Bad Request");
            header("HTTP/1.0 404 Not Found");

            die;
        }
    }

    function HgetSafeString($str) {
    
        return str_replace("'", '', htmlentities(strip_tags($str)));
    }
    
    function HcheckUserInput() {

        $dataInputs = [];

        foreach($_POST as $key => $value) {

            $value = trim($value, " ");

            switch($key) {

                case "number": 

                    if(!preg_match("/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/", $value)) {

                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "name":

                    if(iconv_strlen($value) < 2 || !preg_match("/^[а-яА-Я ]+$/u", $value) || preg_match("/'/", $value)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "mail":

                    if(!filter_var($value, FILTER_VALIDATE_EMAIL) || preg_match("/'/", $value)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "agreement":

                    if($value !== "on") {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "question":

                    iconv_strlen($value);

                    if(iconv_strlen($value) > 1200 || iconv_strlen($value) < 5) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                default: 
                    break;
            }
        }

        ksort($dataInputs);
        
        return $dataInputs;
    }