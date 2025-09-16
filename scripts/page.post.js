document.addEventListener("DOMContentLoaded", async function() {
    const Btn = document.querySelector("#featured-post-action-favourite");
    const URLParams = new URLSearchParams(window.location.search);
    const PostId = parseInt(URLParams.get("p")) || -1;
    const post = await Post.Load(PostId);
    if (!post) return;
    const PageTitle = document.title;
    document.title = post.Title + " - "+PageTitle;
    const TotalPosts = await Post.GetTotalPosts(); // await async method
    post.Render();

    // Favourite button
    Btn.classList.add(post.IsFavourited() ? "btn-success" : "btn-primary");
    Btn.classList.remove(post.IsFavourited() ? "btn-primary" : "btn-success");
    Btn.textContent = post.IsFavourited() ? "Favourited" : "Favourite";

    Btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (post.IsFavourited()) {
            post.RemoveFromFavourites();
        } else {
            post.AddToFavourites();
        }
        Btn.classList.toggle("btn-success", post.IsFavourited());
        Btn.classList.toggle("btn-primary", !post.IsFavourited());
        Btn.textContent = post.IsFavourited() ? "Favourited" : "Favourite";
    });

    // Previous post
    const PreviousPost = document.querySelector("a#previous-post");
    if (PostId <= 1) {
        PreviousPost.classList.add("disabled");
        PreviousPost.removeAttribute("href");
    } else {
        PreviousPost.classList.remove("disabled");
        PreviousPost.href = "./post.html?p=" + (PostId - 1);
    }

    // Next post
    const NextPost = document.querySelector("a#next-post");
    if (PostId >= TotalPosts) {
        NextPost.classList.add("disabled");
        NextPost.removeAttribute("href");
    } else {
        NextPost.classList.remove("disabled");
        NextPost.href = "./post.html?p=" + (PostId + 1);
    }
    Btn.href = "?Action=Favourite&PostId=" + PostId;
});