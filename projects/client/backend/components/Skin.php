<?php
require_once "media.php";
class PageUIElements {
    public static function PageHeader() {
        if(session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $IsAdminLogged = !empty($_SESSION["ADMIN_LOGGED_IN"]);
        $LinksList = "";
        $LinksArray = [
            "/About"=>"About",
            "/Fun"=>"Fun Facts",
            "/Resources"=>"Resources",
            "/Rules"=>"Rulebook",
            $IsAdminLogged ? "/Dashboard/Articles/New" : "/Login"=>"Administrators"
        ];
        foreach($LinksArray as $LinkHref => $LinkName) {
            $LinksList .= '<a class="nav-link" href="'.$LinkHref.'">'.$LinkName.'</a>';
        }
        return <<<HTML
            <nav class="nav-bar" aria-label="Primary Navigation">
                <div class="nav-banner">
                    <a href="/"><img class="img-banner" src="https://placehold.co/200x75.svg" alt="Site Logo"></a>
                </div>
                <div class="nav-menu">
                    <div class="nav-dropdown">
                        <button type="button" class="nav-drop-btn">Menu</button>
                        <div class="nav-drop-content">
                            {$LinksList}
                        </div>
                    </div>
                </div>
            </nav>
            HTML;
    }
    public static function PageFooter() {
        return <<<HTML
        <footer class="section-footer">
            <div class="footer">&copy; Copyright  &quot;Funny Chemistry Portal&quot;. All rights reserved.</div>
        </footer>
        HTML;
    }
    public static function PageAdminLogin() {
        return <<<HTML
        <main>
            <form method="post" action="/auth">
                <fieldset class="form-outline">
                    <legend>Authorise</legend>
                    <label class="dialog-label" for="l-file">Provide your secret phrase</label><input name="sig" type="text" id="l-file" class="input-colour"/>
                    <button type="submit" class="form-submit" id="d-h-sbmt">OK</button>
                </fieldset>
            </form>
        </main>
        HTML;
    }
    public static function PageIndexHero() {
        return <<<HTML
        <main class="section-hero">
            <h1 class="heading-main">Learning Chemistry is Fun!</h1>
            <a class="button-cta" href="/Resources">Get Resources!</a>
        </main>
        HTML;
    }
    public static function PageIndexAbout() {
        $pic = CDNMedia::GenerateURL("Portrait.png");
        return <<<HTML
        <section class="section-about">
            <div class="about-portrait">
                <img class="photo-portrait" alt="" src="{$pic}"/>
            </div>
            <div class="about-text">
                <h2 class="about-heading">About me</h2>
                <ul class="about-paragraph">
                        <li>Science Teaching experience for 24 years</li>
                        <li>Graduated from Peterborough University in Ontario, Canada.</li>
                        <li>Currently Science Teacher at Wakefield High School in Arlington, Virginia</li>
                    </ul>
            </div>
        </section>
        HTML;
    }
    public static function PageIndexArticles() {
        return <<<HTML
        <section class="section-resources">
            <div class="resource-article">
                <h3 class="article-heading"><a href="#" class="article-link">Proin fringilla id elit ut fringilla.</a></h3>
                <img class="article-image" src="https://placehold.co/400x300" alt=""/>
                <p class="article-description">Proin fringilla id elit ut fringilla. Nam a turpis a nisl sagittis fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
            <div class="resource-article">
                <h3 class="article-heading"><a href="#" class="article-link">Proin fringilla id elit ut fringilla.</a></h3>
                <img class="article-image" src="https://placehold.co/400x300" alt=""/>
                <p class="article-description">Proin fringilla id elit ut fringilla. Nam a turpis a nisl sagittis fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
            <div class="resource-article">
                <h3 class="article-heading"><a href="#" class="article-link">Proin fringilla id elit ut fringilla.</a></h3>
                <img class="article-image" src="https://placehold.co/400x300" alt=""/>
                <p class="article-description">Proin fringilla id elit ut fringilla. Nam a turpis a nisl sagittis fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
        </section>
        HTML;
    }
    public static function PageCreateArticle($jsnonce) {
        return <<<HTML
            <main class="page-editor">
                <dialog closedby="none" class="dialog-ui" id="d-highlight">
                    <form method="dialog">
                        <fieldset class="dialog-outline">
                            <legend>Add Highlighted Text</legend>
                            <label class="dialog-label" name="txt" for="d-hl-txt">Type Text</label><input type="text" class="input-text" id="d-hl-txt" placeholder="text" autofocus required/>
                            <label class="dialog-label" name="clr" for="d-hl-clr">Pick a Colour</label><input type="color" id="d-hl-clr" class="input-colour" value="#ffff00"/>
                            <button type="button" class="dialog-submit" id="d-h-sbmt">OK</button>
                        </fieldset>
                    </form>
                </dialog>
                <dialog closedby="none" class="dialog-ui" id="d-anchor">
                    <form method="dialog">
                        <fieldset class="dialog-outline">
                            <legend>Add Link</legend>
                            <label class="dialog-label" for="d-a-txt">Type Text</label><input type="text" class="input-text" id="d-a-txt" placeholder="Link of Text" autofocus required/>
                            <label class="dialog-label" for="d-a-href">Paste Link Here</label><input type="url" class="input-text" id="d-a-href" placeholder="Link (URL)" required/>
                            <label class="dialog-label" for="d-a-diff">Open this Link in different tab</label><input type="checkbox" name="d-diff" id="d-a-diff">
                            <button type="button" class="dialog-submit" id="d-a-sbmt">OK</button>
                        </fieldset>
                    </form>
                </dialog>
                <dialog closedby="none" class="dialog-ui" id="d-chem">
                    <form method="dialog">
                        <fieldset class="dialog-outline">
                            <legend>Add Chemical Formula</legend>
                            <label class="dialog-label" for="d-a-chem">Chemical Formula</label><input type="text" class="input-text" id="d-a-chem" placeholder="Al2O3, H2O" autofocus required/>
                            <button type="button" class="dialog-submit" id="d-chem-sbmt">OK</button>
                        </fieldset>
                    </form>
                </dialog>
                <h1 class="edit-title">Write an Article</h1>
                <p class="step-description">Donec imperdiet volutpat nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum viverra ante ac laoreet. Aliquam erat volutpat. Duis cursus, lorem ut tincidunt varius, ex enim consequat dui, sed lacinia est purus at metus.</p>
                <form class="c-art">
                    <fieldset class="form-outline">
                        <legend class="form-legend">1. Name your article.</legend>
                        <p class="step-description">Try to write as eye-catching heading as you can.</p>
                        <label for="atitle" class="label-name">Title</label>
                        <input spellcheck="false" type="text" id="atitle" name="atitle" title="Article Title" class="short-response" id="f-title" minlength="3" placeholder="Something Creative" value="Untitled" required/>
                    </fieldset>
                    <fieldset class="form-outline">
                        <legend class="form-legend">2. Provide Short Description.</legend>
                        <p class="step-description">The article should have a short summary so viewers can see brfore seeing the main content.</p>
                        <label for="adesc" class="label-name">Short Description</label>
                        <div class="button-toolbox">
                            <button class="button-insert" id="desc-btn-b" type="button">B</button>
                            <button class="button-insert" id="desc-btn-i" type="button">I</button>
                            <button class="button-insert" id="desc-btn-u" type="button">U</button>
                            <button class="button-insert" id="desc-btn-s" type="button">S</button>
                        </div>
                        <textarea required spellcheck="false" id="adesc" title="Short Description" class="free-response" name="adesc"></textarea>
                    </fieldset>
                    <fieldset class="form-outline">
                        <legend class="form-legend">3. Write an article.</legend>
                        <p class="step-description">This is a field for your main content. Feel free to use provided tools or ask devs for new ones.</p>
                        <label for="adesc" class="label-name">Article contents</label>
                        <div class="button-toolbox">
                            <button class="button-insert" id="cont-btn-b" type="button">B</button>
                            <button class="button-insert" id="cont-btn-i" type="button">I</button>
                            <button class="button-insert" id="cont-btn-u" type="button">U</button>
                            <button class="button-insert" id="cont-btn-s" type="button">S</button>
                            <button class="button-insert" id="cont-btn-h" type="button"><i class="bi bi-highlighter"></i></button>
                            <button class="button-insert" id="cont-btn-a" type="button"><i class="bi bi-link-45deg"></i></button>
                            <button class="button-insert" id="cont-btn-c" type="button">C</button>
                        </div>
                        <textarea required spellcheck="false" id="acontent" title="Article Content" class="free-response" name="acont"></textarea>
                    </fieldset>
                    <fieldset class="form-outline">
                        <legend class="form-legend">4. Pick a category (or more).</legend>
                        <p class="step-description">For organisation purposes, you need to assign one or more categories to the article you wrote. To select non-adjacent categories, hold <kbd>Ctrl</kbd> or <kbd>Command</kbd> on MacOS and select categories.</p>
                        <label for="acat" class="label-name">Choose Category</label>
                        <select required id="acat" name="acat" class="multiple-choice">
                            <option class="dropdown-option" value="1">Category 1</option>
                            <option class="dropdown-option" value="2">Category 2</option>
                            <option class="dropdown-option" value="3">Category 3</option>
                            <option class="dropdown-option" value="4">Category 4</option>
                            <option class="dropdown-option" value="5">Category 5</option>
                            <option class="dropdown-option" value="6">Category 6</option>
                            <option class="dropdown-option" value="7">Category 7</option>
                            <option class="dropdown-option" value="8">Category 8</option>
                        </select>
                    </fieldset>
                    <button type="submit" class="form-submit" name="submittion">Submit</button>
                </form>
            </main>
            <script nonce="$jsnonce" src="../cdn/scripts/editor.js"></script>
        HTML;
    }
    public static function PageCategoryMain() {
        return <<<HTML
        <main class="section-entries">
            <h1 class="category-heading">Category &quot;Blogposts&quot;</h1>
            <p class="category-description">Duis ut risus quis eros viverra euismod. Mauris imperdiet vel neque pretium condimentum. Proin urna neque, ultricies nec rhoncus eu, bibendum quis risus. </p>
        </main>
        <section class="section-entries">
            <h2 class="category-subtitle">Subcategories</h2>
            <div class="category-entries">
                <ul>
                    <li><a class="entry-text" href="#">Nothing</a></li>
                </ul>
            </div>
        </section>
        <section class="section-entries">
            <h2 class="category-subtitle">Entries</h2>
            <div class="category-entries">
                <ul>
                    <li><a class="entry-text" href="#">Nothing</a></li>
                </ul>
            </div>
        </section>
        <section class="section-entries">
            <h2 class="category-subtitle">Media</h2>
            <div class="category-entries">
                <ul>
                    <li><a class="entry-text" href="#">Nothing</a></li>
                </ul>
            </div>
        </section>
        <section class="category-subentries">
            <h2 class="category-subtitle">Category</h2>
            <a class="category-text" href="#">Uncategorised</a>
        </section>
        <section class="section-entries">
            <h1 class="category-heading">Did You Know That?</h1>
            <p class="category-description">I used to have 50 cousins haha:)</p>
        </section>
        HTML;
    }
    public static function PageFAQ() {
        $portrait_url = CDNMedia::GenerateURL("Portrait.png");
        $pic_url = CDNMedia::GenerateURL("Thanks.png", 5);
        return <<<HTML
        <section class="section-about">
            <div class="about-portrait">
                <img class="photo-portrait" alt="" src="$portrait_url">
            </div>
            <div class="about-text">
                <h2 class="about-heading">About me</h2>
                <ul class="about-paragraph">
                    <li class="about-litem">Science Teaching experience for 24 years</li>
                    <li class="about-litem">Graduated from Peterborough University in Ontario, Canada.</li>
                    <li class="about-litem">Currently Science Teacher at Wakefield High School in Arlington, Virginia</li>
                </ul>
            </div>
        </section>
        <section>
            <h2>Ask Me Anything (AMA)</h2>
            <details>
                <summary>
                    Describe Yourself in Three Words
                </summary>
                <p>I'm kind, caring, and vibrant.</p>
            </details>
            <details>
                <summary>
                    What Are You Enjoy doing?
                </summary>
                <p>I enjoy reading, gardening, baking, and hiking.</p>
            </details>
            <details>
                <summary>
                    How Do you Challenge Yourself?
                </summary>
                <p>I challenge myself continually by attending seminars, training, and professional development workshops.</p>
            </details>
            <details>
                <summary>
                   What Can We Talk About?
                </summary>
                <p>You can ask me about collage, baking videos and recipes, hiking sites, and healthy eating. I'm kind of an expert.</p>
            </details>
            <details>
                <summary>
                   Do You Have Social Media (YouTube/Facebook/Instagram/...)?
                </summary>
                <p>Nope.</p>
            </details>
            <details>
                <summary>
                   What Others Think About You?
                </summary>
                <p><img class="img-thanks" src="$pic_url" alt="Image" width="40%"></p>
            </details>
        </section>
        HTML;
    }
}
?>