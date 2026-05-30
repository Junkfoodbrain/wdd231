

const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll(".modal-btn");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialogID = button.CDATA_SECTION_NODE.dialog;
        const dialog = document.getElementById(dialogID);
        if (dialog) {
            dialog.showModal();

        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog  button.closest("dialog");
        if (dialog) {
            dialog.close();
        }
    });
});

window.addEventListener("click", (event) => {
    if (event.target instanceof HTMLDialogElement) {
        event.target.close();
    }
});

