<?php
    namespace app\modules;
    class Runner {
        public function run ($action) {
            $this->$action();
        }
    }