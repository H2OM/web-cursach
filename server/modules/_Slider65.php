<?php
    namespace app\modules;
    use app\Db;
    class _Slider65 extends Runner {
        protected function getSlider () {
            try {
                $result = Db::getQuery("SELECT * FROM slider");
                exit(json_encode($result));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
    }