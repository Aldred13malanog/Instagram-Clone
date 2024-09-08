const navigation = document.querySelector('nav');
const searchNav = document.querySelector('.js-search');
const searchNavContainer = document.querySelector('.js-search-nav-container');
const searchInput = document.querySelector('.js-search-input');
const notifContainer = document.querySelector('.js-notifications-container');
const notifNav = document.querySelector('.js-notifications');

// Logo
const instagramLogo = document.querySelector('.instagram');
const instagramLogoText = document.querySelector('.instagram-logo-text');

// Icons
const homeIcon = document.querySelector('.js-home-icon');
const notifIcon = document.querySelector('.js-notification-icon');
const notifIconActive = document.querySelector('.js-notification-icon-active');
const searchIcon = document.querySelector('.js-search-icon');
const searchIconActive = document.querySelector('.js-search-icon-active');

let isSearchBarActive;
let isNotificationsActive;

searchNav.addEventListener('click', () => {
	hideNotifications();

	navigationWidth();
	if (isSearchBarActive) {
		hideSearchBar();
		return;
	}
	showSearchBar();

});

notifNav.addEventListener('click', () => {
	hideSearchBar();

	navigationWidth();
	if (isNotificationsActive) {
		hideNotifications();
		return;
	}
	showNotifications();	
});

function navigationWidth() {
  if (!isSearchBarActive || !isNotificationsActive) {
		navigation.style.width = '72px';
		navigation.style.border = 'none';
	}

	if (isSearchBarActive || isNotificationsActive) {
		navigation.style.width = '245px';
		navigation.style.borderRight = '1px solid #272727';
	}
}

function showSearchBar() {
	instagramLogo.style.scale = '1';
	instagramLogoText.style.scale = '0';
	instagramLogoText.style.pointerEvents = 'none';
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
	});
	isSearchBarActive = true;
}

function hideSearchBar() {
	instagramLogo.style.scale = '0';
	instagramLogoText.style.scale = '1';
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
	isSearchBarActive = false;
}

function showNotifications() {
	notifContainer.style.transform = 'translateX(0%)';
	notifContainer.style.opacity = '1';
	notifContainer.style.pointerEvents = 'all';
	notifNav.style.border = '1px solid white';
	homeIcon.style.fill = 'none';
	homeIcon.style.stroke = 'white';
	homeIcon.style.strokeWidth = '2';
	instagramLogo.style.scale = '1';
	instagramLogoText.style.scale = '0';
	notifIcon.style.opacity = '0';
	notifIconActive.style.opacity = '1';
	document.querySelectorAll('.js-nav-name').forEach(name => {
		name.style.scale = '0';
	});
	isNotificationsActive = true;
}

function hideNotifications() {
	notifContainer.style.transform = 'translateX(-100%)';
	notifContainer.style.opacity = '0';
	notifContainer.style.pointerEvents = 'none';
	notifNav.style.border = 'none';
	instagramLogo.style.scale = '0';
	instagramLogoText.style.scale = '1';
	homeIcon.style.stroke = 'none';
	homeIcon.style.fill = 'white';
	notifIcon.style.opacity = '1';
	notifIconActive.style.opacity = '0';
	document.querySelectorAll('.js-nav-name').forEach(names => {
		names.style.scale = '1'
	});
	isNotificationsActive = false;
}