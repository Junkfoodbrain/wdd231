


// ---hamburger button and navigation-----
const hamButton = document.querySelector("#ham-btn");
const navigation = document.querySelector("#site-nav");

function toggleNav() {
    const isOpen = navigation.classList.toggle("show");
    hamButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

if (hamButton && navigation) {
    hamButton.addEventListener("click", toggleNav);
}





// --footer content ---
const today = new Date();
today.getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
document.getElementById("currentyear").textContent = today.getFullYear();


// ------weather API code for Chamber page-----
// select HTML elements in the document
const myTown = document.querySelector(`#town`);
const myDescription = document.querySelector(`#description`);
const myTemperature = document.querySelector(`#temperature`);
const myGraphic = document.querySelector(`#graphic`);
const forecastList = document.querySelector("#forecast-list");

// --required variable for the URL--
const myKey = "368293c2d82d59daf7f513835f8a06e3";
const myLat = "38.78364307474867";
const myLong = "-121.33191357999155";




// --construct a full path using template literals--
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// --Try to grab the current weather data--
async function apiFetch() {
    if (!myTown || !myDescription || !myTemperature || !myGraphic) return;
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();

            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// --Display the json data onto my web page--
function displayResults(data) {
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute(`SRC`, iconsrc)
    myGraphic.setAttribute(`alt`, data.weather[0].description)
}

// ---forecasting out 3 days ----

async function fetchForecast() {
    if (!forecastList) return;
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        forecastList.innerHTML = "<li>Forecast unavailable.<li/>";
        console.error("Forecast fetch failed:", error);
    }
}

function displayForecast(list) {
    const days = [];
    const seen = new Set();
    for (const entry of list) {
        const date = entry.dt_txt.split(" ")[0];
        if (entry.dt_txt.includes("12:00:00") && !seen.has(date)) {
            seen.add(date);
            days.push(entry);
        }
        if (days.length === 3) break;
    }
    forecastList.innerHTML = "";
    days.forEach(day => {
        const li = document.createElement("li");
        li.className = "forecast-day";
        li.innerHTML = `
        <span>${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: "long" })}</span>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
        <span>${Math.round(day.main.temp)}&degF</span>
        <span style="text-transform:capitalize">${day.weather[0].description}</span>
        `;
        forecastList.appendChild(li);
    });
}

// --start the processes for fetching weather and forecast data--
apiFetch();
fetchForecast();


// ---Chamber member spotlight---
async function fetchMembers() {
    const response = await fetch(`data/members.json`);
    if (response.ok) {
        const data = await response.json();
        return data.members;
    } else {
        console.error('Failed to fetch members.json');
        return [];
    }
}

function filterGoldSilver(members) {
    return members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
    );
}
function getRandomMembers(members, count = 2) {
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getMembershipText(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Other";
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById("spotlight-container");
    if (!spotlightContainer) return;
    spotlightContainer.innerHTML = "";



    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        const img = document.createElement("img");
        img.src = member.image;
        img.alt = `${member.name} logo`;
        img.loading = "lazy";
        img.width = 150;
        img.height = 100;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const info = document.createElement("p");
        info.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";

        const level = document.createElement("p");
        level.textContent = `Membership Level: ${getMembershipText(member.membershipLevel)}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(info);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        spotlightContainer.appendChild(card);
    });
}

// ---loading spotlight member on the page---
fetchMembers().then(allMembers => {
    const goldSilver = filterGoldSilver(allMembers);
    const spotlights = getRandomMembers(goldSilver, 3);
    displaySpotlights(spotlights);
});

