<?php

    namespace app\modules;

    use app\Db;

    class Vote extends Runner {
        
        protected function checkVote () {

            try {
                $ip = Db::getQuery("SELECT ip FROM `voting` WHERE ip = INET_ATON('".$_SERVER['REMOTE_ADDR']."')");

                $ip = $ip[0];

                if(empty($ip)) {
                    exit(json_encode(['Парк Краснодар', 'Олимпийский парк' , 'Красная поляна']));

                } else {

                    die;
                }

            } catch (\Exception $e) {

                header("HTTP/1.0 500 Internal Server Error");

                die;
            }
        }

        protected function setVote () {

            if(empty($_POST) || !isset($_POST['voice']) || empty($_POST['voice'])) {

                header("HTTP/1.0 400 Bad Request");

                die;
            }

            $switch = "";

            switch($_POST['voice']) {

                case "Красная поляна":

                    $switch = "Красная поляна";

                    break;

                case "Парк Краснодар":

                    $switch = "Парк Краснодар";

                    break;

                case "Олимпийский парк":

                    $switch = "Олимпийский парк";

                    break;

                default:

                    header("HTTP/1.0 400 Bad Request");

                    die;
            }

            try {

                Db::getQuery("INSERT INTO `voting`(`ip`, `city`) VALUES (INET_ATON('".$_SERVER['REMOTE_ADDR']."'),'".$switch."')");

                $count = Db::getQuery("SELECT city, COUNT(*) AS 'count' FROM `voting` GROUP BY city");

                foreach($count as $k=>$v) {

                    if($v['city'] == $switch) {

                        $count[$k]['selected'] = true;

                        break;
                    }
                }

                exit(json_encode($count));

            } catch (\Exception $e) {

                header("HTTP/1.0 500 Internal Server Error");
                
                die;
            }
        }
    }