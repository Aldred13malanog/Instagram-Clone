const moreOptNav = document.querySelector('.js-more-option');
const moreOptCon = document.querySelector('.js-more-option-con');

moreOptNav.addEventListener('click', () => {
	if (moreOptCon.classList.contains('active')) {
		moreOptCon.classList.remove('active');
		moreOptNav.classList.remove('current-page');
		document.querySelectorAll('.js-ham-icon line').forEach(line => {
			line.style.strokeWidth = '2';
		});
		return;
	}

	moreOptCon.classList.add('active');
	moreOptNav.classList.add('current-page');
	document.querySelectorAll('.js-ham-icon line').forEach(line => {
		line.style.strokeWidth = '3';
	});

});
document.querySelector('main').addEventListener('click', () => {
	if (moreOptCon.classList.contains('active')) {
		moreOptCon.classList.remove('active');
		moreOptNav.classList.remove('current-page');
		document.querySelectorAll('.js-ham-icon line').forEach(line => {
			line.style.strokeWidth = '2';
		});
		return;
	}
});