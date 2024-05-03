<?php
    namespace app\modules;
    use app\Db;
    class _User35 extends Runner {
        private $temp;
        public function __construct() {
            if(isset($_GET['id']) && (empty($_GET['id']) || !is_numeric($_GET['id']))) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            if(!isset($_COOKIE["favs"])) {
                setcookie("favs",json_encode([]), time()+3600, '/');
                die;
            }
            $this->temp = json_decode($_COOKIE["favs"], true);
        }


        protected function checkVote () {
            try {
                $ip = Db::getQuery("SELECT ip FROM `voting` WHERE ip = '" . $_SERVER['REMOTE_ADDR']."'");
                if(empty($ip)) {
                    exit(json_encode(['Парк Краснодар', 'Олимпийский Парк' , 'Красная поляна']));

                } else {
                    die;
                }

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }

        protected function getbySearch() {
            if(!isset($_GET['content']) || empty($_GET['content']) || (strlen($_GET['content']) < 3 && strlen($_GET['content']) > 50)) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            try {
                $s = "%" . HgetSafeString(mb_strtolower($_GET['content'], 'UTF-8')) . "%";
                $result = Db::getPreparedQuery("SELECT title, article, image FROM catalog WHERE LOWER(title) LIKE BINARY ? OR  LOWER(city) LIKE BINARY ?",
                    [["VALUE"=>$s, "PARAMVALUE"=>64], ["VALUE"=>$s, "PARAMVALUE"=>64]]);
                exit(json_encode($result));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }

            exit(json_encode($_GET['content']));
        }

        protected function getFav () {
            if(!isset($_COOKIE['favs'])) {
                exit(json_encode([]));
            } else {
                exit( $_COOKIE['favs']);
            }
        }

        protected function addFav () {
            if(!isset($_GET['id'])) {header("HTTP/1.0 400 Bad Request");die;}
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
            if(!isset($_GET['id'])) {header("HTTP/1.0 400 Bad Request");die;}
            if(key_exists($_GET['id'], $this->temp)) {
                unset($this->temp[$_GET['id']]);
                setcookie("favs", json_encode($this->temp), time()+3600, '/');
                die;
            } else {
                header("HTTP/1.0 400 Bad Request");
                die;        
            }
        }

        protected function setRating () {
            if(!isset($_GET['id'])) {header("HTTP/1.0 400 Bad Request");die;}
            
            if(!isset($_GET['mark']) || empty($_GET['mark']) || !is_numeric($_GET['mark']) || (strlen($_GET['mark']) > 1) || ($_GET['mark'] > 5)) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            
            $ips = json_decode(file_get_contents(DATA . 'rating.json', true), true);
            
            if($ips[$_GET['id']] === null) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            
            try {
                $currentRating = Db::getPreparedQuery("SELECT rating, voices FROM catalog WHERE id = ?", [["VALUE"=>HgetSafeString($_GET['id']), "PARAMVALUE"=>64]])[0];
                if(empty($currentRating)) {
                    header("HTTP/1.0 400 Bad Request");
                    die;
                }
                $newrating = '';
                $query = "";
                if(array_key_exists($_SERVER['REMOTE_ADDR'], $ips[$_GET['id']])) {
                    $newrating = (($currentRating['rating'] * $currentRating['voices']) - ($ips[$_GET['id']][$_SERVER['REMOTE_ADDR']] - $_GET['mark'])) / ($currentRating['voices']);
                    $query = "voices = ".($currentRating['voices']);

                } else {
                    $newrating = (($currentRating['rating'] * $currentRating['voices']) + $_GET['mark']) / ($currentRating['voices'] + 1);
                    $query = "voices = ".($currentRating['voices'] + 1);
                }

                Db::getPreparedQuery("UPDATE `catalog` SET `rating`= ?, $query WHERE id = ?", [["VALUE"=>HgetSafeString($newrating), "PARAMVALUE"=>64], ["VALUE"=>HgetSafeString($_GET['id']), "PARAMVALUE"=>64]]);
                
                $ips[$_GET['id']][$_SERVER['REMOTE_ADDR']] = $_GET['mark'];
                file_put_contents(DATA . 'rating.json', json_encode($ips));

                header("HTTP/1.0 200 OK");
                die;

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
    }