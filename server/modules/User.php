<?php

    namespace app\modules;

    use app\Db;

    class _User35 extends Runner {

        private $temp;

        public function __construct() {

            if(!isset($_COOKIE["favs"])) {

                setcookie("favs",json_encode([]), time()+3600, '/');

                die;
            }

            $this->temp = json_decode($_COOKIE["favs"], true);
        }

        protected function getFav () {
            
            if(!isset($_COOKIE["favs"])) {

                exit(json_encode([]));

            } else {

                exit($_COOKIE['favs']);
            }
        }

        protected function addFav () {

            if(!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])) {

                header("HTTP/1.0 400 Bad Request");

                die;
            }

            try {

                $id = Db::getPreparedQuery("SELECT id, title, article, image FROM catalog WHERE id = ?", [["VALUE"=>HgetSafeString($_GET['id']), "PARAMVALUE"=>64]]);

                if(isset($id[0]['id']) && !key_exists($id[0]['id'], $this->temp)) {

                    $this->temp[$id[0]['id']] = [$id[0]['title'], $id[0]['article'], $id[0]['image']];

                    setcookie("favs", json_encode($this->temp), time()+3600, '/');

                    die;

                } else {

                    header("HTTP/1.0 400 Bad Request");

                    die;
                }

            } catch (\Exception $e) {

                header("HTTP/1.0 500 Internal Server Error");

                die;
            }
        }

        protected function remFav () {

            if(!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])) {

                header("HTTP/1.0 400 Bad Request");

                die;
            }
            if(key_exists($_GET['id'], $this->temp)) {

                unset($this->temp[$_GET['id']]);

                setcookie("favs", json_encode($this->temp), time()+3600, '/');

                die;

            } else {

                header("HTTP/1.0 400 Bad Request");
                
                die;        
            }
        }
    }