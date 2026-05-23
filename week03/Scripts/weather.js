// select HTML elements in the document
const myTown = document.querySelector(`#town`);
const myDescription = document.querySelector(`#description`);
const myTemperature = document.querySelector(`#temperature`);
const myGraphic = document.querySelector(`#graphic`);

// --required variable for the URL--
const myKey = "368293c2d82d59daf7f513835f8a06e3";
const myLat = "38.78364307474867";
const myLong = "-121.33191357999155";

// --construct a full path using template literals--
const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// --Try to grab the current weather data--
async function apiFetch() {
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


// --start the process--
apiFetch();