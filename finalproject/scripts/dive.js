
// ----making bubbles----

const bubbleButton = document.getElementById("bubble-button");
const bubbleField = document.getElementById("bubble-field");

if (bubbleButton && bubbleField) {
    bubbleButton.addEventListener("click", () => {
        for (let i = 0; i < 12; i += 1) {
            const bubble = document.createElement("span");
            bubble.className = "bubble";

            const size = Math.floor(Math.random() * 16) + 8;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            bubble.style.left = `${Math.floor(Math.random() * 95)}%`;
            bubble.style.animationDuration = `${Math.random() * 2 + 2}s`;

            bubbleField.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, 4500);
        }
    });
}