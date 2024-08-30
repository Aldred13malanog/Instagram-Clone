let currentIndex = 0;

function showSlide(index, element) {
	const images = element.classList[0] === 'prev-button' ? element.previousElementSibling : element;
	const slides = images.children.length;
	
	if (index >= slides || index < 0) {	
		return;
	}

	currentIndex = index;
	images.style.transform = `translateX(${-currentIndex * (100 / slides)}%)`;
}

document.querySelectorAll('.prev-button').forEach((prev) => {
	prev.addEventListener('click', () => {
		showSlide(currentIndex - 1, prev.previousElementSibling);
	});
});

document.querySelectorAll('.next-button').forEach((next) => {
	next.addEventListener('click', () => {
		showSlide(currentIndex + 1, next.previousElementSibling);
	});
});