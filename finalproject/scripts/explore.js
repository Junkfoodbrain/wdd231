
// ----building fish cards---

const fishGrid = document.getElementById("fish-grid");
const careFilter = document.getElementById("care-filter");
const fishModal = document.getElementById("fish-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeModalButton = document.getElementById("close-modal");

let fishData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadFishData();

    careFilter.addEventListener("change", () => {
        renderFishCards();
    });

    closeModalButton.addEventListener("click", () => {
        fishModal.close();
    });
});

async function loadFishData() {
    try {
        const response = await fetch("data/pacific-fish.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        fishData = await response.json();
        renderFishCards();
        
    } catch (error) {
        fishGrid.innerHTML = "<p>Sorry, fish data is unavailable right now.</p>";
        console.error("Fish fetch error:", error);
    }
}

function renderFishCards() {
    const selectedLevel = careFilter.value;

    const filteredFish = fishData.filter((fish) => {
        return selectedLevel === "All" || fish.careLevel === selectedLevel;
    });

    fishGrid.innerHTML = "";

    filteredFish.forEach((fish) => {
        const card = document.createElement("article");
        card.classList.add("fish-card");

        card.innerHTML = `
            <img src="${fish.image}" alt="${fish.name}" width="300" height="200" loading="lazy">
            <h3>${fish.name}</h3>
            <p><strong>Region: </strong>${fish.region}</p>
            <p><strong>Habitat: </strong>${fish.habitat}</p>
            <p><strong>Temperament: </strong>${fish.temperament}</p>
            <p><strong>Care Level: </strong>${fish.careLevel}</p>
            <button type="button" class="details-button">View Details</button>
        `;

        const detailsButton = card.querySelector(".details-button");
        detailsButton.addEventListener("click", () => {
            openFishModal(fish);
        });

        fishGrid.appendChild(card);
    });
}

function openFishModal(fish) {
    modalTitle.textContent = `${fish.name} (${fish.scientificName})`;
    modalBody.textContent = `${fish.name} is found in ${fish.region}, usually in ${fish.habitat} at ${fish.depth}. It eats ${fish.diet} and reaches about ${fish.size}.`;
    fishModal.showModal();
}