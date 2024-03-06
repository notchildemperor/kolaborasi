const accessKey = "AMvuCRXEmNFQJ1LH7y9cCijWtrppwkYz8kr1kH89r-8";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const SearchResults = document.querySelector(".Search-result");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        SearchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("Search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        SearchResults.appendChild(imageWrapper);
    });

    page++;

    if (results.length > 0) {
        showMoreButton.style.display = "block";
    } else {
        showMoreButton.style.display = "none";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});
