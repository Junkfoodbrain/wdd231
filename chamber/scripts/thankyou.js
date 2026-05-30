const params = new URLSearchParams(window.location.search);

function setValue(id, value) {
    const target = document.getElementById(id);
    if (target) {
        target.textContent = value || "Not Provided";
    }
}

setValue("display-firstName", params.get("firstName"));
setValue("display-lastName", params.get("lastName"));
setValue("display-email", params.get("email"));
setValue("display-phone", params.get("phone"));
setValue("display-organization", params.get("organization"));

const rawTimestamp = params.get("timestamp");
const formattedTimestamp = rawTimestamp ? new Date(rawTimestamp).toLocaleString() : "Not Provided";
setValue("display-timestamp", formattedTimestamp);