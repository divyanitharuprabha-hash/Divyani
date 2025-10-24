console.log("hello fom main.js!");


const themeToggleButton = document.querySelector('#theme-toggle');
const bodyElement = document.querySelector('body');

themeToggleButton.addEventListener('click', function() {
  bodyElement.classList.toggle('dark-mode');
});