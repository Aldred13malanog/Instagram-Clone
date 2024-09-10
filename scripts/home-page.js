import { fypData } from "../data/fyp-data.js";

function loadPage() {
	let homeHTML = '';

	fypData.forEach((data) => {
		homeHTML += `
			<div class="video-container">
				<div class="video-header">
					<div class="user-profile">
						<img src="${data.profile}" alt="Profile">
						<div class="user-profile-tooltip">
							<div class="profile-tooltip-container">
								<div class="profile-tooltip">
									<img src="${data.profile}">
								</div>
								<div>
									<div class="tooltip-name">${data.name}</div>
									<div class="tooltip-sub-name">${data.userName}</div>
								</div>
							</div>

							<div class="tooltip-pff">
								<div>
									<div class="tooltip-post-count">${data.postCount}</div>
									<div>posts</div>
								</div>
								<div>
									<div>${data.userFollowers}</div>
									<div>followers</div>
								</div>
								<div>
									<div>${data.userFollowing}</div>
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
					<div class="username-section">
						<div class="username-container">
							<div class="username">${data.name}</div>
							<div class="video-username-tooltip">
								<div class="profile-tooltip-container">
									<div class="profile-tooltip">
										<img src="${data.profile}">
									</div>
									<div>
										<div class="tooltip-name">${data.name}</div>
										<div class="tooltip-sub-name">${data.userName}</div>
									</div>
								</div>

								<div class="tooltip-pff">
									<div>
										<div class="tooltip-post-count">${data.postCount}</div>
										<div>posts</div>
									</div>
									<div>
										<div>${data.userFollowers}</div>
										<div>followers</div>
									</div>
									<div>
										<div>${data.userFollowing}</div>
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
						<div>&#8226;</div>
						<div class="time">${data.timePosted}</div>
					</div>
					<svg aria-label="More options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
				</div>

				<div class="video-image js-video-image">
					${checkPost(data.typePost, data)}
				</div>

				<div class="video-icons-container">
					<div class="like-button">
						<svg aria-label="Like" class="like-icon js-like-button" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" stroke="none"></path></svg>
						<svg aria-label="Unlike" class="unlike-icon js-like-button" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
					</div>

					<div class="comment-button">
						<svg aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke-linejoin="round" stroke-width="2"></path></svg>
					</div>

					<div class="share-button">
						<svg aria-label="Share" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</div>

					<div class="save-button">
						<svg aria-label="Save" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</div>

				</div>

				<div class="like-counts">${data.likeCount} likes</div>
				<div class="view-all-comments">View all ${data.commentCount} comments</div>

				<div class="comment-section">
					<input type="text" placeholder="Add a comment...">
					<svg aria-label="Emoji" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
				</div>

			</div>
		`;
	});
	document.querySelector('.js-videos-images').innerHTML = homeHTML;

	function checkPost(typePost, data) {
		if (typePost === 'image') {
			return `
				<div class="img-con">
					<img src="${data.post}">
					<div class="image-like js-image-like">
						<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
					</div>
				</div>
			`;
		}
		if (typePost === 'video') {
			return `
				<video src="${data.post}"></video>
				<div class="image-like js-image-like">
					<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
				</div>
				<button class="sound-button">
					<svg class="soundup-icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><title>Audio is playing</title><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>
				</button>
			`;
		}
		if (typePost === 'images') {
			let posts = '';
			data.post.forEach(post => {
				posts += `
					<div class="img-con">
						<img class="slide" src="${post}">
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

	function videoAutoPlay() {
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
				const video = button.previousElementSibling;
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
	videoAutoPlay();
	
	// image slider
	let currentIndex = 0;
	let id;
	
	document.querySelectorAll('.prev-button').forEach((prev) => {
		prev.addEventListener('click', () => {
			const nextSib = prev.nextElementSibling;
			const images = prev.previousElementSibling;
			const slides = images.children.length;
			const imgId = prev.dataset.id;

			if (id !== imgId) {
				currentIndex = 0;
			}
			
			id = imgId;
			if (currentIndex <= 0) return;
			currentIndex--;
			if (currentIndex === 0) {
				prev.classList.add('inactive');
			}
			if (currentIndex < slides - 1) {
				nextSib.classList.remove('inactive');
			}
			images.style.transform = `translateX(${-currentIndex * (100 / slides)}%)`;
		});
	});
	
	document.querySelectorAll('.next-button').forEach((next) => {
		next.addEventListener('click', () => {
			const prevElemSib = next.previousElementSibling;			
			const images = prevElemSib.previousElementSibling;
			const slides = images.children.length;
			const imgId = next.dataset.id;

			if (id !== imgId) {
				currentIndex = 0;
			}
			
			id = imgId;
			if (currentIndex >= slides - 1) return;
			currentIndex++;
			if (currentIndex > 0) {
				prevElemSib.classList.remove('inactive');
			}
			if (currentIndex === slides - 1) {
				next.classList.add('inactive');
			}
			images.style.transform = `translateX(${-currentIndex * (100 / slides)}%)`;
		});
	});

	// like button effect

	function bouncyEffect(elem) {
		elem.style.transition = 'transform 0.15s ease'; // Start transition
		elem.style.transform = 'scale(1.2)'; // Scale up on unhover
				
		setTimeout(() => {
			elem.style.transform = 'scale(1)'; // Bounce back to original size
		}, 100); // Delay to bounce back after scaling up
	}

	document.querySelectorAll('.js-like-button').forEach(icon => {
		icon.addEventListener('click', () => {
			if (icon.classList.contains('like-icon')) {
				const nextSib = icon.nextElementSibling;
				nextSib.classList.add('active');
			} else {
				icon.classList.remove('active');
			}
			
			bouncyEffect(icon);
		})
	
		icon.addEventListener('mouseleave', () => {
			bouncyEffect(icon);	
		});
	})

	let count = 0;
	let timeoutId;

	function imgVidLike(elem) {
		const parentElem = elem.parentElement; 
		const imglike = parentElem.children[1];
		clearTimeout(timeoutId);
		count++;

		if (count === 2) {
			imglike.style.transform = 'translate(-50%, -50%) scale(1.2)';
			setTimeout(() => {
				imglike.style.transform = 'translate(-50%, -50%) scale(1)';
			}, 250);
			setTimeout(() => {
				imglike.style.transform = 'translate(-50%, -50%) scale(0)';
			}, 1000);
		}
		timeoutId = setTimeout(() => {
			count = 0;
		}, 200);
	}

	// when clicking the image/video twice the like icon appear
	document.querySelectorAll('.js-video-image img').forEach(img => {
		img.addEventListener('click', () => {
			imgVidLike(img);
		})
	});
	
	document.querySelectorAll('.js-video-image video').forEach(vid => {
		vid.addEventListener('click', () => {
			imgVidLike(vid);
		})
	}) 
	
}
loadPage();
