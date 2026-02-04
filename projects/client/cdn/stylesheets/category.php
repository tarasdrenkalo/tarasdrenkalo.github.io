<?php
require_once "../../backend/security/Tokens.php";
$base_css_import_url = Tokens::VERSION_FILE("base.php");
$ver = '"'.Tokens::VERSION_FILE(__FILE__).'"';
header('ETag: '.$ver);
header("Content-Type: text/css");
header("Cache-Control: public, must-revalidate");
echo <<<CSS
@import "base.{$base_css_import_url}";
.section-entries, section.category-subentries {
    background-color: white;
    border-radius: 0.625em;
    opacity: 0.8;
}
h1.category-heading, h2.category-subtitle {
    font-size: 2em;
    margin: 1em;
}
p.category-description {
    margin: 1em;
    text-indent: 1.5em;
    font-size: 1.5em;
}
div.c-cats {
    align-content: center;
    margin: 1em 2em;
}
ul {
    display: flex;
    flex-wrap: wrap;
}
li {
    list-style-type: none;
    word-break: break-word;
    margin: 0.5em 1em;
}
a.category-text {
    display: block;
    margin: 2em;
    font-size: 1.2em;
}
a.entry-text, a.category-text {
    text-decoration-line: none;
}
@media screen and (prefers-color-scheme: dark) {
    .section-entries, section.category-subentries {
        background-color: black;
    }
    a.category-text, a.entry-text {
        color: white;
    }
    a.entry-text {
        text-decoration-line: underline;
    }
}
CSS;