let pokemonCardContainer = document.getElementById("pokemon-card-container");
let searchInput = document.getElementById("search");
let filterBtn = document.getElementById("filter");

const typeColors = {
    "grass": "green",
    "fire": "orange",
    "water": "blue",
    "bug": "brown",
    "normal": "lightgrey",
    "electric": "yellow",
    "ground": "saddlebrown",
    "fairy": "pink",
    "fighting": "red",
    "psychic": "purple",
    "rock": "grey",
    "ghost": "darkviolet",
    "ice": "lightblue",
    "dragon": "darkblue",
    "poison": "limegreen",
    // Add more types and colors as needed
};

filterBtn.addEventListener("click", function() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card) {
        let pokemonType = card.querySelector(".card-front .type").innerText;
        if (pokemonType === type.value) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


async function createPokemonCard(details) {
    // let speciesUrl = details.species.url;
    // let color = await fetchPokemonSpecies(speciesUrl);
    let type = details.types[0].type.name.toLowerCase();
    let color = typeColors[type] || "gray";
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front" style="background-color: ${color};">
                <div class="id">#${details.id}</div>
                <img class="image" src='${details.sprites.front_default}'/>
                <div class="name">${details.name}</div>
                <div class="type">${details.types[0].type.name}</div>
            </div>
            <div class="card-back" style="background-color: ${color};">
                <div class="id">#${details.id}</div>
                <img class="image" src='${details.sprites.back_default}'/>
                <div class="name">${details.name}</div>
                <div class="ability">${details.abilities[0].ability.name}</div>
            </div>
        </div>
    `;
    return card;
}

searchInput.addEventListener("input", function() {
    let searchValue = searchInput.value.toLowerCase();
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card) {
        let pokemonName = card.querySelector(".card-front .name").innerText.toLowerCase();
        if (pokemonName.startsWith(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

async function fetchPokemon(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    return result;
}

async function fetchMaindata() {
    for (let i = 1; i <= 500; i++) {
        let pokemon = await fetchPokemon(i);
        let card = await createPokemonCard(pokemon);
        pokemonCardContainer.appendChild(card);
    }
}

fetchMaindata();