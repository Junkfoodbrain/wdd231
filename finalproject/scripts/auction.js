
const roleInputs = document.querySelectorAll(`input[name="role"]`);
const savedRoleMessage = document.getElementById("saved-role-message");
const storageKey = "auctionRolePreference";

const savedRole = localStorage.getItem(storageKey);

if (savedRole) {
    roleInputs.forEach((input) => {
        if (input.value === savedRole) {
            input.checked = true;
        }
    });

    savedRoleMessage.textContent = `Saved preference: ${savedRole}`;
}

roleInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
        const selectedRole = event.target.value;
        localStorage.setItem(storageKey, selectedRole);
        savedRoleMessage.textContent = `Saved preference: ${selectedRole}`;
    });
});