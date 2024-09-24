import { getMatchingData } from "../../data/fyp-data.js";
import { getMatchingCommentsData } from "../../data/comments-data.js";

// check post fun
export function checkPost(data) {
	if (data.typePost === 'image') {
		return `		
			<img src="${data.post}" data-id="${data.id}">
			<div class="image-like js-image-like">
				<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
			</div>
		`;
	}
	if (data.typePost === 'video') {
		return `
			<video src="${data.post}" data-id="${data.id}" class="js-video-${data.id}"></video>
			<div class="image-like js-image-like">
				<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
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
						<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
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

// video function
export function videoFunction() {
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
					<svg class="nosound-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><title>Audio is muted</title><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z"/></svg>
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
	let datas = getMatchingData(imgId);	

	if (button.textContent == '❮') {
		const nextSib = button.nextElementSibling;
		images = button.previousElementSibling;
		slides = images.children.length;
		
		datas.index--;

		if (datas.index === 0) {
			button.classList.add('inactive');
		}
		if (datas.index < slides - 1) {
			nextSib.classList.remove('inactive');
		}
	}

	if (button.textContent == '❯') {
		const prevElemSib = button.previousElementSibling;			
		images = prevElemSib.previousElementSibling;
		slides = images.children.length;

		datas.index++;

		if (datas.index > 0) {
			prevElemSib.classList.remove('inactive');
		}
		if (datas.index === slides - 1) {
			button.classList.add('inactive');
		}
	}

	images.style.transform = `translateX(${-datas.index * (100 / slides)}%)`;
}

// img/vid like
export function imgVidLike(elem, elem2, elem3) {
	const parentElem = elem.parentElement; 
	const imglike = parentElem.children[1];
	const {id} = elem.dataset;
	let matchingData = getMatchingData(id);

	const likeCountElem = elem2;
	const likeBtn = elem3;
	
	let likeCount = matchingData.likeCount;
	likeCount++;
	likeCountElem.innerHTML = `${likeCount.toLocaleString()} likes`;
	likeBtn.innerHTML = `
		<svg aria-label="Unlike" fill="white" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
	`;
	bouncyEffect(likeBtn);

	imglike.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(-20deg)';
	setTimeout(() => {
		imglike.style.transform = 'translate(-50%, -50%)';
	}, 250);
	setTimeout(() => {
		imglike.style.transform = 'translate(-50%, -50%) scale(0)';
	}, 700);
}

// like button
export function likeBtnFunction(button, likeCount) {
	const {id} = button.dataset;
	const svg = button.children[0];
	const likeCountElem = likeCount;

	let matchingData = getMatchingData(id);

	if (svg.ariaLabel === 'Like') {
		let count = matchingData.likeCount;
		count++;
		likeCountElem.innerHTML = `${count.toLocaleString()} likes`;

		button.innerHTML = `
			<svg aria-label="Unlike" fill="white" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
		`;
	} else {
		let count = matchingData.likeCount;
		likeCountElem.innerHTML = `${count.toLocaleString()} likes`;

		button.innerHTML = `
			<svg aria-label="Like" class="like-icon" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" stroke="none"></path></svg>
		`;
	}
}

export function shareBtnFunction() {
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

export function saveBtnFunction(button) {
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

export function moreOptionBtnFunction() {
	const moreOptionsContainer = document.createElement('div');
	const overlay = document.createElement('div');
	const container = document.querySelector('.js-videos-images');

	moreOptionsContainer.classList.add('more-option-container');
	overlay.classList.add('more-option-overlay');

	moreOptionsContainer.innerHTML = `
		<div class="report-btn">Report</div>
		<div class="unfollow-btn">Unfollow</div>
		<div>Add to favorites</div>
		<div>Go to post</div>
		<div>Share to...</div>
		<div>Copy link</div>
		<div>Embed</div>
		<div>About this account</div>
		<div class="cancel-btn js-cancel-btn">Cancel</div>
	`;

	container.appendChild(moreOptionsContainer);
	container.appendChild(overlay);

	setTimeout(() => {
		moreOptionsContainer.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 150)

	overlay.addEventListener('click', () => {
		container.removeChild(moreOptionsContainer);
		container.removeChild(overlay);
	});

	document.querySelector('.js-cancel-btn').addEventListener('click', () => {
		container.removeChild(moreOptionsContainer);
		container.removeChild(overlay);
	});
}

// bouncy effect
export function bouncyEffect(elem) {
	elem.style.transition = 'transform 0.15s ease'; // Start transition
	elem.style.transform = 'scale(1.2)'; // Scale up on unhover
	
	setTimeout(() => {
		elem.style.transform = 'scale(1)'; // Bounce back to original size
	}, 150); // Delay to bounce back after scaling up
}

export function tooltipMouseover(elem) {
	const tooltip = elem.children[1];
	tooltip.style.opacity = '1';
	tooltip.style.pointerEvents = 'auto';
}

export function tooltipMouseleave(elem) {
	const tooltip = elem.children[1];
	tooltip.style.opacity = '0';
	tooltip.style.pointerEvents = 'none';
}

// view comment function
export function viewCommentSection(button) {
	const elem = document.createElement('div');
	const overlay = document.createElement('div');
	elem.classList.add('comment-container');
	overlay.classList.add('comment-overlay');

	const container = document.querySelector('.js-videos-images');
	const {id} = button.dataset;
	let matchingData = getMatchingData(id);
	let post;

	if (matchingData.typePost === 'image') {
		post = `
			<img src="${matchingData.post}" data-id="${matchingData.id}">
			<div class="image-like js-cimage-like">
				<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
			</div>
		`;
	} else if (matchingData.typePost === 'video') {
		post = `
			<video autoplay loop src="${matchingData.post}" data-id="${matchingData.id}"></video>
			<div class="image-like js-cimage-like">
				<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
			</div>
			<button class="csound-button">
				<svg class="csoundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>
			</button>
		`;
	} else if (matchingData.typePost === 'images') {
		let posts = '';
		matchingData.post.forEach(imgs => {
			posts += `
				<div class="cimage">
					<img src="${imgs}" data-id="${matchingData.id}">
					<div class="image-like js-cimage-like">
						<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
					</div>
				</div>
			`;
		});
		post = `
			<div class="cimages">
				${posts}
			</div>
			<button class="prev-button inactive js-cprev">&#10094;</button>
			<button class="next-button js-cnext">&#10095;</button>
		`;
	}

	elem.innerHTML = `
		<div class="comment-img-section js-cimagevideo-con">
			${post}
		</div>
		<div class="comment-right-section">
			<div class="comment-header">
				<div class="comment-profile js-comment-profile">
					<img src="${matchingData.profile}">
					<div class="user-profile-tooltip">
						<div class="profile-tooltip-container">
							<div class="profile-tooltip">
								<img src="${matchingData.profile}">
							</div>
							<div>
								<div class="tooltip-name">${matchingData.name}</div>
								<div class="tooltip-sub-name">${matchingData.userName}</div>
							</div>
						</div>

						<div class="tooltip-pff">
							<div>
								<div class="tooltip-post-count">${matchingData.postCount.toLocaleString()}</div>
								<div>posts</div>
							</div>
							<div>
								<div>${matchingData.userFollowers}</div>
								<div>followers</div>
							</div>
							<div>
								<div>${matchingData.userFollowing}</div>
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
					<div class="video-username-tooltip">
						<div class="profile-tooltip-container">
							<div class="profile-tooltip">
								<img src="${matchingData.profile}">
							</div>
							<div>
								<div class="tooltip-name">${matchingData.name}</div>
								<div class="tooltip-sub-name">${matchingData.userName}</div>
							</div>
						</div>

						<div class="tooltip-pff">
							<div>
								<div class="tooltip-post-count">${matchingData.postCount.toLocaleString()}</div>
								<div>posts</div>
							</div>
							<div>
								<div>${matchingData.userFollowers}</div>
								<div>followers</div>
							</div>
							<div>
								<div>${matchingData.userFollowing}</div>
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
					<svg aria-label="More options" class="js-cmore-option-button" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
				</div>
			</div>
			<div class="comments">
				${showComments(matchingData.id)}
			</div>
			<div class="comment-icon-con">
				<div class="comment-icon">
					<button class="js-clike-button" data-id="${matchingData.id}">
						<svg aria-label="Like" class="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
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
				<span class="comment-post-like js-clike-counts">${matchingData.likeCount.toLocaleString()} likes</span>
				<span class="comment-time">${matchingData.timePosted}</span>
			</div>
			<div class="comment-type-sec">
				<svg aria-label="Emoji" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
				<input type="text" class="js-cinput" placeholder="Add a comment...">
				<button class="comment-post-button js-cpost-btn">Post</button>
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

	// this function returns specific comments based on the post
	function showComments(id) {
		let commentsHtml = '';
		let matchingData = getMatchingCommentsData(id);

		if (matchingData.comments.length === 0) {
			commentsHtml = `
				<div class="no-comment-con">
					<div class="no-comment-text">No comments yet.</div>
					<div class="no-comment-text1">Start the conversation.</div>
				</div>
			`;
			return commentsHtml;
		}

		matchingData.comments.forEach(data => {
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

	// comment section functions/interactions
	const likeBtn = document.querySelector('.js-clike-button');
	const commentBtn = document.querySelector('.js-ccomment-button');
	const shareBtn = document.querySelector('.js-cshare-button');
	const saveBtn = document.querySelector('.js-csave-button'); 
	const postBtn = document.querySelector('.js-cpost-btn');
	const moreOptionBtn = document.querySelector('.js-cmore-option-button');
  const profile = document.querySelector('.js-comment-profile');
	const name = document.querySelector('.js-cname-con');

	overlay.addEventListener('click', () => {
		container.removeChild(elem);
		container.removeChild(overlay);
		if (matchingData.typePost === 'video') {
			setTimeout(() => {
				document.querySelector(`.js-video-${id}`).play();
			}, 500);
		}
	});

	// like btn
	likeBtn.addEventListener('click', () => {
		const elem = document.querySelector(`.js-clike-counts`);
		likeBtnFunction(likeBtn, elem);
		bouncyEffect(likeBtn);
	});
	likeBtn.addEventListener('mouseleave', () => {
		bouncyEffect(likeBtn);
	});

	// comment btn
	commentBtn.addEventListener('click', () => {
		document.querySelector('.js-cinput').focus();
	});

	// share btn
	shareBtn.addEventListener('click', () => {
		shareBtnFunction();
	});

	// save btn
	saveBtn.addEventListener('click', () => {
		saveBtnFunction(saveBtn);
	});

	postBtn.addEventListener('click', () => {
		const input = document.querySelector('.js-cinput');
		const comment = input.value;
		let matchingData = getMatchingCommentsData(id);

		if (comment === '') return;
		matchingData.comments.push({
			username: 'aaaaaaaaaaldma',
			comment
		});

		document.querySelector('.comments').innerHTML = showComments(id);
		input.value = '';
	});

	moreOptionBtn.addEventListener('click', () => {
		moreOptionBtnFunction();
	});

	document.querySelectorAll('.js-cimagevideo-con img').forEach(img => {
		img.addEventListener('dblclick', () => {
			const likeCount = document.querySelector(`.js-clike-counts`);
			const likeBtn = document.querySelector(`.js-clike-button`);
			imgVidLike(img, likeCount, likeBtn);
		});
	});
	
	document.querySelectorAll('.js-cimagevideo-con video').forEach(vid => {
		vid.addEventListener('dblclick', () => {
			const likeCount = document.querySelector(`.js-clike-counts`);
			const likeBtn = document.querySelector(`.js-clike-button`);
			imgVidLike(vid, likeCount, likeBtn);
		});
	});

	// tooltip function
	profile.addEventListener('mouseover', () => {
		tooltipMouseover(profile);
	});
	profile.addEventListener('mouseleave', () => {
		tooltipMouseleave(profile);
	});

	name.addEventListener('mouseover', () => {
		tooltipMouseover(name);
	});
	name.addEventListener('mouseleave', () => {
		tooltipMouseleave(name);
	});

	// functions if the post is images/video
	if (matchingData.typePost === 'video') {
		const button = document.querySelector('.csound-button');

		document.querySelector(`.js-video-${id}`).pause();

		button.addEventListener('click', () => {
			const prev = button.previousElementSibling;
			const video = prev.previousElementSibling;
			if (video.muted) {
				video.muted = false;
				button.innerHTML = `
				<svg class="soundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>`;
			} else {
				video.muted = true;
				button.innerHTML = `
					<svg class="nosound-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is muted</title><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z"/></svg>
				`;
			}
		})
	}

	if (matchingData.typePost === 'images') {
		let index = 0;
		const prevBtn = document.querySelector('.js-cprev');
		const nextBtn = document.querySelector('.js-cnext');

		nextBtn.addEventListener('click', () => {
			const container = document.querySelector('.cimages');
			index++;
			if (index == container.children.length - 1) {
				nextBtn.classList.add('inactive');
			}
			prevBtn.classList.remove('inactive');
			container.style.transform = `translateX(-${index * 100}%)`;
		});

		prevBtn.addEventListener('click', () => {
			const container = document.querySelector('.cimages');		
			nextBtn.classList.remove('inactive');
			index--;
			if (index == 0) {
				prevBtn.classList.add('inactive');
			}
			container.style.transform = `translateX(-${index * 100}%)`;
		});
		// imageSlider()
	}
}