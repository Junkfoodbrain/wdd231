// ---last modified date---
const today = new Date();
today.getFullYear();
document.getElementById("lastmodified").innerHTML = document.lastModified;
document.getElementById("currentyear").textContent = today.getFullYear();

// -----menu toggle---
const menuButton = document.getElementById("menu-button");
const primaryNav = document.getElementById("primary-nav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });
}