<?php
session_start();
error_reporting(E_ALL);
require_once "../backend/components/Skin.php";
require_once "../backend/security/Tokens.php";
$jsnonce = Tokens::SCRIPT_NONCE();
$cssnonce = Tokens::STYLE_NONCE();
function DisplayPage($cssnonce, $jsnonce) {
    $page_header = PageUIElements::PageHeader();
    $page_faq = PageUIElements::PageFAQ();
    $page_footer = PageUIElements::PageFooter();
    $cssfile = Tokens::VERSION_FILE("../cdn/stylesheets/about.php");
    return <<<HTML
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Amout Me (Ask Me Anything)</title>
                <link rel="stylesheet" nonce="$cssnonce" href="/cdn/stylesheets/about.{$cssfile}">
            </head>
            <body>
                <div class="page-main">
                    {$page_header}
                    {$page_faq}
                    {$page_footer}
                </div>
            </body>
        </html>
        HTML;
}
header("Content-Security-Policy: object-src 'none'; script-src 'nonce-$jsnonce' 'self' 'strict-dynamic'; style-src 'nonce-$cssnonce' 'strict-dynamic' 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net");
echo DisplayPage($jsnonce,$cssnonce);