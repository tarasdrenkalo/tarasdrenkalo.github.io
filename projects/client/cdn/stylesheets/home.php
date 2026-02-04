<?php
require_once "../../backend/components/Media.php";
require_once "../../backend/security/Tokens.php";
$base_css_import_url = Tokens::VERSION_FILE("base.php");
$ver = '"'.Tokens::VERSION_FILE(__FILE__).'"';
header('ETag: '.$ver);
header("Content-Type: text/css");
header("Cache-Control: public, must-revalidate");
$bgurl = CDNMedia::GenerateURL("Thanks.png");
echo <<<CSS
@import "base.{$base_css_import_url}";
main.section-hero {
    background-image: linear-gradient(
        rgba(0,0,0,0.5),
        rgba(0,0,0,0.5)
    ), url("{$bgurl}");
    background-size: cover;
    margin: 0.625em;
    border-radius: 0.625em;
}
h1.heading-main {
    color: white;
    text-align:center;
    font-size: 2.5em;
    margin-top: 50px;
}
a.article-link {
    text-decoration-line: none;
    border-radius: 0.625em;
}
a.button-cta {
    display: block;
    margin:auto;
    margin-bottom: 50px;
    width: fit-content;
    border-style: none;
    font-size: 2em;
    background-color: #0d830d;
    color: white;
    text-align: center;
    align-content: center;
    padding: 0.375em;
    text-decoration-line: none;
    border-radius: 0.375em;
    transition: ease 0.25s;
}
h2.about-heading {
    text-align: center;
    font-size: 2em;
}
p {
    line-height: 1.5;
}
ul.about-paragraph {
    margin: 1.25em;
    text-indent: 1.25em;
    background-color: white;
    border-radius: 0.625em;
    font-size: 1em;
    padding: 0.625em;
    text-align: left;
    list-style-position: inside;
}
div.standard-card {
    margin: 1.25em;
    background-color: snow;
    border-radius: 0.625em;
}
img.photo-portrait {
    display: block;
    margin: 1.25em;
    clip-path: ellipse(6.25em 8.333em);
    width: 200px;
    aspect-ratio: 3/4;
}
div.am-title {
    border-radius: 0.625em;
    grid-area: title;
    grid-column: 1 / span 2;
}
li.about-litem {
    font-size: 1.5em;
}
div.about-portrait {
    border-radius: 0.625em;
    grid-area: photo;
}
div.am-text {
    border-radius: 0.625em;
    grid-area: text;
}
section.section-about {
    display: grid;
    grid-template-columns: minmax(0, auto) 1fr;
    grid-template-areas: "apic atext";
}
div.about-portrait {
    grid-area: apic;
}
div.about-text {
    grid-area: atext;
}
section.section-resources {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.25em;
}
div.resource-article {
    background-color: snow;
    border-radius: 0.625em;
    align-content: center;
}
h3.article-heading {
    text-align: center;
}
img.article-image {
    display: block;
    border-radius: 0.625em;
    margin-right: auto;
    margin-left: auto;
    max-width: 350px;
    aspect-ratio: 4/3;
}
p.article-description {
    text-align: left;
    text-indent: 2em;
    font-size: 1em;
    margin: 0.625em;
}
@media screen and (prefers-color-scheme: dark) {
    p.paragraph-am, div.standard-card, div.b-article, ul.about-paragraph {
        background-color: black;
    }
}
CSS;