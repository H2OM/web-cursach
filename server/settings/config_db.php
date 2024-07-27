<?php
$settings = require_once CONF . 'db_acc.php';

return [
    'dsn' => 'mysql:host=' . $settings['host'] . ';dbname=' . $settings['dbname'] . ';charset=utf8',
    'user' => $settings['user'],
    'pass' => $settings['pass'],
    'opts' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => FALSE,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET sql_mode="TRADITIONAL"'
    ]
];