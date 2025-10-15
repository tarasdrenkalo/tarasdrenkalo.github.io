class RecipeIngredient {
    constructor(amount, unit, name, iswholenumber) {
        this.IsWhole = typeof iswholenumber === "boolean" ? iswholenumber : false;
        this.Name = typeof name === "string" ? name : undefined;
        this.Unit = typeof unit === "string" ? unit : undefined;
        const amt = typeof amount === "number" && !isNaN(amount) && amount > 0 ? amount : 0;
        this.Amount = amt;
        this.BaseAmount = amt;
    }

    Render() {
        const elem = document.createElement("li");
        elem.innerHTML = `~${typeof this.Amount !== "undefined" ? this.Amount : ""} ${typeof this.Unit !== "undefined" ? this.Unit : ""}${typeof this.Name !== "undefined" ? " " + this.Name : ""}`;
        return elem;
    }
}

class RecipeDump {
    constructor() {
        this.Exists = false;
        this.Title = "";
        this.Description = "";
        this.Photograph = { src: "", alt: "" };
        this.ServingsPerRecipe = 0;
        this.Multiplier = 1;
        this.CookingTime = 0;
        this.PreparationTime = 0;
        this.MiscTime = 0;
        this.Ingredients = [];
        this.Steps = [];
    }
    static GetRecipeID(asnumber){
        const RParam = new URLSearchParams(window.location.search).get("r");
        return asnumber && typeof asnumber ==="boolean" ? parseInt(RParam)|| -1 : RParam;
    }
    static InPrintingMode() {
        const Action = new URLSearchParams(window.location.search).get("action");
        return typeof Action ==="string" && Action === "print";
    }
    static GetMultiplier(){
        return parseFloat(new URLSearchParams(window.location.search).get("m")) ||1;
    }
    async FromJSON(id) {
        if (typeof id !=="string") return this;
        try {
            const Cookie = document.cookie.split("; ").find((row) => row.startsWith(`CachedRecipe-${id}=`))?.split("=")[1];
            let Dump;
            if (!Cookie) {
                const url = `${window.location.protocol}//${window.location.host}/dump/recipes.json`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                Dump = data[id];
                if (Dump) {
                    document.cookie = `CachedRecipe-${id}=${encodeURIComponent(JSON.stringify(Dump))}; max-age=7200; expires=${new Date(Date.now() + 7200 * 1000).toUTCString()}; SameSite=Strict; Secure`;
                }
            } else {
                Dump = JSON.parse(decodeURIComponent(Cookie));
            }

            this.Exists = !!Dump;
            if (!this.Exists) return this;

            this.Title = Dump.Title || "";
            this.Description = Dump.Description || "";
            this.Photograph = Dump.Photograph || { src: "", alt: "" };
            this.ServingsPerRecipe = Dump.ServingsPerRecipe || 1;
            this.Multiplier = Dump.Multiplier || 1;
            this.CookingTime = Dump.CookingTime || 0;
            this.PreparationTime = Dump.PreparationTime || 0;
            this.MiscTime = Dump.MiscTime || 0;
            this.Ingredients = Array.isArray(Dump.Ingredients) ? Dump.Ingredients : [];
            this.Steps = Array.isArray(Dump.Steps) ? Dump.Steps : [];
            return this;
        } catch (err) {
            console.error("Failed to load recipe:", err);
            this.Exists = false;
            return this;
        }
    }

    static async FromID(id) {
        const dump = new RecipeDump();
        return await dump.FromJSON(id);
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
        this.Multiplier = 1;
        this.CookingTime = 0;
        this.PreparationTime = 0;
        this.MiscTime = 0;
        this.ServingsPerRecipe = 1;
        this.Photograph = {src:undefined, alt:undefined};
        this.Description = undefined;
        this.Servings = this.ServingsPerRecipe * this.Multiplier;
        this.Ingredients = [];
        this.Steps = [];
    }
    static App() {
        const BaseUrl = `${window.location.protocol}//${window.location.host}`;
        const App = {
            "name": "Family Recipes Project",
            "short_name":"Recipes",
            "start_url": `${BaseUrl}/projects/recipe.html?r=1`,
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
                    "url": `${BaseUrl}/projects/recipes/%s.html`
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
            "description": "This is a Test Website of Family Recipe Project. This includes 2 recipes the author's family enjoyed. Designed as a part of Webpage Design Course ITD 110.",
            "scope": `${BaseUrl}`
        };
        document.title = App.name;
        const bloburl = URL.createObjectURL(new Blob([JSON.stringify(App)], {type:"application/json"}));
        const ManifestLink = document.createElement("link");
        ManifestLink.rel = "manifest";
        ManifestLink.href = bloburl;
        document.head.appendChild(ManifestLink);
        const ValidatorNeeded = window.location.host === "tarasdrenkalo.github.io" && !RecipeDump.InPrintingMode();
        if(ValidatorNeeded){
            const VLink = document.createElement("script");
            VLink.defer = true;
            VLink.src = "https://cdn.jsdelivr.net/gh/gracehoppercenter/validate@1.0.0/validate.js";
            VLink.referrerPolicy = "no-referrer";
            document.body.appendChild(VLink);
        }
    }
    static FromDump(dump) {
        if (!(dump instanceof RecipeDump)) return;
        const r = new Recipe();

        r.Title = dump.Title;
        r.Multiplier = dump.Multiplier;
        r.CookingTime = dump.CookingTime;
        r.PreparationTime = dump.PreparationTime;
        r.MiscTime = dump.MiscTime;
        r.ServingsPerRecipe = dump.ServingsPerRecipe;
        r.Photograph = dump.Photograph;
        r.Description = dump.Description;
        r.Servings = dump.ServingsPerRecipe * dump.Multiplier;
        r.Steps = dump.Steps;

        dump.Ingredients.forEach(i => {
            const ing = new RecipeIngredient(i.BaseAmount, i.Unit, i.Name, i.IsWhole);
            ing.BaseAmount = i.BaseAmount;
            r.AddIngredient(ing);
        });
        const multiplier = RecipeDump.GetMultiplier();
        r.AdjustPerServing(multiplier);
        return r;
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
        const IsValidURL = typeof url ==="string";
        const IsValidAlt = typeof alt ==="string";
        if(!IsValidURL || !IsValidAlt) return;
        this.Photograph = {src:url,alt:alt};
        return this;
    }
    RenderPhotograph() {
        if (typeof this.Photograph.alt !== "string" || typeof this.Photograph.src !=="string") return;
        const FigureElem = document.createElement("figure");
        FigureElem.id = "RecipePhotograph";
        const Photograph = new Image();
        Photograph.title = this.Photograph.alt;
        Photograph.src = this.Photograph.src;
        Photograph.referrerPolicy = "no-referrer";
        Photograph.onload = () => {
            Photograph.width = 200;
            Photograph.height = 200 * (Photograph.naturalHeight / Photograph.naturalWidth);
        };
        Photograph.id = "Photograph";
        Photograph.alt = this.Photograph.alt;
        FigureElem.appendChild(Photograph);
        const CaptionElem = document.createElement("figcaption");
        CaptionElem.innerHTML = this.Photograph.alt;
        FigureElem.appendChild(CaptionElem);

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
        DescriptionElem.style.textAlign = "justify";
        DescriptionElem.style.textIndent = "1em";
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
    AdjustPerServing(multiplier) {
        const Servings = parseFloat(multiplier) || 1;
        if (isNaN(Servings) || Servings <= 0) return;

        this.Servings = Servings.toFixed(1);

        this.Ingredients.forEach((ingredient) => {
            if (!(ingredient instanceof RecipeIngredient)) return;
            const scaled = ingredient.BaseAmount * Servings;
            ingredient.Amount = ingredient.IsWhole
                ? Math.round(scaled)
                : parseFloat(scaled.toFixed(1));
        });
        const IngredientsList = document.querySelector(this.RecipeIngredientsSelector);
        if (IngredientsList) {
            IngredientsList.innerHTML = "";
            this.Ingredients.forEach(i => IngredientsList.appendChild(i.Render()));
        }
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
        const URLParams = new URLSearchParams(window.location.search);
        const MainTable = document.createElement("table");
        const MainTableHeader = document.createElement("thead");
        const MainTableBody = document.createElement("tbody");
        const MainTableCaption = document.createElement("caption");
        MainTableHeader.innerHTML = `<tr><th>Property</th><th>Value</th></tr>`;
        const ServingsRow = document.createElement("tr");
        const ServingsInteractive = document.createElement("input");
        ServingsInteractive.type = "number";
        ServingsInteractive.title = "Multiplier";
        ServingsInteractive.id = "ServingsChooser";
        ServingsInteractive.value = URLParams.get("m")||"1";
        ServingsInteractive.min = ".1";
        ServingsInteractive.step = ".05";
        ServingsInteractive.max = "10";
        const ServingsInteractiveTdVal = document.createElement("td");
        const ServingsInteractiveTdProp = document.createElement("td");
        ServingsInteractiveTdProp.innerHTML = "Multiplier";
        ServingsInteractiveTdVal.appendChild(ServingsInteractive);
        ServingsRow.appendChild(ServingsInteractiveTdProp);
        ServingsRow.appendChild(ServingsInteractiveTdVal);

        MainTableBody.appendChild(ServingsRow);
        const AddRow = (prop, val, id) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            td1.textContent = prop;
            td2.textContent = val;
            if(id && typeof id ==="string"){
                td2.id = id;
            }
            tr.append(td1, td2);
            MainTableBody.appendChild(tr);
        };

        AddRow("Servings", `~${this.ServingsPerRecipe * this.Multiplier}`, "ServingCounter");
        AddRow("Cooking Time", `~${this.CookingTime} min`);
        AddRow("Preparation Time", `~${this.PreparationTime} min`);
        AddRow("Miscellaneous Time", `~${this.MiscTime} min`);
        AddRow("Total", `~${this.CookingTime + this.PreparationTime + this.MiscTime} min`);
        ServingsInteractive.addEventListener("change", () => {
            const Servings = parseFloat(ServingsInteractive.value);
            const MinServings = parseFloat(ServingsInteractive.min);
            const MaxServings = parseFloat(ServingsInteractive.max);
            this.Servings = MinServings <= Servings && Servings <= MaxServings ?this.ServingsPerRecipe * Servings:1;
            this.AdjustPerServing(Servings);
            document.querySelector("td#ServingCounter").textContent = `~${Math.round(this.ServingsPerRecipe * Servings)}`;
        });
        MainTable.append(MainTableCaption, MainTableHeader, MainTableBody);
        return MainTable;
    }
    RenderRecipe() {
        const RecipeDOM = this.Content;
        const TitleDOM = this.RenderTitle();
        const DescriptionDOM = this.RenderDescription();
        const PhotographDOM = this.RenderPhotograph();
        const IngredientsListDOM = this.RenderIngredients();
        const StepsDOM = this.RenderSteps();
        const InfoTableDOM = this.RenderRecipeInfo();
        if(TitleDOM instanceof HTMLHeadingElement){
            RecipeDOM.appendChild(TitleDOM);
            document.title = `${this.Title} - ${document.title}`;
        }
        if(PhotographDOM instanceof HTMLElement && PhotographDOM.tagName === "FIGURE") {
            RecipeDOM.appendChild(PhotographDOM);
        }

        const DescriptionElem = document.createElement("h2");
        DescriptionElem.id = "RecipeDescription";
        DescriptionElem.innerHTML = "Description";
        RecipeDOM.appendChild(DescriptionElem);

        if(DescriptionDOM instanceof HTMLParagraphElement) {
            RecipeDOM.appendChild(DescriptionDOM);
        }
        if(InfoTableDOM instanceof HTMLTableElement) {
            RecipeDOM.appendChild(InfoTableDOM);
        }

        const IngredientsElem = document.createElement("h2");
        IngredientsElem.id = "RecipeIngredients";
        IngredientsElem.innerHTML = "Ingredients";
        RecipeDOM.appendChild(IngredientsElem);

        if(IngredientsListDOM instanceof HTMLUListElement) {
            RecipeDOM.appendChild(IngredientsListDOM);
        }

        const StepsElem = document.createElement("h2");
        StepsElem.id = "RecipeSteps";
        StepsElem.innerHTML = "Procedure";
        RecipeDOM.appendChild(StepsElem);

        if(StepsDOM instanceof HTMLOListElement){
            RecipeDOM.appendChild(StepsDOM);
        }
        return RecipeDOM;
    }
    PasteRecipe(Selector){
        Recipe.App();
        if (typeof Selector !== "string") return;
        const Target = document.querySelector(Selector);
        if (!Target) {
            console.error(`Target selector "${Selector}" not found.`);
            return;
        }
        const Rendered = this.RenderRecipe();
        if (Rendered) Target.appendChild(Rendered);
        document.addEventListener("DOMContentLoaded", ()=>{
            if(RecipeDump.InPrintingMode()) window.print();
        });
    }
}