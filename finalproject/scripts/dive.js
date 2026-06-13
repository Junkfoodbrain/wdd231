
// ----making bubbles----

const bubbleButton = document.getElementById("bubble-button");
const bubbleField = document.getElementById("bubble-field");

if (bubbleButton && bubbleField) {
    bubbleButton.addEventListener("click", () => {        
        const bubble = document.createElement("span");
        bubble.textContent = "o";       
        bubble.style.position = "absolute";
        bubble.style.left = "40px";
        bubble.style.top = "20px";
        bubble.style.fontSize = "3rem";
        bubble.style.color = "red";
        bubbleField.appendChild(bubble);
    });
}