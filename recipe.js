const randomRecipe = document.getElementById("randomRecipe");
const displayRecipe = document.getElementById("display-recipe");
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener("click", () => {
  let foodsearch = document.getElementById("foodsearch").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodsearch}`)
    .then((res) => res.json())
    .then((res) => {
      let html = "";
      if (res.meals) {
        res.meals.forEach((meal) => {
          html += `
                    <div class = "row">
                        <div class = "columntwo">
                        <h3>${meal.strMeal}</h3>
                            <img src = "${meal.strMealThumb}" height="200" width="200">
                        </div>
                    </div>
                `;
        });
      } else {
        html = "Sorry, we didn't find any meal. Try Feeling Lucky!";
      }

      displayRecipe.innerHTML = html;
    });
});

randomRecipe.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get ingredients
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="row">
			<div class="columnone">
				<img width="200" height="200" src="${meal.strMealThumb}" alt="Meal Image">
				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div class="columntwo">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div class="row">
			<div class="video" style="text-align: center;">
            <h3>Video Recipe</h3>
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ""
    }
	`;

  displayRecipe.innerHTML = newInnerHTML;
};
