const dashboard = document.getElementById("dashboard");
const formPage = document.getElementById("formPage");
const recipesDiv = document.getElementById("recipes");

const addNewBtn = document.getElementById("addNewBtn");
const backBtn = document.getElementById("backBtn");
const saveRecipeBtn = document.getElementById("saveRecipeBtn");
const formTitle = document.getElementById("formTitle");

const recipeNameInput = document.getElementById("recipeName");
const recipeTypeInput = document.getElementById("recipeType");
const recipeDescInput = document.getElementById("recipeDesc");
const stepsListDiv = document.getElementById("stepsList");
const stepInput = document.getElementById("stepInput");
const addStepBtn = document.getElementById("addStepBtn");

let recipes = [];
let editIndex = null;
let steps = [];

// Show form page
addNewBtn.addEventListener("click", () => {
    formTitle.textContent = "Add Recipe";
    recipeNameInput.value = "";
    recipeDescInput.value = "";
    recipeTypeInput.value = "dessert";
    steps = [];
    renderSteps();
    editIndex = null;
    dashboard.style.display = "none";
    formPage.style.display = "block";
});

// Back button
backBtn.addEventListener("click", () => {
    formPage.style.display = "none";
    dashboard.style.display = "block";
});

// Add step
addStepBtn.addEventListener("click", () => {
    const stepText = stepInput.value.trim();
    if(!stepText) return;
    steps.push(stepText);
    renderSteps();
    stepInput.value = "";
});

function renderSteps(){
    stepsListDiv.innerHTML = "";
    steps.forEach((s,i) => {
        const div = document.createElement("div");
        div.classList.add("step-item");
        div.textContent = `${i+1}. ${s}`;
        stepsListDiv.appendChild(div);
    });
}

// Save Recipe
saveRecipeBtn.addEventListener("click", () => {
    const name = recipeNameInput.value.trim();
    const type = recipeTypeInput.value;
    let desc = recipeDescInput.value.trim();

    if (!name) {
        alert("Please enter recipe name!");
        return;
    }

    // Combine steps into final notes
    if(steps.length > 0){
        desc += "\n\nSteps:\n" + steps.map((s,i)=>`${i+1}. ${s}`).join("\n");
    }

    const recipeObj = { name, type, desc };

    if (editIndex !== null) {
        recipes[editIndex] = recipeObj;
    } else {
        recipes.push(recipeObj);
    }

    renderRecipes();
    formPage.style.display = "none";
    dashboard.style.display = "block";
});

// Render dashboard recipes
function renderRecipes() {
    recipesDiv.innerHTML = "";
    recipes.forEach((r,i) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card", r.type);
        card.innerHTML = `<h3>${r.name}</h3><p>${r.desc.replace(/\n/g,"<br>")}</p>`;
        card.addEventListener("click", () => editRecipe(i));
        recipesDiv.appendChild(card);
    });
}

// Edit recipe
function editRecipe(index){
    editIndex = index;
    const r = recipes[index];
    formTitle.textContent = "Edit Recipe";
    recipeNameInput.value = r.name;
    recipeDescInput.value = r.desc.split("Steps:")[0].trim();
    steps = r.desc.includes("Steps:") ? r.desc.split("Steps:")[1].trim().split("\n").map(s=>s.replace(/^\d+\.\s/,"")) : [];
    renderSteps();
    recipeTypeInput.value = r.type;
    dashboard.style.display = "none";
    formPage.style.display = "block";
}
