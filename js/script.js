let searchValue;

const showDetails = async (id) => {
    try {
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        let response = await fetch(url);
        let data = await response.json();
        let title = document.querySelector(".meal-title");
        let body = document.querySelector(".modal-body");
        title.innerText = `${data.meals[0].strMeal}`
        body.innerHTML = `<img class="img-fluid" src="${data.meals[0].strMealThumb}">
        <p class="mt-5">${data.meals[0].strInstructions}</p>
        `
    } catch (err) {
        alert("something is wrong")
    }
}
const showMealCard = async (mealName, show = 6) => {
    
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        const response = await fetch(url);
        const data = await response.json();
        const cards = document.getElementById("cards");
        let meals = data.meals; 
        cards.innerHTML = "";
        let showMeals =  show === true ? meals.length : meals.length < 6    ? meals.length : show;
        for(let i = 0; i < showMeals; i++) {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="card mb-3 " style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="${meals[i].strMealThumb}"
                class="card-img"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${meals[i].strMeal}</h5>
                <p class="card-text">
                  ${meals[i].strTags === null ? meals[i].strMeal : meals[i].strTags}
                </p>
                <button onclick="showDetails(${meals[i].idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
              </div>
            </div>
          </div>
        </div>
        `

        cards.appendChild(card)
        }       
} catch (err) {
        alert("please inter valid name");
    }
}

const searchMeal = () => {    
        const input = document.getElementById("search-input");
        const inputValue = input.value;
        showMealCard(inputValue,);   
        searchValue = inputValue;
    
}



const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchMeal)
const showAllBtn = document.getElementById("show-all-btn");
showAllBtn.onclick = () => {
    showMealCard(searchValue, true); 
}

