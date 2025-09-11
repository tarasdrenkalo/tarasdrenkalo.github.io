const HeaderOrFooter = Vue.createApp({
    data() {
        return {
            Site: {
                Name: "My Test Website",
                Labels:{
                    Home: "Home",
                    Nodes: "Nodes",
                    About: "About",
                    Questions:"Questions",
                    Favourites:"Favourites",
                    Languages: "Languages",
                    Featured:"Featured",
                    Read:"Read",
                    Favourite:"Favourite"
                },
                Language: {
                    English: { Name: "English", URLParam: "en" },
                    Polish: { Name: "Polski", URLParam: "pl" },
                }
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", ()=>{
    HeaderOrFooter.mount('#vue-main');}
)