
const navButton = document.querySelector('#ham-button');
const navlinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navlinks.classList.toggle('show');
});