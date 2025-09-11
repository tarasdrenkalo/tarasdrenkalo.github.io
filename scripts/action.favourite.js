function FavouriteNode(NodeID) {
    const NumberNodeID = parseInt(NodeID) || 0;
    if (NumberNodeID > 0) {
        let AllFavourited = JSON.parse(localStorage.getItem("FavouritedNodesIDs")) || [];

        if (!AllFavourited.includes(NumberNodeID)) {
            AllFavourited.push(NumberNodeID);
        }

        localStorage.setItem("FavouritedNodesIDs", JSON.stringify(AllFavourited));

        // Update button
        const btn = document.querySelector("#featured-node-act-fav");
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");
        btn.textContent = "Favourited";
    }
}

function UnfavouriteNode(NodeID) {
    const NumberNodeID = parseInt(NodeID) || 0;
    if (NumberNodeID > 0) {
        let AllFavourited = JSON.parse(localStorage.getItem("FavouritedNodesIDs")) || [];

        const index = AllFavourited.indexOf(NumberNodeID);
        if (index !== -1) {
            AllFavourited.splice(index, 1);
        }

        localStorage.setItem("FavouritedNodesIDs", JSON.stringify(AllFavourited));

        // Update button
        const btn = document.querySelector("#featured-node-act-fav");
        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");
        btn.textContent = "Favourite";
    }
}

function IsFavouritedNode(NodeID) {
    const NumberNodeID = parseInt(NodeID) || 0;
    if (NumberNodeID > 0) {
        let AllFavourited = JSON.parse(localStorage.getItem("FavouritedNodesIDs"));
        if (!Array.isArray(AllFavourited)) {
            return false;
        }
        return AllFavourited.includes(NumberNodeID);
    }
    return false;
}
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("#featured-node-act-fav");
    const NodeID = parseInt(btn.getAttribute("nodeid"));

    // Set initial state
    if (IsFavouritedNode(NodeID)) {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");
        btn.textContent = "Favourited";
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (IsFavouritedNode(NodeID)) {
            UnfavouriteNode(NodeID);
        } else {
            FavouriteNode(NodeID);
        }
    });
});