import { fypData } from "../data/fyp-data.js";
import { getMatchingCommentsData } from "../data/comments-data.js";
import { 
	videoFunction,
	checkPost,
	imageSlider,
	imgVidLike,
	bouncyEffect,
	viewCommentSection,
	likeBtnFunction,
	shareBtnFunction,
	saveBtnFunction,
	moreOptionBtnFunction,
} from "./home-page-scripts.js";

function loadPage() {
	let homeHTML = '';

	fypData.forEach((data) => {
		homeHTML += `
			<div class="video-container js-video-container-${data.id}">
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
					<svg aria-label="More options" class="js-more-options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
				</div>

				<div class="video-image js-video-image">
					${checkPost(data)}
				</div>

				<div class="video-icons-container">
					<button class="like-button js-like-button js-like-btn-${data.id}" data-id="${data.id}">
						<svg aria-label="Like" class="like-icon" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" stroke="none"></path></svg>
					</button>

					<button class="comment-button js-comment-button" data-id="${data.id}">
						<svg aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke-linejoin="round" stroke-width="2"></path></svg>
					</button>

					<button class="share-button js-share-button">
						<svg aria-label="Share" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>

					<button class="save-button js-save-button">
						<svg aria-label="Save" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>

				</div>

				<div class="like-counts js-like-counts-${data.id}">${data.likeCount.toLocaleString()} likes</div><br>
				<div class="view-all-comments js-viewall-comment-button" data-id="${data.id}">View all ${data.commentCount} comments</div>

				<div class="comment-section">
					<input type="text" class="js-comment-input" placeholder="Add a comment...">
					<button class="comment-post-button js-post-button" data-id="${data.id}">Post</button>
					<svg aria-label="Emoji" class="x1lliihq x1n2onr6 xb88cxz" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
				</div>

			</div>
		`;
	});
	document.querySelector('.js-videos-images').innerHTML = homeHTML;

	videoFunction();
	
	// image slider
	document.querySelectorAll('.prev-button').forEach((prev) => {
		prev.addEventListener('click', () => {
			imageSlider(prev);			
		});
	});
	document.querySelectorAll('.next-button').forEach((next) => {
		next.addEventListener('click', () => {
			imageSlider(next);
		});
	});

	// like button
	document.querySelectorAll('.js-like-button').forEach((button, i) => {
		button.addEventListener('click', () => {
			const elem = document.querySelector(`.js-like-counts-${i}`);
			likeBtnFunction(button, elem);
			bouncyEffect(button);
		});

		button.addEventListener('mouseleave', () => {
			bouncyEffect(button);
		});
	});

	// when clicking the image/video twice the like icon appear
	document.querySelectorAll('.js-video-image img').forEach(img => {
		img.addEventListener('click', () => {
			imgVidLike(img);
		})
	});
	document.querySelectorAll('.js-video-image video').forEach(vid => {
		vid.addEventListener('click', () => {
			imgVidLike(vid);
		});
	});

	// comment button
	document.querySelectorAll('.js-comment-button').forEach(button => {
		button.addEventListener('click', () => {
			viewCommentSection(button);
		});
	});
	// view all comments btn
	document.querySelectorAll('.js-viewall-comment-button').forEach(button => {
		button.addEventListener('click', () => {
			viewCommentSection(button);
		});
	});

	// share button
	document.querySelectorAll('.js-share-button').forEach(button => {
		button.addEventListener('click', () => {
			shareBtnFunction();
		});
	});

	// save button
	document.querySelectorAll('.js-save-button').forEach(button => {
		button.addEventListener('click', () => {
			saveBtnFunction(button);
		});
	});

	// more option button
	document.querySelectorAll('.js-more-options').forEach(button => {
		button.addEventListener('click', () => {
			moreOptionBtnFunction();
		});
	});

	// input element
	document.querySelectorAll('.js-comment-input').forEach(input => {
		input.addEventListener('keyup', () => {
			if (input.value) {
				input.nextElementSibling.style.display = 'initial';
			} else {
				input.nextElementSibling.style.display = 'none';
			}
		});
	});

	// comment post button
	document.querySelectorAll('.js-post-button').forEach(button => {
		button.addEventListener('click', () => {
			const input = button.previousElementSibling;
			const comment = input.value;
			const {id} = button.dataset;
			let matchingData = getMatchingCommentsData(id);

			matchingData.comments.push({
				username: 'aaaaaaaaaaldma',
				comment
			});

			input.value = '';
		});
	});

}
loadPage();
