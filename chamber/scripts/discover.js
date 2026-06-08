import { places } from "../data/discover.mjs";


// ---visit message---
const visitMessage = document.querySelector("#visit-message");

function displayVisitMessage() {
    if (!visitMessage) return;

    const now = Date.now();
    const lastVisit = Number(localStorage.getItem("discoverLastVisit"));

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions"
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysBetween = Math.floor((now - lastVisit) / msPerDay);

        if (daysBetween < 1) {
            visitMessage.textContent = "It's great to see you back so soon!";
        } else if (daysBetween === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";            
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
    localStorage.setItem("discoverLastVisit", String(now));
}

// ---creating the cards for the discover page---

const placesContainer = document.querySelector("#places");

function buildCard(place, index) {
    const card = document.createElement("article");
    card.className = `discover-card card-${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = `images/${place.photoUrl}`;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;    
    if (index === 0) {
        image.loading = "eager";
        image.fetchPriority = "high";
        image.decoding = "sync";
    } else {
        image.loading = "lazy";
        image.fetchPriority = "low";
        image.decoding = "async";
    }
    
    figure.appendChild(image);

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

displayVisitMessage();
displayPlaces(places);


