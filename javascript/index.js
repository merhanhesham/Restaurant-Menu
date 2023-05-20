
/*********************side menu*************************************************/
//show side menu
$('.icon-change').click(function () {
  if ($(this).html() == '<i class="fa-solid open-close-icon fa-2x fa-align-justify "></i>') {
    $('.side-nav-black-div').animate({ left: 0 }, 400)
    $(this).html('<i class="fa-solid fa-xmark fa-2x close-icon"></i>')
    $('ul').slideDown(1000);
  }

  //hide side menu
  else {
    let x = $('.side-nav-black-div').innerWidth();
    $('ul').slideUp(200, function () {
      $('.side-nav-black-div').animate({ left: -x }, 400)
    });
    $('.icon-change').html('<i class="fa-solid open-close-icon fa-2x fa-align-justify "></i>')

  }
})

// hide side menu if i click on any li of ul
$('ul li').click(function () {
  let x = $('.side-nav-black-div').innerWidth();
  $('ul').slideUp(200, function () {
    $('.side-nav-black-div').animate({ left: -x }, 400)
  });
  $('.icon-change').html('<i class="fa-solid open-close-icon fa-2x fa-align-justify "></i>')
})

/*********************************************************loading screen*******************************************************************/

//loading screen on reload

$(window).ready(function () {
  $('.loadingscreen').fadeOut(1000, function () {
    $('body').css('overflow', 'visible');
    randomMeals();
  });
})

//random Meals when you reload
async function randomMeals() {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let finalres = await res.json();
  mealsArray = finalres.meals;
  //console.log(mealsArray);

  for (var i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  boxStore = '';
  getMealId();

}



/********************************************************cartona display func ***************************************************************/

var boxStore = ''; //global variable act as cartona for display func

function displayBox(param1, param2) {
  // params mealsArray[i].strMealThumb, mealsArray[i].strMeal
  boxStore += `<div class="col-md-3 mb-3">
      <div class="food-img position-relative">
          <img src="${param1}" class="w-100" />
          <div class="food-img-layer position-absolute bg-white w-100 h-100 left-0 bg-opacity-75 cursor-pointer">
              <h2 class="ms-2">${param2}</h2> 
          </div>
      </div>
  </div>`
}


var mealsArray = []; //global array for all content
/********************************** when click on search li***********************************/

let search = document.querySelector('.search');
let searchLayer = document.querySelector('.search-layer');

search.addEventListener('click', function () {
  searchLayer.classList.remove('d-none');
  document.querySelector('.rowContent').classList.add('d-none')
})

/************************search Layer / by name**********************************************************************************/

let searchName = document.querySelector('.searchName');
searchName.addEventListener('keyup', function () {
  //call api func, pass parameter of input value
  searchByNameApi(searchName.value)
  $(".loadingscreen2").fadeIn(400);
  $(".loadingscreen2").fadeOut(400);
})

async function searchByNameApi(x) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
  let finalres = await res.json();
  mealsArray = finalres.meals;
  //console.log(mealsArray);
  for (var i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  document.querySelector('.rowContent').classList.remove('d-none');
  boxStore = '';
  getMealId();
}

/*********************************************search layer/ by first letter ***************************************/

let searchLetter = document.querySelector('.searchLetter');
searchLetter.addEventListener('keyup', function () {
  //call api func, pass parameter of input value
  searchByLetterApi(searchLetter.value);
  $(".loadingscreen2").fadeIn(400);
  $(".loadingscreen2").fadeOut(400);
})

async function searchByLetterApi(y) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`);
  let finalres = await res.json();
  mealsArray = finalres.meals;

  for (var i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  document.querySelector('.rowContent').classList.remove('d-none');
  boxStore = '';
  getMealId();
}

/***************************************************display meal details**********************************************************/
//get ID

let searchlayerr = document.querySelector('.search-layer ');
let mealDetailsLayer = document.querySelector('.mealDetailsLayer');

function getMealId() {


  var foodimgs = document.querySelectorAll('.food-img-layer');// select all food imgs
  foodimgs = Array.from(foodimgs);
  for (let i = 0; i < foodimgs.length; i++) {

    foodimgs[i].addEventListener('click', function () {
      let clickedMealId = mealsArray[i].idMeal;
      console.log(clickedMealId);//ady elid llapi
      //call api func here, pass parameter
      displayMealDetails(clickedMealId);
      $(".loadingscreen2").fadeIn(400);
      $(".loadingscreen2").fadeOut(400);
      searchlayerr.classList.add('d-none');
    })
  }
}

//display meal details in html
async function displayMealDetails(z) {

  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${z}`);
  let finalresult = await result.json();
  console.log(finalresult.meals[0]);

  let MealObject = finalresult.meals[0];
  //let MealObject = finalresult.meals;
  let ingredientsCartona = '';

  /*for (let i = 1; i <= 20; i++) {
    if (`MealObject.strIngredient${i}`) {
      //ingredientsCartona += `<li class="me-2 p-1 alert alert-info">${MealObject.strIngredient1}</li>`
      console.log(`MealObject.strIngredient${i}`)
    }
  }*/


  //let strtags="Meat,casserole"
  let tags=MealObject.strTags.split(',');//array of tags
  let tagsCartona='';
  for(var i=0;i<tags.length;i++){
    tagsCartona+=`<div class="tags me-2 p-1 alert alert-info d-inline">${tags[i]}</div>`;
  }

  var maincartouna = '';
  maincartouna += `<div class="container text-white">
  <div class="row">
      <div class="col-md-4">
          <img src="${MealObject.strMealThumb}" alt="mealDetail" class="w-100 rounded" />
          <h3>${MealObject.strMeal}</h3>
      </div>
      <div class="col-md-8">
          <h3>Instructions</h3>
          <p>${MealObject.strInstructions}</p>
          <h3>Area: ${MealObject.strArea}</h3>
          <h3>Category: ${MealObject.strCategory}</h3>
          <h3>Recipes:</h3>
          <ul type="none" class="d-flex mx-0 p-0 flex-wrap mt-3">
          <li class="me-2 p-1 alert alert-info">${MealObject.strMeasure1 + " " +MealObject.strIngredient1}</li>
          <li class="me-2 p-1 alert alert-info">${MealObject.strMeasure2 + " "+ MealObject.strIngredient2}</li>
          <li class="me-2 p-1 alert alert-info">${MealObject.strMeasure3 + " "+ MealObject.strIngredient3}</li>
          <li class="me-2 p-1 alert alert-info">${MealObject.strMeasure4 + " "+ MealObject.strIngredient4}</li>
          <li class="me-2 p-1 alert alert-info">${MealObject.strMeasure5 + " "+ MealObject.strIngredient5}</li>
          </ul>
          <h3 class="mb-3">Tags:</h3>
          ${tagsCartona}
          <div class="twobuttons d-flex mt-3">
              <div class="tags me-2 p-1 alert bg-danger d-inline source">source</div>
              <div class="tags me-2 p-1 alert bg-success d-inline youtube">youtube</div>
          </div>
          </div>
      </div>
  </div>`

  document.querySelector('.rowContent').innerHTML = maincartouna;

  $('.youtube').click(function () {
    window.open(`${MealObject.strYoutube}`, '_blank');
  })
  $('.source').click(function () { //null
    window.open(`${MealObject.strSource}`, '_blank');
  })


  $('.youtube').css('cursor', 'pointer');
  $('.source').css('cursor', 'pointer');
}

/*********************************************************************categories layer *****************************************************************/
$(".loadingscreen2").hide(0);
let categories = document.querySelector('.categories');
//call fetch api and change classlists when click on categories li

categories.addEventListener('click', function () {
  $(".loadingscreen2").fadeIn(400);
  $(".loadingscreen2").fadeOut(400);
  searchLayer.classList.add('d-none');
  categoriesApi();
})

//fetch categories api
async function categoriesApi() {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let finalres = await res.json();
  mealsArray = finalres.categories;
  console.log(mealsArray);

  //a3red elcategories
  let cartonaa = '';
  for (let i = 0; i < mealsArray.length; i++) {
    cartonaa +=
      `<div class="col-md-3 mb-4"><!--dah elbykrr f api-->
    <div class="food-img position-relative">
        <img src="${mealsArray[i].strCategoryThumb}" /><!--img src FROM API-->
        <div
            class="food-img-layer position-absolute bg-white w-100 h-100 left-0 bg-opacity-75 text-center p-2">
            <div>
                <h2 class="ms-2">${mealsArray[i].strCategory}</h2> <!--FROM API-->
                <p>${mealsArray[i].strCategoryDescription.slice(0, 80)}</p>
            </div>
        </div>
    </div>
</div>`
  }
  document.querySelector('.rowContent').innerHTML = cartonaa;
  getStrCategory();
}

/**************************************************************filter by category*********************************************************** */

function getStrCategory() {

  var foodCategories = document.querySelectorAll('.food-img-layer');// select all food imgs
  foodCategories = Array.from(foodCategories);

  for (let i = 0; i < foodCategories.length; i++) {

    foodCategories[i].addEventListener('click', function () {

      let clickedStrCategory = mealsArray[i].strCategory;
      console.log(clickedStrCategory);//ady elstrcategory ll api
      //call api func here, pass parameter
      filterByCategory(clickedStrCategory);
      $(".loadingscreen2").fadeIn(400);
      $(".loadingscreen2").fadeOut(400);
    })
  }
}

//display filterByCategory in html
async function filterByCategory(z) {

  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${z}`);
  let finalresult = await result.json();
  console.log(finalresult.meals);

  mealsArray = finalresult.meals;
  for (var i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  boxStore = '';
  getMealId();
}

/*********************************************************area***************************************************************** */

let area = document.querySelector('.area');
area.addEventListener('click', function () {
  $(".loadingscreen2").fadeIn(400);
  $(".loadingscreen2").fadeOut(400);
  //call fetch area API func
  fetchAreaApi();
})

async function fetchAreaApi() {
  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let finalresult = await result.json();
  mealsArray = finalresult.meals;
  console.log(finalresult.meals);

  let cartona = '';
  for (var i = 0; i < mealsArray.length; i++) {
    cartona += `<div class="col-md-3 text-white text-center mb-4 allArea">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${mealsArray[i].strArea}</h3>
</div>`
  }
  document.querySelector('.rowContent').innerHTML = cartona;
  //hena h call elfunc elhtgeb clicked area el area meals
  getStrArea();
}

function getStrArea() {
  let allArea = document.querySelectorAll('.allArea');

  allArea = Array.from(allArea);
  for (let i = 0; i < allArea.length; i++) {
    allArea[i].addEventListener('click', function () {
      let clickedArea = mealsArray[i].strArea;
      console.log(clickedArea);
      //pass clickedarea to api function, w a call it hena
      displayAreaMealsApi(clickedArea);
      $(".loadingscreen2").fadeIn(400);
      $(".loadingscreen2").fadeOut(400);
    })
  }

}
async function displayAreaMealsApi(z) {

  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${z}`);
  let finalresult = await result.json();
  console.log(finalresult.meals);
  mealsArray = finalresult.meals;
  for (let i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  boxStore = '';
  getMealId();
}

/********************************************************************ingredients************************************************************ */

let ingredients = document.querySelector('.ingredients');
ingredients.addEventListener('click', function () {
  $(".loadingscreen2").fadeIn(400);
  $(".loadingscreen2").fadeOut(400);
  //call fetch area API func
  console.log('clicked')
  fetchIngredientsApi();
})

async function fetchIngredientsApi() {
  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let finalresult = await result.json();
  mealsArray = finalresult.meals;
  console.log(finalresult.meals);

  let cartona = '';
  for (var i = 0; i <= 20; i++) {
    cartona += `<div class="col-md-3 text-white text-center mb-3 allIngredients">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
   <h3>${mealsArray[i].strIngredient}</h3>
   <p>${mealsArray[i].strDescription.slice(0, 90)}</p>
</div>`
  }
  document.querySelector('.rowContent').innerHTML = cartona;
  //hena h call elfunc elhtget clicked area el area meals
  getStrMeal();
}

function getStrMeal() {
  let allIngredients = document.querySelectorAll('.allIngredients');

  allIngredients = Array.from(allIngredients);
  for (let i = 0; i < allIngredients.length; i++) {
    allIngredients[i].addEventListener('click', function () {
      let clickedIngredient = mealsArray[i].strIngredient;
      console.log(clickedIngredient);
      //pass clickedIngredient to api function, call it here
      displayIngredientMealsApi(clickedIngredient);
      $(".loadingscreen2").fadeIn(400);
      $(".loadingscreen2").fadeOut(400);
    })
  }

}
async function displayIngredientMealsApi(z) {

  let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${z}`);
  let finalresult = await result.json();
  console.log(finalresult.meals);
  mealsArray = finalresult.meals;

  for (let i = 0; i < mealsArray.length; i++) {
    displayBox(mealsArray[i].strMealThumb, mealsArray[i].strMeal);
  }
  document.querySelector('.rowContent').innerHTML = boxStore;
  boxStore = '';
  getMealId();
}
/*************************************************************form************************************************************************ */


let contactUs = document.querySelector('.contactUs');
contactUs.addEventListener('click', function () {

  //call displayContactForm
  displayContactForm();
  //let passInput=document.querySelector('.passInput');

})



let nameInputfocus = false;
let emailInputfocus = false;
let phoneInputfocus = false;
let ageInputfocus = false;
let passInputfocus = false;
let repassInputfocus = false;

function displayContactForm() {
  document.querySelector('.rowContent').innerHTML = ` 
  <div class="col-md-6 form">
  <input class="form-control mb-4 nameInput"placeholder="Enter Your Name"type="text"onkeyup="inputsValidation()"  />
  <div  class="namewrong alert alert-danger w-100 mt-2 d-none">
      Special characters and numbers not allowed
  </div>

  <input class="form-control mb-4 phoneInput"placeholder="Enter Your Phone"type="number"onkeyup="inputsValidation()" />
  <div  class=" phonewrong alert alert-danger w-100 mt-2 d-none">
      Enter valid Phone Number
  </div>

  <input class="form-control mb-4 passInput"placeholder="Enter Your Password"type="password"onkeyup="inputsValidation()" />
  <div  class="passwrong alert alert-danger w-100 mt-2 d-none">
      Enter valid password *Minimum eight characters, at least one letter and one number:*
  </div>
</div>

<div class="col-md-6 form">
  <input class="form-control mb-4 emailInput"placeholder="Enter Your Email"type="email"onkeyup="inputsValidation()" />
  <div  class="emailwrong alert alert-danger w-100 mt-2 d-none">
      Email not valid *exemple@yyy.zzz
  </div>

  <input class="form-control mb-4 ageInput"placeholder="Enter Your Age"type="number"onkeyup="inputsValidation()" />
  <div  class="agewrong alert alert-danger w-100 mt-2 d-none">
      Enter valid age
  </div>

  <input class="form-control mb-4 repassInput"placeholder="Enter Your Repassword"type="password"onkeyup="inputsValidation()" />
  <div  class="repasswrong alert alert-danger w-100 mt-2 d-none">
      Enter valid repassword 
  </div>
  
</div>
<div class="btndiv d-inline m-auto">
  <button type="button" class="btn btn-outline-danger w-100 submitBtn disabled">Danger</button>
</div>`


  document.querySelector(".nameInput").addEventListener("focus", function () {
    nameInputfocus = true
  })

  document.querySelector(".emailInput").addEventListener("focus", function () {
    emailInputfocus = true
  })

  document.querySelector(".phoneInput").addEventListener("focus", function () {
    phoneInputfocus = true
  })

  document.querySelector(".ageInput").addEventListener("focus", function () {
    ageInputfocus = true
  })

  document.querySelector(".passInput").addEventListener("focus", function () {
    passInputfocus = true
  })

  document.querySelector(".repassInput").addEventListener("focus", function () {
    repassInputfocus = true
  })

}

function inputsValidation() {
  if (nameInputfocus) {
    if (nameValidation()) {
      document.querySelector(".namewrong").classList.add("d-none")

    } else {
      document.querySelector(".namewrong").classList.remove("d-none")

    }
  }
  if (emailInputfocus) {

    if (emailValidation()) {
      document.querySelector(".emailwrong").classList.add("d-none")
    } else {
      document.querySelector(".emailwrong").classList.remove("d-none")

    }
  }

  if (phoneInputfocus) {
    if (phoneValidation()) {
      document.querySelector(".phonewrong").classList.add("d-none")
    } else {
      document.querySelector(".phonewrong").classList.remove("d-none")

    }
  }

  if (ageInputfocus) {
    if (ageValidation()) {
      document.querySelector(".agewrong").classList.add("d-none")
    } else {
      document.querySelector(".agewrong").classList.remove("d-none")

    }
  }

  if (passInputfocus) {
    if (passwordValidation()) {
      document.querySelector(".passwrong").classList.add("d-none")
    } else {
      document.querySelector(".passwrong").classList.remove("d-none")

    }
  }
  if (repassInputfocus) {
    if (repasswordValidation()) {
      document.querySelector(".repasswrong").classList.add("d-none")
    } else {
      document.querySelector(".repasswrong").classList.remove("d-none")

    }
  }

  let submitBtn = document.querySelector(".submitBtn");
  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.classList.remove("disabled")
  } else {
    submitBtn.classList.add("disabled")
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.querySelector(".nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.querySelector(".emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector(".phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.querySelector(".ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.querySelector(".passInput").value))
}

function repasswordValidation() {
  return document.querySelector(".repassInput").value == document.querySelector(".passInput").value
}















