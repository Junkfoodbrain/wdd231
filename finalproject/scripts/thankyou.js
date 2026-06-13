
const output = document.getElementById("submitted-data");
const params = new URLSearchParams(window.location.search);

if (output) {
    if ([...params.keys()].length === 0) {
        output.innerHTML = "<p>No form data was found.</p>";
    } else {
        const list = document.createElement("ul");

        params.forEach((value, key) => {
            const item = document.createElement("li");
            item.textContent = formatLabel(key) + ": " + value;
            list.appendChild(item);
        });

        output.appendChild(list);
    }
}

function formatLabel(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}