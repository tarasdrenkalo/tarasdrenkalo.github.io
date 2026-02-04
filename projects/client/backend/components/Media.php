<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/backend/security/Tokens.php";
class CDNMedia {
    public static function StorageDir() {return $_SERVER["DOCUMENT_ROOT"] . '/cdn/media/';}
    public static function GenerateURL($file, $ttl = 5) {
        $expires = time() + $ttl;
        $sig = hash_hmac('sha256', $file . $expires, Tokens::SECRET_KEY());
        return sprintf(
            "%s://%s/storage/%s/%s/%s",
            (!empty($_SERVER['HTTPS']) ? 'https' : 'http'),
            $_SERVER['SERVER_NAME'],
            bin2hex($file),
            dechex($expires),
            $sig
        );
    }

    public static function Test() {
        if (isset($_GET['action']) && $_GET['action'] === 'display') {
            var_dump(glob(CDNMedia::StorageDir().'*'));
            $files = array_filter(glob(CDNMedia::StorageDir().'*'), 'is_file');
            echo "<h2>Test URLs (10 sec validity)</h2><ul>";
            foreach ($files as $f) {
                $fname = basename($f);
                $url = CDNMedia::GenerateURL($fname, 5);
                echo "<li><a href='$url'>$fname</a></li>";
            }
            echo "</ul>";
            exit;
        }
    }
    public static function Init() {
        $fname_encoded = $_GET['fname'] ?? '';
        $exp_hex = $_GET['exp'] ?? '';
        $sig = $_GET['sig'] ?? '';

        if (!$fname_encoded || !$exp_hex || !$sig) {
            http_response_code(400);
            exit;
        }

        // decode parameters
        $fname = hex2bin($fname_encoded);
        $expires = hexdec($exp_hex);

        if (time() > $expires) {
            http_response_code(403);
            exit;
        }

        $expected_sig = hash_hmac(
            'sha256',
            $fname . $expires,
            Tokens::SECRET_KEY()
        );

        if (!hash_equals($expected_sig, $sig)) {
            http_response_code(403);
            exit;
        }
        $path = realpath(CDNMedia::StorageDir() . basename($fname));
        if (!$path || !file_exists($path)) {
            http_response_code(404);
            exit;
        }
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $path);
        finfo_close($finfo);
        header('Content-Type: '.$mime_type);
        header("Cache-Control: private, no-cache, no-store");
        header('Content-Length: ' . filesize($path));
        readfile($path);
        exit;
    }
}
if (realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'])) {
    // Script is accessed directly via URL
    if (isset($_GET['action']) && $_GET['action'] === 'display') {
        CDNMedia::Test();
        exit;
    }

    if (isset($_GET['fname'], $_GET['exp'], $_GET['sig'])) {
        CDNMedia::Init();
        exit;
    }
}
?>