import { getMatchingData, removeFromData } from "../../data/fyp-data.js";
import { getMatchingCommentsData } from "../../data/comments-data.js";
import { getMatchingLikedData } from "../../data/post-likes-data.js";
import { loadPage } from "../home-page.js";

// handling functions

// check post function
export function checkPost(data) {
	if (data.typePost === 'image') {
		return `		
			<img src="${data.post}" data-id="${data.id}">
			<div class="image-like js-image-like">
				<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
			</div>
		`;
	}
	if (data.typePost === 'video') {
		return `
			<video src="${data.post}" data-id="${data.id}" class="js-video-${data.id}"></video>
			<div class="image-like js-image-like">
				<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
			</div>
			<button class="sound-button">
				<svg class="soundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>
			</button>
		`;
	}
	if (data.typePost === 'images') {
		let posts = '';
		data.post.forEach(post => {
			posts += `
				<div class="img-con">
					<img data-id="${data.id}" src="${post}">
					<div class="image-like js-image-like">
						<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
					</div>
				</div>
			`;
		});
		return `
			<div class="images-videos">
				${posts}
			</div>
			<button data-id="${data.id}" class="prev-button inactive">&#10094;</button>
			<button data-id="${data.id}" class="next-button">&#10095;</button>
		`;
	}
}

// video autoplay function
export function videoAutoPlay() {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const video = entry.target;
	
			if (entry.isIntersecting) {
				video.play();
			} else {
				video.pause();
			}
		});
	}, {
		threshold: 0.4
	});
	
	const videos = document.querySelectorAll('video');
	
	videos.forEach(video => {
		observer.observe(video);
	});
}

export function likeCountFunction(id) {
	const container = document.querySelector('.js-videos-images');
	const elem = document.createElement('div');
	const overlay = document.createElement('div');
	elem.classList.add('likes-container');
	overlay.classList.add('likes-overlay');
	let matchingData = getMatchingLikedData(id);

	function getUsersWhoLike() {
		let html = '';
		matchingData.users.forEach(data => {
			html += `
				<div class="like">
					<div class="like-profile"></div>
					<div class="like-name-con">
						<div>${data.username}</div>
						<div>${data.name}</div>
					</div>
					<button class="like-followbtn">Follow</button>
				</div>
			`;
		});

		return html;
	}

	elem.innerHTML = `
		<div class="likes-header">
			<div>Likes</div> 
			<svg aria-label="Close" class="js-lclose-icon" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
		</div>
		<div class="like-con">
			${getUsersWhoLike()}
		</div>
	`;

	container.appendChild(elem);
	container.appendChild(overlay);

	setTimeout(() => {
		elem.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 100);

	overlay.addEventListener('click', () => {
		container.removeChild(elem);
		container.removeChild(overlay);
	});

	document.querySelector('.js-lclose-icon').addEventListener('click', () => {
		container.removeChild(elem);
		container.removeChild(overlay);
	});
}

export function handleLikeIcon(id) {
	const matchingData = getMatchingData(id);

	if (matchingData.isLiked) {
		return `
			<svg aria-label="Unlike" fill="rgb(255, 48, 64)" height="24" stroke-width="0" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
		`;
	} else {
		return `
			<svg aria-label="Like" class="like-icon" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" stroke="none"></path></svg>
		`;
	}
}

/*----------------------------------------------------------*/

// on clicks functions

// when double click the post the like icon appear and increases the like count of the post
export function onDlClickPost(elem, likeCountElem, likeButton) {
	const parentElem = elem.parentElement; 
	const imglike = parentElem.children[1];
	const {id} = elem.dataset;
	let matchingData = getMatchingData(id);
	let matchingLikes = getMatchingLikedData(id);

	matchingData.isLiked = true;
	likeButton.innerHTML = handleLikeIcon(id);

	if (matchingLikes.users.length == 0 || matchingLikes.users[0].username !== 'aaaaaaaaaaldma') {
		matchingLikes.users.unshift({
			username: 'aaaaaaaaaaldma',
			name: 'Aaaaaaaaaa'
		});
		matchingData.likeCount++;
	}

	likeCountElem.innerHTML = `${matchingData.likeCount.toLocaleString()} likes`

	bouncyEffect(likeButton);

	imglike.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(-20deg)';
	setTimeout(() => {
		imglike.style.transform = 'translate(-50%, -50%)';
	}, 250);
	setTimeout(() => {
		imglike.style.transform = 'translate(-50%, -50%) scale(0)';
	}, 700);
}

// like button when clicked the like icon color will be coloured
// and the like count will increase
export function onClickLikeButton(button, likeCount) {
	const {id} = button.dataset;
	let matchingData = getMatchingData(id);
	let matchingLikes = getMatchingLikedData(id);

	if (!matchingData.isLiked) {
		matchingData.isLiked = true;
		button.innerHTML = handleLikeIcon(id);
		matchingData.likeCount += 1;
		matchingLikes.users.unshift({
			username: 'aaaaaaaaaaldma',
			name: 'Aaaaaaaaaa'
		});
	} else {
		matchingData.isLiked = false;
		button.innerHTML = handleLikeIcon(id);
		matchingData.likeCount -= 1;
		matchingLikes.users.splice(0, 1);
	}

	likeCount.innerHTML = `${matchingData.likeCount.toLocaleString()} likes`
}

export function onClickShareButton() {
	const shareContainer = document.createElement('div');
	const overlay = document.createElement('div');
	const container = document.querySelector('.js-videos-images');

	shareContainer.classList.add('share-container');
	overlay.classList.add('share-overlay');
	shareContainer.innerHTML = `
		<div class="share-header">
			<div>Share</div>
			<!-- <button class="sclose-button"> -->
			<svg aria-label="Close" class="sclose-icon" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
			<!-- </button> -->
		</div>
		<div class="share-search-bar">
			<!-- <svg aria-label="Search" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg> -->
			<input type="text" placeholder="Search">
		</div>
		<div class="share-links">
			<div class="copy-link">
				<div class="copy-link-icon">
					<svg aria-label="Copy link" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Copy link</title><path d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line></svg>
				</div>
				<div>Copy link</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="Facebook" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Facebook</title><circle cx="12" cy="12" fill="none" r="11.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><path d="M16.671 15.469 17.203 12h-3.328V9.749a1.734 1.734 0 0 1 1.956-1.874h1.513V4.922a18.452 18.452 0 0 0-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v7.885a12.125 12.125 0 0 0 3.75 0V15.47Z" fill-rule="evenodd"></path></svg>
				</div>
				<div>Facebook</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="Messenger" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
				</div>
				<div>Messenger</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="WhatsApp" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 31 31" width="20"><title>WhatsApp</title><path clip-rule="evenodd" d="M15.662.263A15.166 15.166 0 0 1 26.06 4.48a15.048 15.048 0 0 1 4.653 10.381 15.164 15.164 0 0 1-3.77 10.568 15.063 15.063 0 0 1-11.37 5.138c-2.273 0-4.526-.513-6.567-1.495l-7.93 1.764a.116.116 0 0 1-.138-.13l1.34-8.019a15.181 15.181 0 0 1-1.85-6.837A15.052 15.052 0 0 1 4.555 5.012 15.061 15.061 0 0 1 15.586.263h.075Zm-.085 2.629c-.12 0-.242.002-.364.005-6.902.198-12.356 5.975-12.158 12.877.06 2.107.654 4.176 1.717 5.982l.231.392-.993 5.441 5.385-1.271.407.212a12.527 12.527 0 0 0 6.13 1.402c6.901-.198 12.356-5.974 12.158-12.876-.195-6.78-5.773-12.164-12.513-12.164ZM10.34 8.095c.253.008.507.015.728.032.271.019.57.04.836.683.315.763.996 2.668 1.085 2.86.09.194.146.418.011.668-.134.25-.203.407-.4.623-.196.216-.414.484-.59.649-.197.184-.4.384-.19.771.21.388.934 1.657 2.033 2.7 1.413 1.34 2.546 1.783 2.996 1.993a.998.998 0 0 0 .415.112c.162 0 .292-.068.415-.193.237-.24.95-1.071 1.25-1.454.156-.2.299-.271.453-.271.123 0 .255.045.408.107.345.137 2.185 1.115 2.56 1.317.374.202.625.305.715.466.09.162.066.924-.278 1.803-.344.878-1.922 1.688-2.621 1.73-.205.012-.406.04-.668.04-.634 0-1.621-.166-3.865-1.133-3.817-1.643-6.136-5.683-6.318-5.942-.182-.26-1.489-2.111-1.432-3.983C7.94 9.8 8.951 8.91 9.311 8.54c.345-.355.74-.445.996-.445h.032Z" fill="currentColor" fill-rule="evenodd"></path></svg>
				</div>
				<div>WhatsApp</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="Email" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Email</title><rect fill="none" height="17.273" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="20" x="2" y="3.364"></rect><polyline fill="none" points="2 7.155 12.002 13.81 22 7.157" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
				</div>
				<div>Email</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="Threads" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 192 192" width="18"><title>Threads</title><path class="xcslo1z" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>
				</div>
				<div>Threads</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg data-name="Icons" viewBox="0 0 24 24" width="20px" height="20px" fill="currentColor" class="x1qx5ct2 xw4jnvo" color="rgb(var(--ig-primary-text))"><path d="m21.8 20.4-7.28-9.706 6.323-7.025a1 1 0 0 0-1.487-1.338l-6.058 6.733L8.3 2.4a.999.999 0 0 0-.8-.4H3a1 1 0 0 0-.8 1.6l7.28 9.706-6.323 7.025a1 1 0 0 0 1.487 1.338l6.058-6.733L15.7 21.6c.189.252.486.4.8.4H21a1 1 0 0 0 .8-1.6zM17 20 5 4h2l12 16h-2z"></path></svg>
				</div>
				<div>X</div>
			</div>
			<div class="social-link">
				<div class="social-link-icon">
					<svg aria-label="See all" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>See all</title><path d="M23.247 10.465H9.185a8.438 8.438 0 0 0-8.438 8.438v2.819" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><polyline fill="none" points="15.06 2.278 23.247 10.465 15.06 18.653" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></svg>
				</div>
				<div>See all</div>
			</div>
		</div>
	`;

	container.appendChild(shareContainer);
	container.appendChild(overlay);

	setTimeout(() => {
		shareContainer.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 150);

	overlay.addEventListener('click', () => {
		container.removeChild(shareContainer);
		container.removeChild(overlay);
	});

	document.querySelector('.sclose-icon').addEventListener('click', () => {
		container.removeChild(shareContainer);
		container.removeChild(overlay);
	});
}

export function onClickSaveButton(button) {
	const svg = button.children[0];
	if (svg.ariaLabel == 'Save') {
		button.innerHTML = `
			<svg aria-label="Remove" class="saved-icon" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
		`;
	} else {
		button.innerHTML = `
			<svg aria-label="Save" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
		`;
	}
}

export function onClickMoreOptionButton(buttonId) {
	const moreOptionsContainer = document.createElement('div');
	const overlay = document.createElement('div');
	const container = document.querySelector('.js-videos-images');
	const id = buttonId;
	let matchingData = getMatchingData(id);

	moreOptionsContainer.classList.add('more-option-container');
	overlay.classList.add('more-option-overlay');

	moreOptionsContainer.innerHTML = `
		<div class="buttons report-btn js-report-button">Report</div>
		<div class="buttons unfollow-btn js-unfollow-button">Unfollow</div>
		<div class="buttons js-add-to-favorites">
			${matchingData.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
		</div>
		<div class="buttons">Go to post</div>
		<div class="buttons">Share to...</div>
		<div class="buttons">Copy link</div>
		<div class="buttons">Embed</div>
		<div class="buttons js-about-button">About this account</div>
		<div class="buttons cancel-btn js-cancel-btn">Cancel</div>
	`;

	container.appendChild(moreOptionsContainer);
	container.appendChild(overlay);

	setTimeout(() => {
		moreOptionsContainer.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 150);


	// functions
	function hideContainer() {
		container.removeChild(moreOptionsContainer);
		container.removeChild(overlay);
	}

	function onClickReportButton() {
		moreOptionsContainer.innerHTML = `
			<div class="report-header">
				<div>Report</div>
				<svg aria-label="Close" class="js-close-button" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
			</div>
			<div class="report-heading">Why are you reporting this post?</div>
			<div class="reason js-reason">I just don't like it 
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Bullying or unwanted contact 
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Suicide, self-injury or eating disorders
					<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Violence, hate or exploitation 
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Selling or promoting restricted items 
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Nudity or sexual activity 
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">Scam, fraud or spam
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
			<div class="reason js-reason">False information
				<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			</div>
		`;

		document.querySelectorAll('.js-reason').forEach(reasons => {
			reasons.addEventListener('click', () => {
				onClickReportReason();
			});
		});

		document.querySelector('.js-close-button').addEventListener('click', () => {
			hideContainer();
		});
	}

	function onClickReportReason() {
		moreOptionsContainer.innerHTML = `
			<div class="report-success-container">
				<div class="report-success-texts">
					<svg aria-label="checkmark" class="x1lliihq x1n2onr6 x127hrn9" fill="rgb(88, 195, 34)" height="48" role="img" viewBox="0 0 24 24" width="48"><title>checkmark</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5ZM16.293 8.3l-5.792 5.788-2.794-2.796a1 1 0 1 0-1.414 1.414l3.5 3.503a1 1 0 0 0 1.414.001l6.5-6.495A1 1 0 0 0 16.293 8.3Z"></path></svg>
					<div class="report-text">Thanks for your feedback</div>
					<div class="report-text1">When you see something you don't like on Instagram, you can report it if it doesn't follow our <span>Community Guidelines</span>, or you can remove the person who shared it from your experience.</div>
				</div>
				<div class="reason block-button js-block-user">Block ${matchingData.name} 
					<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
				</div>
				<div class="reason">Learn more about Instagram's Community Guidelines
					<svg aria-label="chevron" style="rotate: 90deg;" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="17" role="img" viewBox="0 0 24 24" width="17"><title>chevron</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
				</div>
				<button class="report-close-button js-close-button">Close</button>
			</div>
		`;

		document.querySelector('.js-block-user').addEventListener('click', () => {
			onClickBlockUser();
		});

		document.querySelector('.js-close-button').addEventListener('click', () => {
			hideContainer();
		});
	}

	function onClickBlockUser() {
		moreOptionsContainer.innerHTML = `
			<div class="block-container">
				<div class="block-texts">
					<div>Block ${matchingData.name}?</div>
					<div>They won't be able to find your profile, posts, or story on Instagram. Instagram won't let them know you blocked them.</div>
				</div>
				<button class="block-btn js-block-button">Block</button>
				<button class="js-close-button">Cancel</button>
			</div>
		`;

		document.querySelector('.js-block-button').addEventListener('click', () => {
			removeFromData(id);
			hideContainer();
			loadPage();
		});

		document.querySelector('.js-close-button').addEventListener('click', () => {
			hideContainer();
		});
	}


	// DOMs
	document.querySelector('.js-report-button').addEventListener('click', () => {
		onClickReportButton();
	});

	document.querySelector('.js-unfollow-button').addEventListener('click', () => {
		moreOptionsContainer.innerHTML = `
			<div class="unfollow-container">
				<div class="unfollow-profile">
					<img src="${matchingData.profile}">
				</div>
				<div class="unfollow-name">Unfollow @${matchingData.name}?</div>
				<div class="unfollow-button js-confirm-unfollow">Unfollow</div>
				<div class="unfollow-cancel js-unfollow-cancel">Cancel</div>
			</div>
		`;

		document.querySelector('.js-confirm-unfollow').addEventListener('click', () => {
			removeFromData(id);
			hideContainer();
			loadPage();
		});

		document.querySelector('.js-unfollow-cancel').addEventListener('click', () => {
			hideContainer();
		});
	});

	document.querySelector('.js-add-to-favorites').addEventListener('click', () => {
		const favoritedContainer = document.querySelector(`.js-favorited-container-${id}`);

		if (matchingData.isFavorited) {
			favoritedContainer.innerHTML = '';
			matchingData.isFavorited = false;
		} else {
			favoritedContainer.innerHTML = `
				<svg aria-label="Favorited" fill="url(#favorite_icon_gradient)" height="16" role="img" viewBox="0 0 24 24" width="16"><defs><linearGradient gradientUnits="userSpaceOnUse" id="favorite_icon_gradient" x1="11.0831" x2="20.5113" y1="20.7141" y2="4.71407"><stop stop-color="#FDCB5C"></stop><stop offset="1" stop-color="#D10869"></stop></linearGradient></defs><path d="M18.18 22.51a.99.99 0 01-.513-.142L12 18.975l-5.667 3.393a1 1 0 01-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 01.536-1.737l6.554-.855 2.668-5.755a1 1 0 011.814 0l2.668 5.755 6.554.855a.999.999 0 01.536 1.737l-4.876 4.347 1.37 6.544a1 1 0 01-.978 1.205z"></path></svg>
			`;
			matchingData.isFavorited = true;
		}
		
		hideContainer();
	});

	document.querySelector('.js-about-button').addEventListener('click', () => {
		moreOptionsContainer.innerHTML = `
			<div class="about-account-container">
				<div class="about-header">About this account</div>
				<div class="about-details-container">
					<div class="detail-profile">
						<img src="${matchingData.profile}">
					</div>
					<div class="detail-name">${matchingData.name}
						<div>
							${matchingData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
						</div>
					</div>
					<div class="detail-texts">
						To help keep our community authentic, we're showing information about accounts on Instagram. <span>See why this information is important.</span> 
					</div>

					<div class="detail-date-joined">
						<div data-bloks-name="ig.components.Icon" class="wbloks_1" style="mask-image: url(&quot;https://static.cdninstagram.com/rsrc.php/v3/yy/r/nJ9gMnn51pn.png&quot;); mask-size: contain; background-color: rgb(250, 250, 250); flex-shrink: 0; height: 24px; width: 24px;"></div>
							<div>
								<div>Date joined</div>
								<div class="detail-date">${matchingData.dateJoined}</div>
							</div>
					</div>
					<div class="detail-acc-basedin">
						<div data-bloks-name="ig.components.Icon" class="wbloks_1" style="mask-image: url(&quot;https://static.cdninstagram.com/rsrc.php/v3/y_/r/2GgQWB_xn93.png&quot;); mask-size: contain; background-color: rgb(250, 250, 250); flex-shrink: 0; height: 24px; width: 24px;"></div>
							<div>
								<div>Account based in</div>
								<div class="detail-place">${matchingData.accountBasedIn}</div>
							</div>
					</div>
					${
						matchingData.isVerified ? `
							<div class="detail-verified-container">
								<div class="detail-verified">
									<div data-bloks-name="ig.components.Icon" class="wbloks_1" style="mask-image: url(&quot;https://static.cdninstagram.com/rsrc.php/v3/yO/r/eGZ3v27WSRx.png&quot;); mask-size: contain; background-color: rgb(250, 250, 250); flex-shrink: 0; height: 24px; width: 24px;"></div>
									<div>Verified</div>
								</div>

								<div class="verify-texts">
									Profiles can be verified by Meta, based on their activity across <br> Meta products or documents they provide. Verified badges are displayed on these profiles.
								</div>
								<div class="verify-texts1">
									Some verified profiles are owned by a notable person, brand or <br> entity, while others subscribe to Meta Verified. <span>Learn more</span>
								</div>
								<div class="verify-button-container">
									<button class="verify-button">Join the waitlist for Meta Verified</button>
								</div>
							</div>
						` : ''}
				</div>
				<button class="detail-close-button js-close-button">Close</button>
			</div>
		`;

		document.querySelector('.js-close-button').addEventListener('click', () => {
			hideContainer();
		});

	});

	document.querySelector('.js-cancel-btn').addEventListener('click', () => {
		hideContainer();
	});

	overlay.addEventListener('click', () => {
		hideContainer();
	});
}

export function onClickEmojiButton(button, input) {
	const parent = button.parentElement;
	const elem = document.createElement('div');
	const overlay = document.createElement('div');
	elem.classList.add('emoji-container');
	overlay.classList.add('emoji-overlay');
	elem.innerHTML = `
		<div class="emojis">
			<div>
				<div>Most popular</div>
				<div class="mostpopular">
					<div class="js-emoji">😂</div>
					<div class="js-emoji">😮</div>
					<div class="js-emoji">😍</div>
					<div class="js-emoji">😥</div>
					<div class="js-emoji">👏</div>
					<div class="js-emoji">🔥</div>
					<div class="js-emoji">🎉</div>
					<div class="js-emoji">💯</div>
					<div class="js-emoji">💖</div>
					<div class="js-emoji">🤣</div>
					<div class="js-emoji">🥰</div>
					<div class="js-emoji">😘</div>
					<div class="js-emoji">😭</div>
					<div class="js-emoji">😊</div>
				</div>
			</div>

			<div>
				<div>Activities</div>
				<div class="mostpopular">
					<div class="js-emoji" title="">🕴</div>
					<div class="js-emoji" title="">🧗‍♂️</div>
					<div class="js-emoji" title="">🧗‍♀️</div>
					<div class="js-emoji" title="">🏇</div>
					<div class="js-emoji" title="">🏂</div>
					<div class="js-emoji" title="">🏌️‍♂️</div>
					<div class="js-emoji" title="">🏌️‍♀️</div>
					<div class="js-emoji" title="">🏄‍♂️</div>
					<div class="js-emoji" title="">🏄‍♀️</div>
					<div class="js-emoji" title="">🚣‍♂️</div>
					<div class="js-emoji" title="">🚣‍♀️</div>
					<div class="js-emoji" title="">🏊‍♂️</div>
					<div class="js-emoji" title="">🏊‍♀️</div>
					<div class="js-emoji" title="">⛹️‍♂️</div>
					<div class="js-emoji" title="">⛹️‍♀️</div>
					<div class="js-emoji" title="">🏋️‍♂️</div>
					<div class="js-emoji" title="">🏋️‍♀️</div>
					<div class="js-emoji" title="">🚴‍♂️</div>
					<div class="js-emoji" title="">🚴‍♀️</div>
					<div class="js-emoji" title="">🚵‍♂️</div>
					<div class="js-emoji" title="">🚵‍♀️</div>
					<div class="js-emoji" title="">🤸‍♂️</div>
					<div class="js-emoji" title="">🤸‍♀️</div>
					<div class="js-emoji" title="">🤽‍♂️</div>
					<div class="js-emoji" title="">🤽‍♀️</div>
					<div class="js-emoji" title="">🤾‍♂️</div>
					<div class="js-emoji" title="">🤾‍♀️</div>
					<div class="js-emoji" title="">🤹‍♂️</div>
					<div class="js-emoji" title="">🤹‍♀️</div>
					<div class="js-emoji" title="">🧘‍♂️</div>
					<div class="js-emoji" title="">🧘‍♀️</div>
					<div class="js-emoji" title="">🎪</div>
					<div class="js-emoji" title="">🛹</div>
					<div class="js-emoji" title="">🎗</div>
					<div class="js-emoji" title="">🎫</div>
					<div class="js-emoji" title="">🏆</div>
					<div class="js-emoji" title="">🎖</div>
					<div class="js-emoji" title="">🥇</div>
					<div class="js-emoji" title="">🥈</div>
					<div class="js-emoji" title="">🥉</div>
					<div class="js-emoji" title="">🏅</div>
					<div class="js-emoji" title="">⚽</div>
					<div class="js-emoji" title="">⚾</div>
					<div class="js-emoji" title="">🥎</div>
					<div class="js-emoji" title="">🏐</div>
					<div class="js-emoji" title="">🏀</div>
					<div class="js-emoji" title="">🏈</div>
					<div class="js-emoji" title="">🏉</div>
					<div class="js-emoji" title="">🎾</div>
					<div class="js-emoji" title="">🥏</div>
					<div class="js-emoji" title="">🎳</div>
					<div class="js-emoji" title="">🏏</div>
					<div class="js-emoji" title="">🏑</div>
					<div class="js-emoji" title="">🏒</div>
					<div class="js-emoji" title="">🥍</div>
					<div class="js-emoji" title="">🏓</div>
					<div class="js-emoji" title="">🏸</div>
					<div class="js-emoji" title="">🥊</div>
					<div class="js-emoji" title="">🥋</div>
					<div class="js-emoji" title="">⛳</div>
					<div class="js-emoji" title="">⛸</div>
					<div class="js-emoji" title="">🎣</div>
					<div class="js-emoji" title="">🎽</div>
					<div class="js-emoji" title="">🎿</div>
					<div class="js-emoji" title="">🛷</div>
					<div class="js-emoji" title="">🥌</div>
					<div class="js-emoji" title="">🎯</div>
					<div class="js-emoji" title="">🎱</div>
					<div class="js-emoji" title="">🎮</div>
					<div class="js-emoji" title="">🎰</div>
					<div class="js-emoji" title="">🎲</div>
					<div class="js-emoji" title="">🧩</div>
					<div class="js-emoji" title="">♟</div>
					<div class="js-emoji" title="">🎭</div>
					<div class="js-emoji" title="">🎨</div>
					<div class="js-emoji" title="">🧵</div>
					<div class="js-emoji" title="">🧶</div>
					<div class="js-emoji" title="">🎼</div>
					<div class="js-emoji" title="">🎤</div>
					<div class="js-emoji" title="">🎧</div>
					<div class="js-emoji" title="">🎧</div>
					<div class="js-emoji" title="">🎷</div>
					<div class="js-emoji" title="">🎸</div>
					<div class="js-emoji" title="">🎹</div>
					<div class="js-emoji" title="">🎻</div>
					<div class="js-emoji" title="">🎺</div>
					<div class="js-emoji" title="">🥁</div>
					<div class="js-emoji" title="">🎬</div>
					<div class="js-emoji" title="">🏹</div>

				</div>
			</div>
		</div>
	`;

	parent.appendChild(elem);
	parent.appendChild(overlay);

	overlay.addEventListener('click', () => {
		parent.removeChild(elem);
		parent.removeChild(overlay);
		input.focus();
	});

	document.querySelectorAll('.js-emoji').forEach(emoji => {
		emoji.addEventListener('click', () => {
			input.value += emoji.innerHTML;
			input.focus();
			parent.previousElementSibling.style.display = 'initial';
		});
	});
	input.focus();
}

export function onClickPostButton(postButton, input) {
	const comment = input.value;
	const {id} = postButton.dataset;
	let matchingCommentData = getMatchingCommentsData(id);
	let matchingData = getMatchingData(id);

	if (comment === '') return;
	matchingCommentData.comments.push({
		username: 'aaaaaaaaaaldma',
		comment
	});

	matchingData.commentCount++;
	document.querySelector(`.js-viewall-comment-${id}`).innerHTML = `
		View all ${matchingData.commentCount} comments
	`;

	input.value = '';
}

export function onClickSoundButton() {
	const soundBtn = document.querySelectorAll('.sound-button');
	
	soundBtn.forEach((button) => {
		button.addEventListener('click',() => {
			const prevSib = button.previousElementSibling;
			const video = prevSib.previousElementSibling;
			if (video.muted) {
				video.muted = false;
				button.innerHTML = `
				<svg class="soundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>`
			} else {
				video.muted = true;
				button.innerHTML = `
					<svg class="nosound-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is muted</title><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z"/></svg>
				`;
			}
		})
	});
}

// image slider
export function imageSlider(button) {
	const imgId = button.dataset.id;
	let images;
	let slides;
	let matchingData = getMatchingData(imgId);

	if (button.textContent == '❮') {
		const nextSib = button.nextElementSibling;
		images = button.previousElementSibling;
		slides = images.children.length;
		
		matchingData.index--;

		if (matchingData.index === 0) {
			button.classList.add('inactive');
		}
		if (matchingData.index < slides - 1) {
			nextSib.classList.remove('inactive');
		}
	}

	if (button.textContent == '❯') {
		const prevElemSib = button.previousElementSibling;			
		images = prevElemSib.previousElementSibling;
		slides = images.children.length;

		matchingData.index++;

		if (matchingData.index > 0) {
			prevElemSib.classList.remove('inactive');
		}
		if (matchingData.index === slides - 1) {
			button.classList.add('inactive');
		}
	}

	images.style.transform = `translateX(${-matchingData.index * 100}%)`;
	// images.style.transform = `translateX(${-matchingData.index * (100 / slides)}%)`;
}

/*----------------------------------------------------------*/

// tooltips functions
export function tooltipMouseover(tooltip) {
	tooltip.style.opacity = '1';
	tooltip.style.pointerEvents = 'auto';
}

export function tooltipMouseleave(tooltip) {
	tooltip.style.opacity = '0';
	tooltip.style.pointerEvents = 'none';
}

/*----------------------------------------------------------*/

// animation function
// bouncy effect
export function bouncyEffect(elem) {
	elem.style.transition = 'transform 0.15s ease'; // Start transition
	elem.style.transform = 'scale(1.2)'; // Scale up on unhover
	
	setTimeout(() => {
		elem.style.transform = 'scale(1)'; // Bounce back to original size
	}, 150); // Delay to bounce back after scaling up
}

/*----------------------------------------------------------*/

// view comment function
export function viewCommentSection(button) {
	const elem = document.createElement('div');
	const overlay = document.createElement('div');
	elem.classList.add('comment-container');
	overlay.classList.add('comment-overlay');

	const container = document.querySelector('.js-videos-images');
	const {id} = button.dataset;
	let matchingData = getMatchingData(id);
	matchingData.index = 0;

	elem.innerHTML = `
		<div class="comment-img-section js-cimagevideo-con">
			${post(matchingData.typePost)}
		</div>
		<div class="comment-right-section">
			<div class="comment-header">
				<div class="comment-profile js-comment-profile">
					<img src="${matchingData.profile}">
					<div class="user-profile-tooltip js-profile-tooltip">
						<div class="profile-tooltip-container">
							<div class="profile-tooltip">
								<img src="${matchingData.profile}">
							</div>
							<div>
								<div class="tooltip-name">${matchingData.name}
									<div>
										${matchingData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
									</div>
								</div>
								<div class="tooltip-sub-name">${matchingData.userName}</div>
							</div>
						</div>

						<div class="tooltip-pff">
							<div>
								<div class="tooltip-post-count">${matchingData.postCount.toLocaleString()}</div>
								<div>posts</div>
							</div>
							<div>
								<div>${matchingData.followers}</div>
								<div>followers</div>
							</div>
							<div>
								<div>${matchingData.following}</div>
								<div>following</div>
							</div>
						</div>

						<div class="tooltip-has-posts">
							<div class="tooltip-post"></div>
							<div class="tooltip-post"></div>
							<div class="tooltip-post"></div>
						</div>
						<div class="tooltip-following">
							<button class="tooltip-message-button">
								<svg aria-label="Messenger" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>Message
							</button>
							<button class="tooltip-following-button">Following</button>
						</div>
					</div>
				</div>
				<div class="comment-username-con js-cname-con">
					<div class="comment-username">${matchingData.name}</div>
					<div class="verified-container">
						${matchingData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
					</div>
					<div class="video-username-tooltip js-username-tooltip">
						<div class="profile-tooltip-container">
							<div class="profile-tooltip">
								<img src="${matchingData.profile}">
							</div>
							<div>
								<div class="tooltip-name">${matchingData.name}
									<div>
										${matchingData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
									</div>
								</div>
								<div class="tooltip-sub-name">${matchingData.userName}</div>
							</div>
						</div>

						<div class="tooltip-pff">
							<div>
								<div class="tooltip-post-count">${matchingData.postCount.toLocaleString()}</div>
								<div>posts</div>
							</div>
							<div>
								<div>${matchingData.followers}</div>
								<div>followers</div>
							</div>
							<div>
								<div>${matchingData.following}</div>
								<div>following</div>
							</div>
						</div>

						<div class="tooltip-has-posts">
							<div class="tooltip-post"></div>
							<div class="tooltip-post"></div>
							<div class="tooltip-post"></div>
						</div>
						<div class="tooltip-following">
							<button class="tooltip-message-button">
								<svg aria-label="Messenger" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>Message
							</button>
							<button class="tooltip-following-button">Following</button>
						</div>
					</div>
				</div>
				<div>
					<svg aria-label="More options" data-id="${matchingData.id}" class="js-cmore-option-button" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
				</div>
			</div>
			<div class="comments">
				${showComments(matchingData.id)}
			</div>
			<div class="comment-icon-con">
				<div class="comment-icon">
					<button class="js-clike-button" data-id="${matchingData.id}">
						${handleLikeIcon(matchingData.id)}
					</button>
					<button class="js-ccomment-button">
						<svg aria-label="Comment" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
					</button>
					<button class="js-cshare-button">
						<svg aria-label="Share" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>
					<button class="csave-button js-csave-button">
						<svg aria-label="Save" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>
				</div>
				<div>
					<span class="comment-post-like js-clike-counts">${matchingData.likeCount.toLocaleString()} likes</span>
				</div>
				<span class="comment-time">${matchingData.timePosted}</span>
			</div>
			<div class="comment-type-sec">
				<div class="emojis-container">
					<svg aria-label="Emoji" class="js-cemoji-button" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
				</div>
				<input type="text" class="js-cinput" placeholder="Add a comment...">
				<button class="comment-post-button js-cpost-btn" data-id="${matchingData.id}">Post</button>
			</div>
		</div>
	`;
	overlay.innerHTML = `
		<svg aria-label="Close" class="overlay-close-button" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
	`;

	container.appendChild(elem);
	container.appendChild(overlay);

	setTimeout(() => {
		elem.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 100);

	function post(typePost) {
		if (typePost === 'image') {
			return `
				<img src="${matchingData.post}" data-id="${matchingData.id}">
				<div class="image-like js-cimage-like">
					<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
				</div>
			`;
		} 
		if (typePost === 'video') {
			document.querySelector(`.js-video-${id}`).pause();
			return `
				<video autoplay loop src="${matchingData.post}" data-id="${matchingData.id}"></video>
				<div class="image-like js-cimage-like">
					<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
				</div>
				<button class="sound-button csound-button">
					<svg class="csoundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>
				</button>
			`;
		}
		if (typePost === 'images') {
			let posts = '';
			matchingData.post.forEach(imgs => {
				posts += `
					<div class="cimage">
						<img src="${imgs}" data-id="${matchingData.id}">
						<div class="image-like js-cimage-like">
							<svg aria-label="Unlike" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
						</div>
					</div>
				`;
			});
			return `
				<div class="cimages">
					${posts}
				</div>
				<button class="prev-button inactive js-cprev" data-id="${matchingData.id}">&#10094;</button>
				<button class="next-button js-cnext" data-id="${matchingData.id}">&#10095;</button>
			`;
		}
	}

	// this function returns specific comments based on the post
	function showComments(id) {
		let commentsHtml = '';
		let matchingCommentData = getMatchingCommentsData(id);

		if (matchingCommentData.comments.length === 0) {
			commentsHtml = `
				<div class="no-comment-con">
					<div class="no-comment-text">No comments yet.</div>
					<div class="no-comment-text1">Start the conversation.</div>
				</div>
			`;
			return commentsHtml;
		}

		matchingCommentData.comments.forEach(data => {
			commentsHtml += `
				<div class="comment">
					<div class="comment-profile-pic"></div>
					<div class="comment-con">
						<div class="comment-text">
							<span class="comment-name">${data.username}</span>
							${data.comment}
						</div>
						<div class="comment-status">
							<span>3w</span>
							<span>405 likes</span>
							<span>Reply</span>
						</div>
					</div>								
					<button class="comment-like-button">
						<svg aria-label="Like" class="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
					</button>
				</div>
			`;
		});

		return commentsHtml;
	}

	onClickSoundButton();

	// comment section functions/interactions
	const likeBtn = document.querySelector('.js-clike-button');
	const commentBtn = document.querySelector('.js-ccomment-button');
	const shareBtn = document.querySelector('.js-cshare-button');
	const saveBtn = document.querySelector('.js-csave-button'); 
	const postBtn = document.querySelector('.js-cpost-btn');
	const moreOptionBtn = document.querySelector('.js-cmore-option-button');
  const profile = document.querySelector('.js-comment-profile');
	const name = document.querySelector('.js-cname-con');
	const likeCountElem = document.querySelector(`.js-clike-counts`);
	const emojiBtn = document.querySelector('.js-cemoji-button');
	const prevBtn = document.querySelector('.js-cprev');
	const nextBtn = document.querySelector('.js-cnext');
	const input = document.querySelector('.js-cinput');

	overlay.addEventListener('click', () => {
		matchingData.index = 0;
		container.removeChild(elem);
		container.removeChild(overlay);
		loadPage();
	});

	// like button
	likeBtn.addEventListener('click', () => {
		onClickLikeButton(likeBtn, likeCountElem);
		bouncyEffect(likeBtn);
	});
	likeBtn.addEventListener('mouseleave', () => {
		bouncyEffect(likeBtn);
	});

	// comment button
	commentBtn.addEventListener('click', () => {
		document.querySelector('.js-cinput').focus();
	});

	// share button
	shareBtn.addEventListener('click', () => {
		onClickShareButton();
	});

	// save button
	saveBtn.addEventListener('click', () => {
		onClickSaveButton(saveBtn);
	});

	// comment post button
	postBtn.addEventListener('click', () => {
		onClickPostButton(postBtn, input);
		document.querySelector('.comments').innerHTML = showComments(id);
	});
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			onClickPostButton(postBtn, input);
			document.querySelector('.comments').innerHTML = showComments(id);
		}
	})

	// more option button
	moreOptionBtn.addEventListener('click', () => {
		const {id} = moreOptionBtn.dataset;
		onClickMoreOptionButton(id);
	});

	// like count
	likeCountElem.addEventListener('click', () => {
		likeCountFunction(id);
	});

	// emoji button
	emojiBtn.addEventListener('click', () => {
		const input = document.querySelector(`.js-cinput`);
		onClickEmojiButton(emojiBtn, input);		
	});

	// double click post
	document.querySelectorAll('.js-cimagevideo-con img').forEach(img => {
		img.addEventListener('dblclick', () => {
			const likeCount = document.querySelector(`.js-clike-counts`);
			const likeBtn = document.querySelector(`.js-clike-button`);
			onDlClickPost(img, likeCount, likeBtn);
		});
	});
	document.querySelectorAll('.js-cimagevideo-con video').forEach(vid => {
		vid.addEventListener('dblclick', () => {
			const likeCount = document.querySelector(`.js-clike-counts`);
			const likeBtn = document.querySelector(`.js-clike-button`);
			onDlClickPost(vid, likeCount, likeBtn);
		});
	});

	// tooltip function
	profile.addEventListener('mouseover', () => {
		const tooltip = document.querySelector('.js-profile-tooltip');
		tooltipMouseover(tooltip);
	});
	profile.addEventListener('mouseleave', () => {
		const tooltip = document.querySelector('.js-profile-tooltip');
		tooltipMouseleave(tooltip);
	});

	name.addEventListener('mouseover', () => {
		const tooltip = document.querySelector('.js-username-tooltip');
		tooltipMouseover(tooltip);
	});
	name.addEventListener('mouseleave', () => {
		const tooltip = document.querySelector('.js-username-tooltip');
		tooltipMouseleave(tooltip);
	});

	// functions if the post is images
	if (matchingData.typePost === 'images') {
		nextBtn.addEventListener('click', () => {
			imageSlider(nextBtn);
		});

		prevBtn.addEventListener('click', () => {
			imageSlider(prevBtn)
		});
	}
}