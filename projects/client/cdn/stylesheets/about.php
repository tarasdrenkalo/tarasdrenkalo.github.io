<?php
require_once "../../backend/security/Tokens.php";
$base_css_import_url = Tokens::VERSION_FILE("home.php");
$ver = '"'.Tokens::VERSION_FILE(__FILE__).'"';
header('ETag: '.$ver);
header("Content-Type: text/css");
header("Cache-Control: public, must-revalidate");
echo <<<CSS
@import "home.{$base_css_import_url}";
details {
    margin: 1em;
    background-color: white;
    padding: 0.5em;
    border-radius: 0.625em;
}
h2 {
    text-align: center;
    font-size: 2em;
}
summary {
    padding: 0.75em;
    font-size: 1.25em;
}
p {
    padding: 0.5em;
    font-size: 1.125em;
    text-indent: 2em;
}
p:has(img.img-thanks) {
    text-indent: unset;
}
p img.img-thanks {
    width: 80dvw;
    border-radius:0.625em;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
}
@media screen and (prefers-color-scheme: dark) {
    details {
            background-color: black;
        }
    }
CSS;