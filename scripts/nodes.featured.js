function ShowFeaturedNode(NodeID){
    const AllNodes = [
        {
            Headline:"Sorry!",
            Article:"<p>This node does not exist! But, you may check my other nodes!</p>"
        },
        {
            Headline:"Hello!",
            Article:"<p>You\'re on the right spot! You\'re seeing my first node! Soon I will be posting nodes about random stuff I experience. Check them later!</p>"
        }
    ];
    const NumberNodeID = parseInt(NodeID)||1;
    if (NodeID !== 0) {
        document.querySelector("h5#featured-node-headline").innerHTML = AllNodes[NumberNodeID].Headline;
        document.querySelector("p#featured-node-article").innerHTML = AllNodes[NumberNodeID].Article;
        document.querySelector("a#featured-node-link").href = "./node.html?n="+NumberNodeID;
        document.querySelector("div#featured-node").setAttribute("nodeid", NumberNodeID);
        document.querySelector("a#featured-node-act-fav").href = "?Action=Favourie&NodeID="+NodeID;
        document.querySelector("a#featured-node-act-fav").setAttribute("nodeid",NodeID);
        document.querySelector("a#featured-node-act-fav").addEventListener("click", (e)=>{e.preventDefault();});
    }
}
document.addEventListener("DOMContentLoaded", ()=>{ShowFeaturedNode(1);});