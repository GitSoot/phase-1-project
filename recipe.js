userSearch = document.getElementById('searchbtn');

//Event listeners
userSearch.addEventListener('click', userIngredient);

//Get input from user
function userIngredient(){
    let userInput = document.getElementById('foodsearch');
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodsearch}`)
    .then(response => response.json())
    .then(data => console.log(data))
}