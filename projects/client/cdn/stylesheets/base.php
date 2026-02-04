<?php
require_once "../../backend/security/Tokens.php";
$ver = '"'.Tokens::VERSION_FILE(__FILE__).'"';
header('ETag: '.$ver);
header("Content-Type: text/css");
header("Cache-Control: public, must-revalidate");
echo <<<CSS
@import "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css";
:root {
    font-family: "Roboto", sans-serif;
    background-color: lightgreen;
    color: black;
    font-size: 16px;
}
a:focus, button:focus {
    outline: 0.1875em solid #000;
    outline-offset: 0.1875em;
}
div.page-main {
    display:grid;
    gap: 0.625em;
    grid-template-rows: repeat(5, auto);
}
nav.nav-bar {
    margin: 0.625em;
}
img.img-banner {
    display: inline;
    border-radius: 0.5em;
    margin-right: 40px;
}
div.nav-menu {
    display: inline;
    position: absolute;
    margin: auto;
    right: 9.75em;
    top:1.875em;
    text-align: center;
}
.nav-drop-btn {
    background-color: green;
    color: white;
    padding: 1em;
    font-size: 1em;
    border: none;
    cursor: pointer;
    border-radius: 0.625em;
}
.nav-drop-content {
    z-index: 1;
    display: none;
    border-radius: 0.625em;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 0.5em 1em 0px rgba(0,0,0,0.2);
}
.nav-drop-content a.nav-link {
    padding: 0.75em 1em;
    text-decoration: none;
    display: block;
    border-radius: 0.625em;
}
.nav-drop-content a.nav-link:focus-within {
    border-radius: 0.625em;
    background-color: #f1f1f1;
    color: black;
}
.nav-dropdown:focus-within .nav-drop-content {
    display: block;
}
.nav-dropdown:focus-within .nav-drop-btn {
    background-color: #0d830d;
}
footer.section-footer {
    margin: 0.625em;
}
div.footer {
    font-size: 1em;
}
section.section-about {
    display: grid;
    grid-template-columns: minmax(0, auto) 1fr;
    grid-template-areas: "apic atext";
}
@media screen and (prefers-color-scheme: dark) {
    :root {
        background-color: rgb(0, 60, 0);
        color: white;
    }
    a.nav-link {
        color: white;
    }
    a:focus, button:focus {
        outline: 3px solid #fff;
        outline-offset: 3px;
        background-color: black;
        color:white;
    }
    .nav-drop-btn {
        background-color: rgb(0, 90, 0);
    }
    .nav-drop-content {
        background-color: #090909;
        color: white;
        box-shadow: 0px 8px 16px 0px rgba(255,255,255,0.2);
    }
    .nav-drop-content a.nav-link:focus-within {
        background-color: #f1f1f1;
    }
    .nav-dropdown:focus-within .nav-drop-btn {
        background-color: #043f04;
    }
}
CSS;