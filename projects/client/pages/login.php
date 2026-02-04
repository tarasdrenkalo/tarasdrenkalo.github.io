<?php
session_start();
error_reporting(E_ALL);
require_once "../backend/components/Skin.php";
require_once "../backend/security/Tokens.php";
$jsnonce = Tokens::SCRIPT_NONCE();
$cssnonce = Tokens::STYLE_NONCE();
if(!empty($_SESSION["ADMIN_LOGGED_IN"])) {
    $protocol = !empty($_SERVER["HTTPS"]) ? "https" : "http";
    header("Location: {$protocol}://{$_SERVER['SERVER_NAME']}");
    exit;
}
function DisplayPage($cssnonce, $jsnonce) {
    $page_header = PageUIElements::PageHeader();
    $page_index_hero = PageUIElements::PageIndexHero();
    $page_admin_login = PageUIElements::PageAdminLogin();
    $page_footer = PageUIElements::PageFooter();
    $cssfile = Tokens::VERSION_FILE("../cdn/stylesheets/editor.php");
    return <<<HTML
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Authorisation</title>
                <link rel="stylesheet" nonce="$cssnonce" href="/cdn/stylesheets/editor.{$cssfile}">
            </head>
            <body>
                <div class="page-main">
                    {$page_header}
                    {$page_admin_login}
                    {$page_footer}
                </div>
            </body>
        </html>
        HTML;
}
header("Content-Security-Policy: object-src 'none'; script-src 'nonce-$jsnonce' 'self' 'strict-dynamic'; style-src 'nonce-$cssnonce' 'strict-dynamic' 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net");
echo DisplayPage($jsnonce,$cssnonce);