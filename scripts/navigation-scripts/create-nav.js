const createPopup = document.querySelector('.js-create-post-popup');
const overlay = document.querySelector('.js-create-overlay');
const createNav = document.querySelector('.js-create');

createNav.addEventListener('click', () => {
	createPopup.classList.add('active');
	overlay.classList.add('active');
})

overlay.addEventListener('click', () => {
	overlay.classList.remove('active');
	createPopup.classList.remove('active');
})