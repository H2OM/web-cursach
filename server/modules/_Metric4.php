<?php

    namespace app\modules;
    use app\Db;

    class _Metric4 extends Runner {  // Только уникальные пользователи
        
        protected function increaseCatalog () { $this->increase("catalog"); }
        protected function increaseNews () { $this->increase("news"); }
        protected function increaseMain () { $this->increase("main"); }
        protected function increaseContacts () { $this->increase("contacts"); }

        private function increase ($type) {
            $metric = json_decode(file_get_contents(DATA . 'metric_'.$type.'.json', true), true); 

            if(!in_array($_SERVER['REMOTE_ADDR'], $metric)) {
                try {
                    Db::getQuery("UPDATE `webrating` SET `".$type."` = `".$type."` + 1 WHERE single = 1");

                    array_push($metric, $_SERVER['REMOTE_ADDR']);
                    file_put_contents(DATA . 'metric_'.$type.'.json', json_encode($metric), LOCK_EX);
                    header("HTTP/1.0 200 OK");    
                    die;

                } catch (\Exception $e) {
                    header("HTTP/1.0 500 Internal Server Error");
                    die;
                }
            } else {
                header("HTTP/1.0 200 OK");    
                die;
            }
        }
    }