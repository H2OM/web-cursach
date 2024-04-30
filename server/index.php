<?php
    use app\Router;
    use app\Db;
    require_once "./settings/config.php";
    require_once LIB . "functions.php";
    $Routing = new Router();
    session_start();
    Db::instance();
    if($Routing->determineRoute()) {
            // HcheckFetch();
        $Routing->tempClass->run($Routing->query);
    } else {header("HTTP/1.0 400 Bad request");die;}
    // else {
    //     // header("HTTP/1.0 404 Page Not Found");
    // }
    // Hdebug($Routing->query);
    //     die;
    