const searchResults = document.querySelector(".search-results");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const searchPageBtn = document.querySelector(".search-button");
const pageInput = document.querySelector(".input-page");
const searchInput = document.querySelector("#search");
const speciesFilter = document.querySelector("#species");
const genderFilter = document.querySelector("#gender");
const statusFilter = document.querySelector("#status");
const span = document.querySelector(".c-status")

const URL = "https://rickandmortyapi.com/api";
const defaultFilters = {
  name: '',
  species: '',
  gender: '',
  status: '',
  page: 1
}

const getCharacters = async ({ name, species, gender, status, page = 1 }) => {
  const response = await fetch(`${URL}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
  const characters = await response.json();

  return characters.results;
};

//Adicionar dados no html
const putDataInHtml = async ({ characters }) => {
  characters.forEach((character) => {
    return searchResults.innerHTML += `
      <div class="search-result">
        <img src="${character.image}" alt="">
        <h3>${character.name}</h3>
        <span class="c-status ">${character.status}</span>
        <p>${character.gender}</p>
        <p>${character.species}</p>
        <a class="details" href="/char-detail.html?id=${character.id}&page=${defaultFilters.page}&name=${character.name}&species=${character.species}&gender=${character.gender}&status=${character.status}">Detalhes</a>
      </div>
    `
  });
}

speciesFilter.addEventListener('change', async (e) => {
  defaultFilters.species = e.target.value;
  searchResults.innerHTML = '';
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters });
});

genderFilter.addEventListener('change', async (e) => {
  defaultFilters.gender = e.target.value;
  searchResults.innerHTML = '';
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters });
});

statusFilter.addEventListener('change', async (e) => {
  defaultFilters.status = e.target.value;
  searchResults.innerHTML = '';
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters });
});

searchInput.addEventListener('keyup', async (e) => {
  defaultFilters.name = e.target.value;
  searchResults.innerHTML = '';
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters });
});

//Passar paginas
nextBtn.addEventListener("click", async () => {
  searchResults.innerHTML = "";
  defaultFilters.page++;
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters })
  pageInput.value = defaultFilters.page;

  if (pageInput.value > 41) {
    nextBtn.classList.add("hide");
  } else {
    nextBtn.classList.remove("hide");
  }

  if (pageInput.value > 1) {
    prevBtn.classList.remove("hide");
  } else {
    prevBtn.classList.add("hide");
  }

});

prevBtn.addEventListener("click", async () => {
  if (defaultFilters.page > 1) {
    searchResults.innerHTML = "";
    defaultFilters.page -= 1;
    const characters = await getCharacters(defaultFilters);
    putDataInHtml({ characters })
    pageInput.value = defaultFilters.page;
  }

  if (pageInput.value > 41) {
    nextBtn.classList.add("hide");
  } else {
    nextBtn.classList.remove("hide");
  }

  if (pageInput.value > 1) {
    prevBtn.classList.remove("hide");
  } else {
    prevBtn.classList.add("hide");
  }
});

searchPageBtn.addEventListener("click", async () => {
  if (pageInput.value > 42) {
    searchResults.innerHTML = "";
    defaultFilters.page = 42;
    const characters = await getCharacters(defaultFilters);
    putDataInHtml({ characters });
    pageInput.value = defaultFilters.page;
  } else {
    searchResults.innerHTML = "";
    defaultFilters.page = pageInput.value;
    const characters = await getCharacters(defaultFilters);
    putDataInHtml({ characters });
    pageInput.value = defaultFilters.page;
  }

  if (pageInput.value > 41) {
    nextBtn.classList.add("hide");
  } else {
    nextBtn.classList.remove("hide");
  }

  if (pageInput.value < 1) {
    location.reload();
  }

  if (pageInput.value > 1) {
    prevBtn.classList.remove("hide");
  } else {
    prevBtn.classList.add("hide");
  }
});

const main = async () => {
  pageInput.value = defaultFilters.page;
  const characters = await getCharacters(defaultFilters);
  putDataInHtml({ characters });
}

main();
