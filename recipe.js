//Recipe Population
const userSearch = document.getElementById('searchbtn');
const recipeList = document.getElementById('display-recipe');
const randomRecipe = document.querySelector('randomRecipe');
let result = document.querySelector('#display-recipe');

//Event listeners
userSearch.addEventListener('click', userIngredient);

//Get input from user
function userIngredient(){
    fetch('www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0])
    })

    
}
function randomSearch(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result
}

randomRecipe.addEventListener('click', () => {
    let index = randomSearch(0, data.length - 1);
    result.innerText = data[index]
})