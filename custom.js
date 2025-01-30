let searchInput = document.getElementById("getinput");
let searchBtn = document.getElementById("dev-btn");
let mainBox = document.getElementById("box");
let statContain = document.getElementById("statistic-box-contain");

function fetchAPI() {
  if (searchInput.value) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => postSingle(data.drinks));
    statContain.style.display = "none";
  } else {
    alert("Please Enter a code");
    statContain.style.display = "block";
  }
}

// Staistic Data that will appear first

let myBox = document.getElementById("statistic-box");

function staisticApi() {
  let myUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini";
  fetch(myUrl)
    .then((res) => res.json())
    .then((data) => statSingle(data.drinks));
}

function statSingle(drink) {
  console.log(drink);
  drink.map((post) => {
    myBox.innerHTML += `
                <div class="col-span-4 bg-gray-800 px-6 py-6 rounded-lg">
                    <img class="w-32 md:w-full rounded-md h-32  md:h-auto object-contain md:object-cover"
                        src=${post.strDrinkThumb}
                        alt="">
                    <h2 class="text-base md:text-2xl text-left py-3 font-bold text-white">${post.strDrink}</h2>
                    <p class="text-sm md:text-base font-light text-left text-white line-clamp-3">${post.strInstructions}</p>
                    <p class="text-sm md:text-base italic text-gray-200 font-semibold text-left pt-4">
                    ${post.strCategory}</p>
                    <div class="flex gap-4 flex-col md:flex-row pt-6">
                        <button onclick="fetchDetails('${post.idDrink}')"
                            class="basis-1/2 inline-block bg-transparent border border-red-600 text-gray-50 text-center py-2 text-base font-semibold rounded-lg cursor-pointer">More
                            Details</button>
                    </div>
                </div>
    `;
  });
}

staisticApi();

// End Staistic Data

function fetchDetails(id) {
  console.log("Look up", id);
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDrinkDetails(data.drinks[0]));
}

function showDrinkDetails(drink) {
  console.log(drink);
  let popUp = document.getElementById("popup");
  popUp.classList.add("visible");
  popUp.classList.remove("invisible");
  popUp.innerHTML = `
    <div class="w-4/5 md:w-3/5 h-[70vh] md:h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center overflow-y-scroll md:overflow-y-auto">
            <div class=" bg-orange-100 justify-center items-center text-left py-12 px-8 rounded-md">
              <div class="text-right"><button onclick="closePopup()"
                    class="inline-block text-base font-normal bg-red-600 text-white px-2 py-2 rounded-md cursor-pointer absolute top-3 right-3"><svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg></button></div>
                <h2 class="text-xl font-bold text-lime-950">${drink.strDrink}</h2>
                <p class="text-lg font-normal text-lime-950 py-6">${drink.strInstructions}
                </p>
            </div>
    </div>
    `;
}

function closePopup() {
  let popUp = document.getElementById("popup");
  popUp.classList.remove("visible");
  popUp.classList.add("invisible");
}

function postSingle(drink) {
  console.log(drink);
  drink.map((post) => {
    mainBox.innerHTML += `
                <div class="col-span-4 bg-gray-800 px-6 py-6 rounded-lg">
                    <img class="w-32 md:w-full rounded-md h-32  md:h-auto object-contain md:object-cover"
                        src=${post.strDrinkThumb}
                        alt="">
                    <h2 class="text-base md:text-2xl text-left py-3 font-bold text-white">${post.strDrink}</h2>
                    <p class="text-sm md:text-base font-light text-left text-white line-clamp-3">${post.strInstructions}</p>
                    <p class="text-sm md:text-base italic text-gray-200 font-semibold text-left pt-4">
                    ${post.strCategory}</p>
                    <div class="flex gap-4 flex-col md:flex-row pt-6">
                        <button onclick=""
                            class="basis-1/2 inline-block bg-transparent border border-red-600 text-gray-50 text-center py-2 text-base font-semibold rounded-lg cursor-pointer">More
                            Details</button>
                    </div>
                </div>
    `;
  });
}

searchBtn.addEventListener("click", () => {
  fetchAPI();
});
