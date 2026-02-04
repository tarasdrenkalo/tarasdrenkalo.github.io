<?php
require_once "../../backend/security/Tokens.php";
$base_css_import_url = Tokens::VERSION_FILE("base.php");
$ver = '"'.Tokens::VERSION_FILE(__FILE__).'"';
header('ETag: '.$ver);
header("Content-Type: text/css");
header("Cache-Control: public, must-revalidate");
echo <<<CSS
@import "base.{$base_css_import_url}";
main.page-editor {
    margin: 2em;
}
p.step-description {
    text-indent: 1em;
}
fieldset.form-outline {
    border-radius: 1em;
    border: solid black 0.25em;
    margin: 2em 0.5em;
}
legend.form-legend {
    font-size: 1.5em;
}
input.short-response, textarea.free-response {
    font-size: 1.5em;
    width: 100%;
    border-radius: 0.375em;
    border: none;
    box-sizing: border-box;
}
label.label-name {
    display: block;
    font-size: 1.25em;
    margin: 0.5em;
}
input.short-response:focus, select.multiple-choice:focus, textarea.free-response:focus, select:focus {
    border: 0.2em solid black;
}
textarea.free-response {
    font-size: 1em;
    resize: vertical;
    min-height: 10em;
}
textarea.free-response#acontent {
    min-height: 50em;
}
div.button-toolbox {
    margin: 0.5em;
    display: flex;
}
button.button-insert {
    margin: 0.25em;
    border-radius: 0.5em;
    border: 0.1em black solid;
    font-size: 1em;
    font-family: monospace;
}
button#desc-btn-b, button#cont-btn-b {
    font-weight:bold;
}
button#desc-btn-i, button#cont-btn-i {
    font-style: italic;
}
button#desc-btn-u, button#cont-btn-u {
    text-decoration: underline;
}
button#desc-btn-s, button#cont-btn-s {
    text-decoration-line:line-through;
}
select.multiple-choice {
    padding: 0.5em;
    box-sizing: content-box;
    font-size: 1em;
    width: 100%;
    border-radius: 0.375em;
    border: none;
    box-sizing: border-box;
    line-height: 1.5;
}
option.dropdown-option {
    padding: 0.2em;
    border: black solid 0.15em;
    border-radius: 0.625em;
}
dialog.dialog-ui{
    border-radius: 0.625em;
    background-color: lightgreen;
}
fieldset.dialog-outline {
    margin: 0.625em;
    border-radius: 0.625em;
    border: 0.125em solid black;
}
label.dialog-label {
    display: block;
    margin: 0.375em;
}
input.input-text, input.input-colour {
    font-size: 1.25em;
    margin:0.5em;
    border-radius: 0.375em;
}
button.dialog-submit {
    content:"OK";
    border-radius: 0.375em;
    font-size: 1.125em;
    display: block;
    margin-top: 0.5em;
}
button.form-submit {
    font-size: 2em;
    border-radius: 0.375em;
    padding: 0.2em;
    margin: 0.5rem;
}
input#d-diff {
    display: inline;
    transform: scale(1.5);
    margin: 0.75rem;
}
CSS;