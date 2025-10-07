class RecipeIngredient {
    constructor(amount, unit, name) {
        this.Name = typeof name === "string" ? name : undefined;
        this.Amount = typeof amount === "number" && amount > 0 ? amount : undefined;
        this.Unit = typeof unit === "string" ? unit : undefined;
    }
    Render() {
        const elem = document.createElement("li");
        elem.innerHTML = `${typeof this.Amount !== "undefined" ? this.Amount : ""} ${typeof this.Unit !== "undefined" ? this.Unit : ""}${typeof this.Name !== "undefined" ? " " + this.Name : ""}`;
        return elem;
    }
}

class RecipeInfo {
    constructor(){
        this.Servings = 0;
        this.CookingTime = 0;
        this.PreparationTime = 0;
        this.MiscTime = 0;
        this.ServingsPerRecipe = 0;
    }
}

class Recipe {
    MainBranchSelector = "article#Recipe";
    RecipeTitleSelector = "h1#RecipeTitle";
    RecipeImageSelector = "figure#RecipePhotograph";
    RecipeDescriptionSelector="p#RecipeDescription";
    RecipeIngredientsSelector = "ul#RecipeIngredients";
    RecipeStepsSelector = "ol#RecipeSteps";

    constructor() {
        const Content = document.createElement("article");
        Content.id = "Recipe";
        this.Content = Content;
        this.Title = undefined;
        this.Servings = 1;
        this.CookingTime = 0;
        this.PreparationTime = 0;
        this.MiscTime = 0;
        this.ServingsPerRecipe = 0;
        this.Photograph = {src:undefined, alt:undefined};
        this.Description = undefined;
        this.Ingredients = [];
        this.Steps = [];
        const BaseUrl = `http://${window.location.host}`;
        const App = {
            "name": "Family Recipes Project",
            "short_name":"Recipes",
            "start_url": `${BaseUrl}/recipe.html`,
            "display": "standalone",
            "icons": [
                {
                    "src": `${BaseUrl}/logos/Recipe-192x192.png`,
                    "type": "image/png",
                    "sizes": "192x192"
                },
                {
                    "src": `${BaseUrl}/logos/Recipe-512x512.png`,
                    "type": "image/png",
                    "sizes": "512x512"
                }
            ],
            "protocol_handlers":[
                {
                    "protocol": "web+recipe",
                    "url": `${BaseUrl}/projects/recipes/%s`
                },
                {
                    "protocol": "web+recipeid",
                    "url": `${BaseUrl}/projects/recipe.html?r=%s`
                }
            ],
            "theme_color": "#0000ff",
            "background_color": "#ffffff",
            "lang": "en-US",
            "dir": "ltr",
            "orientation": "portrait",
            "description": "This is a test website of Family Recipe Project. This was designes as a part of Webpage Design Course ITD 110.",
            "scope": `${BaseUrl}`
        };
        document.title = App.name;
        const bloburl = URL.createObjectURL(new Blob([JSON.stringify(App)], {type:"application/json"}));
        const ManifestLink = document.createElement("link");
        ManifestLink.rel = "manifest";
        ManifestLink.href = bloburl;
        document.head.appendChild(ManifestLink);
    }
    SetTitle(name) {
        if(typeof name !== "string") return;
        this.Title = (typeof name === "string" ? name: undefined);
        return this;
    }
    RenderTitle() {
        if(typeof this.Title !=="string") return;
        const TitleElem = document.createElement("h1");
        TitleElem.id = "RecipeTitle";
        TitleElem.innerHTML = this.Title;
        return TitleElem;
    }
    SetPhotograph(url, alt) {
        //if(!IsValidURL || !IsValidAlt) return;
        this.Photograph = {src:url,alt:alt};
        return this;
    }
    RenderPhotograph() {
        if (typeof this.Photograph.alt !== "string" || typeof this.Photograph.src !=="string") return;
        const FigureElem = document.createElement("figure");
        FigureElem.id = "RecipePhotograph";
        // Create <img> element now, without src yet
        const Photograph = new Image();
        Photograph.style.userSelect = "none";
        Photograph.src = this.Photograph.src;
        Photograph.onload = () => {
            Photograph.width = 200;
            Photograph.height = 200 * (Photograph.naturalHeight / Photograph.naturalWidth);
        };
        Photograph.id = "Photograph";
        Photograph.alt = this.Photograph.alt;
        FigureElem.appendChild(Photograph);

        // Caption can also be added now
        const CaptionElem = document.createElement("figcaption");
        CaptionElem.innerHTML = this.Photograph.alt;
        FigureElem.appendChild(CaptionElem);

        // Return figure right away (it will "fill in" the image later)
        return FigureElem;
    }

        

    AddDescription(description) {
        if (typeof description !=="string") return;
        this.Description = description;
        return this;
    }
    RenderDescription(){
        if(typeof this.Description !== "string") return;
        const DescriptionElem = document.createElement("p");
        DescriptionElem.id = "RecipeDescription";
        DescriptionElem.innerHTML = this.Description;
        return DescriptionElem;
    }
    AddIngredient(ingredient) {
        const IsValidIngredient = ingredient instanceof RecipeIngredient;
        if (!IsValidIngredient) return;
        this.Ingredients.push(ingredient);
        return this;
    }
    AddIngredients(ingredients) {
        if(!Array.isArray(ingredients)) return;
        ingredients.forEach((ingredient)=>{
            if (ingredient instanceof RecipeIngredient) {
                this.Ingredients.push(ingredient);
            }
        })
        return this;
    }
    AdjustPerServing(){
        const servings = this.Servings;
        const ingredients = this.Ingredients;
        ingredients.forEach((ingredient)=>{
            const IsValidIngredient = ingredient instanceof RecipeIngredient;
            if(!IsValidIngredient) return;
            ingredient.Amount = ingredient.Amount * servings;
        });
        return this;
    }
    RenderIngredients() {
        const ListOfIngredients = document.createElement("ul");
        ListOfIngredients.id = "RecipeIngredients";
        this.Ingredients.forEach((ingredient)=>{
            if(ingredient instanceof RecipeIngredient) {
                ListOfIngredients.appendChild(ingredient.Render());
            }
        });
        return ListOfIngredients;
    }
    AddStep(text) {
        if(typeof text !=="string") return;
        this.Steps.push(text);
        return this;
    }
    RenderSteps() {
        const StepsList = document.createElement("ol");
        StepsList.id = "RecipeSteps";
        this.Steps.forEach((step)=>{
            const StepElem = document.createElement("li");
            StepElem.innerHTML = step;
            StepsList.appendChild(StepElem);
        });
        return StepsList;
    }
    RenderRecipeInfo(){
        const MainTable = document.createElement("table");
        const MainTableHeader = document.createElement("thead");
        const MainTableBody = document.createElement("tbody");
        const MainTableCaption = document.createElement("caption");
        MainTableHeader.innerHTML = `<tr><th>Property</th><th>Value</th></tr>`;

        const ServingsRow = document.createElement("tr");
        const ServingsInteractive = document.createElement("input");
        ServingsInteractive.id = "ServingsChooser";
        ServingsInteractive.value = "1";
        ServingsInteractive.min = ".1";
        ServingsInteractive.step = ".1";
        ServingsInteractive.max = "3";
        ServingsInteractive.oninput = () => {
            this.Servings = parseFloat(ServingsInteractive) || 1;
            this.AdjustPerServing();
        };
        const ServingsInteractiveTdVal = document.createElement("td");
        const ServingsInteractiveTdProp = document.createElement("td");
        ServingsInteractiveTdProp.innerHTML = "Servings";
        ServingsInteractiveTdVal.appendChild(ServingsInteractive);
        ServingsRow.appendChild(ServingsInteractiveTdProp);
        ServingsRow.appendChild(ServingsInteractiveTdVal);
        MainTableBody.appendChild(ServingsRow);
        MainTable.appendChild(MainTableCaption);
        MainTable.appendChild(MainTableHeader);
        MainTable.appendChild(MainTableBody);
        return MainTable;
    }
    RenderRecipe() {
        const RecipeDOM = this.Content;
        const TitleDOM = this.RenderTitle();
        const DescriptionDOM = this.RenderDescription();
        const PhotographDOM = this.RenderPhotograph();
        const IngredientsListDOM = this.RenderIngredients();
        const StepsDOM = this.RenderSteps();
        if(TitleDOM instanceof HTMLHeadingElement){
            RecipeDOM.appendChild(TitleDOM);
            document.title = `${this.Title} - ${document.title}`;
        }
        if(PhotographDOM instanceof HTMLElement && PhotographDOM.tagName === "FIGURE") {
            RecipeDOM.appendChild(PhotographDOM);
        }

        const DescriptionElem = document.createElement("h2");
        //DescriptionElem.id = "RecipeDescription";
        DescriptionElem.innerHTML = "Description";
        RecipeDOM.appendChild(DescriptionElem);

        if(DescriptionDOM instanceof HTMLParagraphElement) {
            RecipeDOM.appendChild(DescriptionDOM);
        }

        const IngredientsElem = document.createElement("h2");
        //IngredientsElem.id = "RecipeIngredients";
        IngredientsElem.innerHTML = "Ingredients";
        RecipeDOM.appendChild(IngredientsElem);

        if(IngredientsListDOM instanceof HTMLUListElement) {
            RecipeDOM.appendChild(IngredientsListDOM);
        }

        const StepsElem = document.createElement("h2");
        //StepsElem.id = "RecipeSteps";
        StepsElem.innerHTML = "Procedure";
        RecipeDOM.appendChild(StepsElem);

        if(StepsDOM instanceof HTMLOListElement){
            RecipeDOM.appendChild(StepsDOM);
        }
        return RecipeDOM;
    }
    PasteRecipe(selector){
        if(typeof selector !== "string") return;
        document.addEventListener("DOMContentLoaded", ()=>{
            document.querySelector(selector).appendChild(this.RenderRecipe());
        });
    }
}
//TODO: table;
//Save: https://cookpad.com/ua/r/16971226
//Save: https://www.russianfood.com/recipes/recipe.php?rid=148687;