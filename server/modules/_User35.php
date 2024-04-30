<?php
    namespace app\modules;
    use app\Db;
    class _User35 extends Runner {
        protected function setRating () {
            
            if(!isset($_GET['mark']) || empty($_GET['mark']) || !is_numeric($_GET['mark']) || (strlen($_GET['mark']) > 1) || ($_GET['mark'] > 5)) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            if(!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])) {
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