document.addEventListener("DOMContentLoaded", async function() {
    const Btn = document.querySelector("#featured-post-action-favourite");
    const post = await Post.Load(Post.GetFeaturedPostId());
    if (!post) return;
    post.DisplayFeatured();
    Btn.classList.add(post.IsFavourited()?"btn-success":"btn-primary");
    Btn.classList.remove(post.IsFavourited()?"btn-primary":"btn-success");
    Btn.textContent = post.IsFavourited() ?"Favourited" : "Favourite";
    Btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (post.IsFavourited()) {
            post.RemoveFromFavourites(Btn);
            Btn.classList.remove("btn-success");
            Btn.classList.add("btn-primary");
            Btn.textContent = "Favourite";
        } else {
            post.AddToFavourites(Btn);
            Btn.classList.add("btn-success");
            Btn.classList.remove("btn-primary");
            Btn.textContent = "Favourited";
        }
    });
});