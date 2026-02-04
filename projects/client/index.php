<?php
require_once "./backend/components/Skin.php";
require_once "./backend/security/Tokens.php";
function DisplayPage() {
    $jsnonce = Tokens::SCRIPT_NONCE();
    $cssnonce = Tokens::STYLE_NONCE();
    header("Content-Security-Policy: object-src 'none'; script-src 'nonce-$jsnonce' 'self' 'strict-dynamic'; style-src 'nonce-$cssnonce' 'strict-dynamic' 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net");
    $page_header = PageUIElements::PageHeader();
    $page_index_hero = PageUIElements::PageIndexHero();
    $page_index_about = PageUIElements::PageIndexAbout();
    $page_index_articles = PageUIElements::PageIndexArticles();
    $page_footer = PageUIElements::PageFooter();
    $cssfile = Tokens::VERSION_FILE("./cdn/stylesheets/home.php");

    return <<<HTML
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Funny Chemistry Portal</title>
                <link rel="stylesheet" nonce="$cssnonce" href="/cdn/stylesheets/home.{$cssfile}">
            </head>
            <body>
                <div class="page-main">
                    {$page_header}
                    {$page_index_hero}
                    {$page_index_about}
                    {$page_index_articles}
                    {$page_footer}
                </div>
            </body>
        </html>
        HTML;
}
echo DisplayPage();