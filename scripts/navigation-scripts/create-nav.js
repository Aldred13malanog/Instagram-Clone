import { fypData } from "../../data/fyp-data.js";
import {loadPage} from '../home-page.js';
import { commentsData } from "../../data/comments-data.js";
import { peopleWhoLikeData } from "../../data/post-likes-data.js";

let id = 11;
const createNav = document.querySelector('.js-create');
function createPost() {
	const createPostContainer = document.createElement('div');
	const overlay = document.createElement('div');
	createPostContainer.classList.add('create-post-popup');
	overlay.classList.add('create-overlay');

	createPostContainer.innerHTML = `
		<div class="create-header">
			<svg aria-label="Back" style="rotate: -90deg;" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Back</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
			<div>Create new post</div>
			<div class="share-post-button">Share</div>
		</div>
		<label class="create-post-con" for="inputId">
			<label for="inputId">
				<img class="imgId">
			</label>
			<label for="inputId" class="icon">
				<svg aria-label="Icon to represent media such as images or videos" class="create-icon" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
			</label>
			<div class="create-text">Drag photos and videos here</div>
			<label class="button" for="inputId">Select from computer</label>
			<input type="file" name="" accept="image/*" hidden id="inputId">
		</label>
	`;

	document.body.appendChild(createPostContainer);
	document.body.appendChild(overlay);

	setTimeout(() => {
		createPostContainer.style.transform = 'translate(-50%, -50%) scale(100%)';
	}, 150);
	
	const inputFile = document.querySelector('#inputId');
	const shareButton = document.querySelector('.share-post-button');
	const img = document.querySelector('.imgId');
	const imgV = document.querySelector('.create-post-con');
	let newPost;

	overlay.addEventListener('click', () => {
		document.body.removeChild(createPostContainer);
		document.body.removeChild(overlay);
	});
	
	// inputFile.addEventListener('change', (event) => {
	// 	const file = event.target.files[0];
	// 	if (file) {	
	// 		const reader = new FileReader();
	// 		reader.onload = function(e) {
	// 			img.src = e.target.result;
	// 			newPost = e.target.result;
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// });
	function uploadImage() {
		let imgLink = URL.createObjectURL(inputFile.files[0]);
		imgV.style.backgroundImage = `url(${imgLink})`;
		imgV.textContent = '';
		newPost = imgLink;
	}

	inputFile.addEventListener('change', uploadImage);
	imgV.addEventListener('dragover', (e) => {
		e.preventDefault();
	});
	imgV.addEventListener('drop', (e) => {
		e.preventDefault();
		inputFile.files = e.dataTransfer.files;
		uploadImage();
	});
	
	shareButton.addEventListener('click', () => {
		if (!newPost) return;
		id++;
		fypData.push({
			id: `${id}`,
			usersId: '4',
			post: newPost,
			timePosted: 'Karon lang',
			postLink: 'walay link',
			typePost: 'image',
			isLiked: false,
			likeCount: 2032,
			commentCount: 37,
		});
		commentsData.push({
			id: `${id}`,
			comments: []
		});
		peopleWhoLikeData.push({
			id: `${id}`,
			users: []
		});
		img.src = '';
		newPost = '';
	
		loadPage();
		document.body.removeChild(createPostContainer);
		document.body.removeChild(overlay);
	});
}
createNav.addEventListener('click', () => {
	createPost();
});
