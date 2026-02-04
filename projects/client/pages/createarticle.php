<?php
require_once "../backend/components/Skin.php";
require_once "../backend/security/Tokens.php";
$jsnonce = Tokens::SCRIPT_NONCE();
$cssnonce = Tokens::STYLE_NONCE();
function DisplayPage($jsnonce, $cssnonce) {
    $cssfile = Tokens::VERSION_FILE("../cdn/stylesheets/editor.php");
    $page_header = PageUIElements::PageHeader();
    $page_footer = PageUIElements::PageFooter();
    $page_create_article = PageUIElements::PageCreateArticle($jsnonce);
    return <<<HTML
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Create Article</title>
                <link rel="stylesheet" href="../cdn/stylesheets/editor.{$cssfile}">
            </head>
            <body>
                <div class="page-main">
                    {$page_header}
                    {$page_create_article}
                    {$page_footer}
                </div>
            </body>
        </html>
    HTML;
}
echo DisplayPage($jsnonce, $cssnonce);