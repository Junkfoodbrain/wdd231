// Safe pattern: each feature checks required elements before running.
const hamButton = document.querySelector("#ham-btn");
const navigation = document.querySelector("#site-nav");
const statusEl = document.querySelector("#status");
const contentArea = document.querySelector("#content-area");
const loadButton = document.querySelector("#load-data");

function setupNav() {
    if (!hamButton || !navigation) return;
    hamButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("show");
        hamButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}

function setFooterDates() {
    const yearEl = document.querySelector("#currentyear");
    const modifiedEl = document.querySelector("#lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modifiedEl) modifiedEl.textContent = document.lastModified;
}

async function loadDemoData() {
    if (!statusEl || !contentArea) return;

    statusEl.textContent = "Status: loading...";
    try {
        const response = await fetch("data/demo.json");
        if (!response.ok) throw new Error("Request failed");

        const data = await response.json();
        contentArea.innerHTML = "";

        data.items.forEach((item) => {
            const article = document.createElement("article");
            article.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            contentArea.appendChild(article);
        });

        statusEl.textContent = "Status: success";
    } catch (error) {
        statusEl.textContent = "Status: failed to load data";
        contentArea.innerHTML = "<p>Could not load demo data.</p>";
        console.error(error);
    }
}

function setupActions() {
    if (!loadButton) return;
    loadButton.addEventListener("click", loadDemoData);
}

setupNav();
setFooterDates();
setupActions();
