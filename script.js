const accessKey = "_bIOafDOJsVzPFWsdOSINECPRLuKqy7dS4ONxxdKxXc";

const searchForm = document.querySelector("#search-form");
const searchBox = document.querySelector("#search-box");
const searchResult = document.querySelector("#search-result");
const showMoreBtn = document.querySelector("#show-more-btn");

let page = 1;
let keyword = "";

const searchImages = async () => {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;

        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";

        imgLink.appendChild(img);

        searchResult.appendChild(img);
    });

    const body = document.body;
    if (results.length !== 0) {
        showMoreBtn.style.display = "block";
        if (body.children[2].tagName === "H3") {
            body.removeChild(body.children[2]);
        }
    } else {
        const msg = document.createElement("h3");
        msg.textContent = "No images found!! Try something else";
        body.insertBefore(msg, body.children[2]);
        showMoreBtn.style.display = "none";
    }
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
