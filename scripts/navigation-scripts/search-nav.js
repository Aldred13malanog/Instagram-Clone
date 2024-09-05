const nav = document.querySelector('nav');
const instagramLogo = document.querySelector('.instagram');
const instagramLogoText = document.querySelector('.instagram-logo-text');
const searchNav = document.querySelector('.js-search');
const searchIcon = document.querySelector('.js-search-icon');
const searchIconActive = document.querySelector('.js-search-icon-active');
const homeIcon = document.querySelector('.js-home-icon');
const searchNavContainer = document.querySelector('.js-search-nav-container');
const searchInput = document.querySelector('.js-search-input');

searchNav.addEventListener('click', () => {

	if (nav.clientWidth <= 72) {
		nav.style.width = '245px';
		nav.style.borderRight = '1px solid #272727';
		instagramLogo.style.scale = '0';
		instagramLogoText.style.scale = '1'
		searchNav.style.border = 'none';
		searchIcon.style.opacity = 1;
		searchIconActive.style.opacity = 0;
		homeIcon.style.stroke = 'none';
		homeIcon.style.fill = 'white';
		searchNavContainer.style.transform = 'translateX(-100%)';
		searchNavContainer.style.opacity = '0';
		searchNavContainer.style.pointerEvents = 'none';
		document.querySelectorAll('.js-nav-name').forEach(names => {
			names.style.scale = '1'
		});
		return;
	}
	
	nav.style.width = '72px';
	nav.style.border = 'none';
	instagramLogo.style.scale = '1';
	instagramLogoText.style.scale = '0'
	searchNav.style.border = '1px solid white';
	searchIcon.style.opacity = 0;
	searchIconActive.style.opacity = 1;
	homeIcon.style.stroke = 'white';
	homeIcon.style.strokeWidth = '2';
	homeIcon.style.fill = 'none';
	searchNavContainer.style.transform = 'translateX(0%)';
	searchNavContainer.style.opacity = '1';
	searchNavContainer.style.pointerEvents = 'all';
	searchInput.focus();
	document.querySelectorAll('.js-nav-name').forEach(names => {
		names.style.scale = '0'
	})
});