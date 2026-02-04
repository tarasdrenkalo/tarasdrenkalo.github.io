<?php
class Tokens {
    public static function SECRET_KEY(){
        return "MySuperSecretKey";
    }
    public static function SCRIPT_NONCE(){
        return bin2hex(random_bytes(24));
    }
    public static function STYLE_NONCE(){
        return bin2hex(random_bytes(24));
    }
    public static function VERSION_FILE(string $filename, int $len=8):string {
        return substr(md5_file($filename), 0, $len);
    }
}