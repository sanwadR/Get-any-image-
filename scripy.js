const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formElement = document.querySelector("form");
const inputElement = document.querySelector("#search-input");

const searchElement = document.querySelector("#search-button");
const searchReasultElement = document.querySelector(".search-results");
const showMoreElement = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  console.log(inputData);

  const response = await fetch(url);
  const data = await response.json(); //CONVERTS json to js
  console.log(data.results);

  if (page == 1) {
    searchReasultElement.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("search-result"); /// image container

    const image = document.createElement("img"); // image create
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a"); // crates anchor tag
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageContainer.appendChild(image); // ADDING CLASSES
    imageContainer.appendChild(imageLink);
    searchReasultElement.appendChild(imageContainer);
  });

  page++;
  if (page > 1) {
    showMoreElement.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  // Update this line to use formElement
  event.preventDefault();
  page = 1;
  searchImage();
});

showMoreElement.addEventListener("click", () => {
  searchImage();
});
