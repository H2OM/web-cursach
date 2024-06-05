<?php

    namespace app\modules;

    use app\Db;

    class _News32 extends Runner {

        protected function lastNews() {

            try {

                $result = Db::getQuery("SELECT * FROM `news` ORDER BY date DESC LIMIT 3;");

                exit(json_encode($result));

            } catch (\Exception $e) {

                header("HTTP/1.0 500 Internal Server Error");

                die;
            }
        }

        protected function getNews() {

            if(isset($_GET['count']) && !preg_match('/^[0-9]*$/', $_GET['count']))  {

                header("HTTP/1.0 400 Bad Request");
                
                die;
            }

            try {

                $result = Db::getPreparedQuery("SELECT * FROM `news` ORDER BY date DESC LIMIT ?", [["VALUE"=>$_GET['count'] ?? 3, "INT"=> true]]);

                exit(json_encode($result));

            } catch (\Exception $e) {

                header("HTTP/1.0 500 Internal Server Error");
                
                die;
            }
        }
    }