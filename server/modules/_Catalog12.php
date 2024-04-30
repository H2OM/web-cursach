<?php
    namespace app\modules;
    use app\Db;


    class _Catalog12 extends Runner {

        protected function mainRating() {
            try {
                $result = Db::getQuery("SELECT * FROM `catalog` WHERE voices >= 10 ORDER BY rating DESC LIMIT 6");

                exit(json_encode($result));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
        protected function mainCompilate() {
            try {
                $result = Db::getQuery("SELECT * FROM `catalog` ORDER BY rand() LIMIT 9");
                exit(json_encode($result));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }

        }
        protected function cartDetail() {
            if(empty($_GET) || !isset($_GET['article'])) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            try {
                $result = Db::getPreparedQuery("SELECT * FROM `catalog` WHERE article = ?", [["VALUE"=>$_GET['article'], "PARAMVALUE"=>64]]);
                $ip = json_decode(file_get_contents(DATA . 'rating.json', true), true)[$result[0]['id']][$_SERVER['REMOTE_ADDR']] ?? null;
                if($ip !== null) {
                    $result[0]["userrating"] = $ip;
                }
                exit(json_encode($result[0]));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
        protected function getCatalog () {
            if(isset($_GET['page']) && !is_numeric($_GET['page'])) {
                header("HTTP/1.0 400 Bad Request");
                die;
            }
            $query = "";
            $sort = "";
            $params = [];

            foreach($_GET as $key=>$val) {
                if(empty($_GET[$key])) continue;
                $temp =  "(";
                switch($key) {
                    case "cities":
                        foreach(explode(',',$_GET['cities']) as $key=>$val) {
                            if($val ==  "") continue;
                            $temp .= " city = ? OR";

                            array_push($params, ["VALUE"=>HgetSafeString($val), "PARAMVALUE"=>64]);
                        }
                        $query .= substr_replace($temp, '', -2) . ') AND ';
                        break;

                    case "favs":
                        if(!isset($_COOKIE['favs']) || empty($_COOKIE['favs'])) break;
                        foreach($_COOKIE['favs'] as $key=>$id) {
                            if($val =="true") $temp .= " id = ? OR";
                                else if($val == "false") $temp .= " id != ? OR";

                            array_push($params, ["VALUE"=>HgetSafeString($id), "PARAMVALUE"=>64]);
                        }
                        $query .= substr_replace($temp, '', -2) . ') AND ';
                        break;

                    case "rating":
                        $rating = explode(',', $_GET['rating']);
                        if(!empty($rating[0]) && !is_numeric(($rating[0]))) break;
                        if(!empty($rating[1]) && !is_numeric(($rating[1]))) break;
                        if(!empty($rating[0]) && !empty($rating[1])) {
                            $temp .= " rating >= ? AND rating <= ?";
                            array_push($params, ["VALUE"=>HgetSafeString($rating[0]), "PARAMVALUE"=>64],["VALUE"=>HgetSafeString($rating[1]), "PARAMVALUE"=>64]);

                        } else if (!empty($rating[0])) {
                            $temp .= " rating >= ?";
                            array_push($params, ["VALUE"=>HgetSafeString($rating[0]), "PARAMVALUE"=>64]);

                        } else if (!empty($rating[1])) {
                            $temp .= " rating <= ?";
                            array_push($params, ["VALUE"=>HgetSafeString($rating[1]), "PARAMVALUE"=>64]);
                        }
                        $query .= $temp . ') AND ';
                        break;
                    case "sort":
                        switch($val) {
                            case "name_asc": $sort = " ORDER BY title ASC"; break;
                            case "name_desc": $sort = " ORDER BY title DESC"; break;
                            case "rating_desc": $sort = " ORDER BY rating DESC"; break;
                            case "rating_asc": $sort = " ORDER BY rating ASC"; break;
                            default: break;
                        }
                        break;
                    default: break;
                }
            }
            if(!empty($query)) $query = " WHERE " . $query;
            $query = substr_replace($query, '', -4) . $sort;

            try {
                $page = isset($_GET['page']) ? ($_GET['page'] - 1) * 3 : 0;
                $pages = Db::getPreparedQuery("SELECT COUNT(*) as max FROM `catalog` " .$query, $params);
                array_push($params, ["VALUE"=>$page, "PARAMVALUE"=>64]);
                $result = Db::getPreparedQuery("SELECT * FROM `catalog` " .$query. " LIMIT ?, 6", $params);
                
                exit(json_encode(["data"=> $result, "pages"=>ceil($pages[0]['max']/6)]));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
        protected function getCities() {
            try {
                $result = Db::getQuery("SELECT city FROM `catalog` GROUP BY city", 0, 0, 1);
                exit(json_encode($result[0]));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }

        }
    }