<?php
    namespace app;
    class Router {
        public $query;
        public $tempClass;
        public $routing;
        private $routes;
        public function __construct() {
            // $this->parseQueryString();
            $this->query = trim($_SERVER['DOCUMENT_URI'], '/');
            $this->routes = require_once CONF . "routes.php";
        }
        public function determineRoute() {
            if($this->matchRoute()) {
                if($this->routing == "") return true;
                $this->routing = "app\\modules\\" . $this->routing;
                $this->tempClass = new $this->routing();
                $this->formatQuery();
                if(method_exists($this->tempClass, $this->query)) {
                    // HcheckFetch();
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        private function parseQueryString() {
            $this->query= trim($_SERVER['QUERY_STRING'], '/');
            if ($this->query == "") return;
            $params = explode('&',$this->query, 2);
            if(false === strpos($params[0], '=')) {
                $this->query = rtrim($params[0], '/');
            }
        }
        
        private function matchRoute() {
            foreach($this->routes as $pattern=>$router) {
                if(preg_match("#{$pattern}#i", $this->query, $match)) {
                    $this->routing = $router;
                    return true;
                }
            }
            return false;
        }
        private function formatQuery () {
            if ($this->query === "") return;
            $this->query = substr($this->query, strripos($this->query, "/", -1)+1, strlen($this->query));
            $this->query = lcfirst(str_replace(' ', '', ucwords(str_replace("-", " ", $this->query))));
        }
    }