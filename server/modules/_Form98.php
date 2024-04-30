<?php
    namespace app\modules;
    use app\Db;

    class _Form98 extends Runner {
        private $data;
        public function __construct() {
            if(empty($_POST)) {header("HTTP/1.0 400 Bad request");die;}
            $this->data = HcheckUserInput();
            if(empty($this->data)) {header("HTTP/1.0 400 Bad request"); die;}
        }
        protected function mailSubscribe() {
            if(count($this->data) != 1) {header("HTTP/1.0 400 Bad request"); die;}
            try {
                Db::getPreparedQuery("INSERT INTO `subscribers` (`user_mail`) VALUES (?)", [["VALUE"=>HgetSafeString($this->data['mail']), "PARAMVALUE"=>64]]);
                exit(json_encode(["message"=>"Ваша заявка отправлена."]));

            } catch (\Exception $e) { 
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
        protected function formCallback() {
            if((count($this->data) == 4 && isset($this->data['number'])) || (count($this->data) != 4 && count($this->data) != 5)) {header("HTTP/1.0 400 Bad request"); die;}
            try {
                $params = [];
                foreach ($this->data as $k=>$v) {
                    switch($k) {
                        case "number":
                            array_push($params, ["VALUE"=>HgetSafeString($v), "PARAMVALUE"=>18]);
                            break;
                        case "mail":
                        case "name":
                            array_push($params, ["VALUE"=>HgetSafeString($v), "PARAMVALUE"=>64]);
                            break;
                        case "question":
                            array_push($params, ["VALUE"=>HgetSafeString($v), "PARAMVALUE"=>300]);
                            break;
                        default: break;
                    }
                }
                $query = count($this->data) == 5 ? "(`user_name`, `user_number`, `user_mail`, `text`) VALUES (?, ?, ?, ?)" : "(`user_name`, `user_mail`, `text`) VALUES (?, ?, ?)";
                Db::getPreparedQuery("INSERT INTO `incoming` ". $query, $params);
                exit(json_encode(["message"=>"Ваша заявка отправлена."]));

            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
    }