<?php
    return [
        'dsn' => 'mysql:host=localhost;dbname=topattractions;charset=utf8',
        'user'=> 'root',
        'pass'=> 'mysql',
        'opts'=> [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => FALSE,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET sql_mode="TRADITIONAL"'
        ]
    ];