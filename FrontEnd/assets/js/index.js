let works = []; // Array to store gallery data
let currentCategory = "Tous"; // Currently selected category

const allButton = document.getElementById("all");
const objetButton = document.querySelector(".btn.objet");
const appartementsButton = document.getElementById("Appartements");
const hrButton = document.getElementById("H&r");
const gallery = document.querySelector(".gallery");


async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("erreur lors du fetch");
    }
    const data = await response.json();
    works = data;
    filterWorksByCategory(currentCategory);
    galeriesDisplayModal(works);
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}


function galeriesDisplay(filteredWorks) {
  gallery.innerHTML = filteredWorks
    .map(
      (work) =>
        `<figure id="${work.id}">
          <img src="${work.imageUrl}">
          <figcaption>${work.title}</figcaption>
        </figure>`
    )
    .join("");
}

function filterWorksByCategory(category) {
  const filteredWorks =
    category === "Tous"
      ? works
      : works.filter((work) => work.category.name === category);
  galeriesDisplay(filteredWorks);
  currentCategory = category; // Update current category
}

allButton.addEventListener("click", () => {
  filterWorksByCategory("Tous");
});

objetButton.addEventListener("click", () => {
  filterWorksByCategory("Objets");
});

appartementsButton.addEventListener("click", () => {
  filterWorksByCategory("Appartements");
});

hrButton.addEventListener("click", () => {
  filterWorksByCategory("Hotels & restaurants");
});

