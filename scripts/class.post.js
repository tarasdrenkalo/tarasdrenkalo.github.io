class Post {
    static StorageKey = "FavouritedPosts";

    static GetFeaturedPostId() {
        return 1;
    }

    static async PostExists(id) {
        const PostID = parseInt(id) || 0;
        if (PostID <= 0) return false;
        try {
            const r = await fetch("./posts/all.json");
            if (!r.ok) return false;
            const AllPosts = await r.json();
            return AllPosts.some(post => post.ID === PostID);
        } catch (e) {
            console.error("Error checking post existence:", e);
            return false;
        }
    }
    static async GetTotalPosts() {
        try {
            const response = await fetch("./posts/all.json");
            if (!response.ok) return 0; // or throw error
            const allPosts = await response.json();
            return Array.isArray(allPosts) ? allPosts.length : 0;
        } catch (e) {
            console.error("Error fetching total posts:", e);
            return 0;
        }
    }
    constructor(ID) {
        this.PostId = parseInt(ID) || 0;
        this.Title = "";
        this.Summary = "";
        this.Article = [];
        this.IsFeatured = Post.GetFeaturedPostId() === this.PostId;
    }

    static async Load(ID) {
        const PostID = parseInt(ID) || 0;
        if (PostID <= 0) return null;

        const r = await fetch("./posts/all.json");
        const AllPosts = await r.json();
        const ThisPost = AllPosts[PostID - 1];
        if (!ThisPost) return null;

        const post = new Post(PostID);   // no async fetch here
        post.Title = ThisPost.Title;
        post.Summary = ThisPost.Summary;
        post.Article = ThisPost.Article;
        return post;
    }

    Render() {
        function RenderJSON(obj) {
            const Selector = Object.keys(obj)[0];
            const Content = obj[Selector];
            const TagMatch = Selector.match(/^[a-zA-Z0-9]+/);
            const TagName = TagMatch ? TagMatch[0] : "div";
            const elem = document.createElement(TagName);

            const IdMatch = Selector.match(/#([a-zA-Z0-9\-_]+)/);
            if (IdMatch) elem.id = IdMatch[1];

            const ClassMatches = Selector.match(/\.([a-zA-Z0-9\-_]+)/g);
            if (ClassMatches) {
                ClassMatches.forEach(cls => elem.classList.add(cls.slice(1)));
            }

            if (typeof Content === "string") {
                elem.innerHTML = Content;
            } else if (Array.isArray(Content)) {
                Content.forEach(c => elem.appendChild(RenderJSON(c)));
            }
            return elem;
        }

        function RenderToDOM(arr, ContainerId) {
            if (Array.isArray(arr) && typeof ContainerId === "string") {
                const Container = document.querySelector(ContainerId);
                arr.forEach(obj => Container.appendChild(RenderJSON(obj)));
            }
        }

        RenderToDOM(this.Article, "article#post-content");
    }

    DisplayFeatured() {
        if (this.IsFeatured) {
            let PostTitle = document.querySelector("h5#featured-post-headline");
            let PostSummary = document.querySelector("p#featured-post-summary");
            let PostLink = document.querySelector("a#featured-post-link");
            let FeaturedPost = document.querySelector("div#featured-post");
            let ActionFavourite = document.querySelector("a#featured-post-action-favourite");

            PostTitle.textContent = this.Title;
            PostSummary.textContent = this.Summary;
            PostLink.href = "./post.html?p=" + Post.GetFeaturedPostId();
            FeaturedPost.setAttribute("postid", Post.GetFeaturedPostId());
            ActionFavourite.href = "?Action=Favourite&PostId=" + Post.GetFeaturedPostId();
            ActionFavourite.addEventListener("click", (e) => { e.preventDefault(); });
        }
    }

    AddToFavourites() {
        let AllFavourited = JSON.parse(localStorage.getItem(Post.StorageKey)) || [];
        if (!AllFavourited.includes(this.PostId)) {
            AllFavourited.push(this.PostId);
        }
        localStorage.setItem(Post.StorageKey, JSON.stringify(AllFavourited));
    }

    IsFavourited() {
        let AllFavourited = JSON.parse(localStorage.getItem(Post.StorageKey)) || [];
        return Array.isArray(AllFavourited) && AllFavourited.includes(this.PostId);
    }

    RemoveFromFavourites() {
        let AllFavourited = JSON.parse(localStorage.getItem(Post.StorageKey)) || [];
        const Index = AllFavourited.indexOf(this.PostId);
        if (Array.isArray(AllFavourited) && Index !== -1) {
            AllFavourited.splice(Index, 1);
        }
        localStorage.setItem(Post.StorageKey, JSON.stringify(AllFavourited));
    }
}