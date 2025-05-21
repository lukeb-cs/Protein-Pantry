/* search bar */
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const search = document.getElementById('search-input').value;       // user input stored
    let localSearches = JSON.parse(localStorage.getItem('searches'));
    if (localSearches == null) {
        localSearches = [];
    }
    localSearches.push(search);
    localStorage.setItem('searches', JSON.stringify(localSearches));   // user input added to local storage
});

/* search button */
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    // button only works with a input value
    if (query) {
        fetchRecipes(query);
    }
});

/* Fetches dish details from recipe api */
async function fetchRecipeDetails(recipeId) {
    const apiKey = 'f5580840bb414cd88ec257f9a1eac549'; // spoonacular api key
    const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(recipeDetailsUrl);
        const recipeData = await response.json();

        //display the information
        displayRecipe(recipeData);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

/* Fetches a list of recipes based on the query */
async function fetchRecipes(query) {
    const apiKey = 'f5580840bb414cd88ec257f9a1eac549'; // spoonacular api key
    const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(spoonacularUrl);
        const data = await response.json();

        // iterate through each recipe if results are an array
        if (Array.isArray(data.results)) {
            for (const recipe of data.results) {
                await fetchRecipeDetails(recipe.id);
            }
        } else {
            console.error('Error: data.results is not an array', data) // null array error case
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

/* GIPHY api */
async function fetchGif(dishName) {
    const giphyApiKey = 'iI0UL36SSr0f1UWcihPJ3fuCCOso2CwE'; // api key to access gifs
    const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${dishName}&limit=1`;

    try {
        const response = await fetch(giphyUrl);
        const data = await response.json();
        return data.data[0]?.images?.fixed_height?.url || '';
    } catch (error) {
        // displays nothing if no dish name related gif is found
        console.error('Error fetching gif:', error);
        return '';
    }
}

/* Converts recipe api data into HTML */
async function displayRecipe(recipe) {
    const resultsDiv = document.getElementById('results');

    // creates a unordered list of the dish ingredients
    let ingredientListHTML = '<ul>';
    if (recipe.extendedIngredients && Array.isArray(recipe.extendedIngredients)) {
        // takes the array of ingredient data and adds each element to a local variable
        recipe.extendedIngredients.forEach(ingredient => {
            ingredientListHTML += `<li>${ingredient.original}</li>`;
        });
    }

    ingredientListHTML += '</ul>';

    // creates a card with recipe name
    const card = document.createElement('div');
    card.className = 'card mb-3';
    const dishName = recipe.title;
    const gifUrl = await fetchGif(dishName);

    // HTML code containing dish and recipe information, including the instructions
    card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <div class="card search-card" style="width: 18rem;">
                <img src="${recipe.image}" class="img-fluid rounded-start" alt="${dishName}">
                <div class="card-body">
                    <h2 class="card-title">${dishName}</h2>
                </div>
            </div>
            <div class="col-md-8">
            <div class="col-md-8 result-container">
                <div class="card-body">
                    <p><strong>Ingredients:</strong></p>
                    ${ingredientListHTML}
                    <p><string>Instructions:</strong></p>
                    ${recipe.instructions}
                </div>
             ${gifUrl ? `<img src="${gifUrl}" class="img-fluid card-pics" alt="${dishName} gif">` : ''}
            </div>
        </div>
    `;
    resultsDiv.appendChild(card); // displayed on card

}
