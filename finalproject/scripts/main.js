// ---last modified date---
const today = new Date();
const lastModifiedNode = document.getElementById("lastmodified");
const currentYearNode = document.getElementById("currentyear");

if (lastModifiedNode) {
    lastModifiedNode.innerHTML = document.lastModified;
}

if (currentYearNode) {
    currentYearNode.textContent = today.getFullYear();
}

// -----menu toggle---
const menuButton = document.getElementById("menu-button");
const primaryNav = document.getElementById("primary-nav");

if (menuButton && primaryNav) {
    menuButton.setAttribute("aria-label", "Open navigation");

    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
}