


// ---hamburger button and navigation-----
const hamButton = document.querySelector("#ham-btn");
const navigation = document.querySelector("#site-nav");

function toggleNav() {
    navigation.classList.toggle("show");
}

hamButton.addEventListener("click", toggleNav);





// ----reading JSON data and displaying on cards ---
const url = "data/member.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");


async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayMembers(data.members);
    } catch (error) {
        membersContainer.innerHTML = "<p>Member data could not be loaded.</p>";
        console.error("Error fetching member data:", error);
    }

}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        const logo = document.createElement("img");
        logo.src = member.image;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 300;
        logo.height = 200;

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.target = "_blank";
        website.rel = "noopener";
        website.textContent = "visit Website";

        const level = document.createElement("p");
        level.textContent = `Membership Level: ${member.membershipLevel}`;

        card.append(logo, name, address, phone, website, level);
        membersContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

getMembers();
    
// --footer content ---
const today = new Date();
today.getFullYear();
document.getElementById("lastmodified").innerHTML = document.lastModified;

