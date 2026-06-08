import { places } from "../data/discover.mjs";


// ---creating the cards for the discover page---

const placesContainer = document.querySelector("#places");

function buildCard(place, index) {
    const card = document.createElement("article");
    card.className = `discover-card card-${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = place.photoUrl;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;
    image.loading - "lazy";
    figure.appendchild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";

    card.append(title, figure, address, description, button);
    return card;
}

function displayPlaces(data) {
    if (!placesContainer) return;

    placesContainer.innerHTML = "";
    data.forEach((place, index) => {
        const card = buildCard(place, index);
        placesContainer.appendChild(card);
    });
}

displayPlaces(places);


