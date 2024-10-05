import { fypData } from "../data/fyp-data.js";
import { getUsersData } from "../data/users-data.js";
import { 
	videoAutoPlay,
	checkPost,
	imageSlider,
	bouncyEffect,
	viewCommentSection,
	onDlClickPost,
	onClickLikeButton,
	onClickShareButton,
	onClickSaveButton,
	onClickMoreOptionButton,
	onClickEmojiButton,
	onClickPostButton,
	onClickSoundButton,
	likeCountFunction,
	tooltipMouseover,
	tooltipMouseleave,
	handleLikeIcon
} from "./home-page-functions/scripts.js";

export function loadPage() {
	let homeHTML = '';

	fypData.forEach((data) => {

		const usersData = getUsersData(data.usersId);
		if (!usersData) return;

		homeHTML += `
			<div class="video-container js-video-container-${data.id}">
				<div class="video-header">
					<div class="user-profile js-user-profile" data-id="${data.id}">
						<img src="${usersData.profile}" alt="Profile" class="js-user-image">
						<div class="user-profile-tooltip js-profile-tooltip-${data.id}">
							<div class="profile-tooltip-container">
								<div class="profile-tooltip">
									<img src="${usersData.profile}">
								</div>
								<div>
									<div class="tooltip-name">${usersData.name}
										<div>
											${usersData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
										</div>
									</div>
									<div class="tooltip-sub-name">${usersData.userName}</div>
								</div>
							</div>

							<div class="tooltip-pff">
								<div>
									<div class="tooltip-post-count">${usersData.postCount.toLocaleString()}</div>
									<div>posts</div>
								</div>
								<div>
									<div>${usersData.followers}</div>
									<div>followers</div>
								</div>
								<div>
									<div>${usersData.following}</div>
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
						<div class="username-container js-username-container">
							<div class="username js-username" data-id="${data.id}">${usersData.name}
								<div class="video-username-tooltip js-username-tooltip-${data.id}">
									<div class="profile-tooltip-container">
										<div class="profile-tooltip">
											<img src="${usersData.profile}">
										</div>
										<div>
											<div class="tooltip-name">${usersData.name}
												<div>
													${usersData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
												</div>
											</div>
											<div class="tooltip-sub-name">${usersData.userName}</div>
										</div>
									</div>

									<div class="tooltip-pff">
										<div>
											<div class="tooltip-post-count">${usersData.postCount.toLocaleString()}</div>
											<div>posts</div>
										</div>
										<div>
											<div>${usersData.followers}</div>
											<div>followers</div>
										</div>
										<div>
											<div>${usersData.following}</div>
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
								${usersData.isVerified ? '<svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>' : ''}
							</div>
						</div>
						<div>&#8226;</div>
						<time class="time">${data.timePosted}</time>
					</div>
					<div class="js-favorited-container-${data.id}">
						${usersData.isFavorited ? '<svg aria-label="Favorited" fill="url(#favorite_icon_gradient)" height="16" role="img" viewBox="0 0 24 24" width="16"><defs><linearGradient gradientUnits="userSpaceOnUse" id="favorite_icon_gradient" x1="11.0831" x2="20.5113" y1="20.7141" y2="4.71407"><stop stop-color="#FDCB5C"></stop><stop offset="1" stop-color="#D10869"></stop></linearGradient></defs><path d="M18.18 22.51a.99.99 0 01-.513-.142L12 18.975l-5.667 3.393a1 1 0 01-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 01.536-1.737l6.554-.855 2.668-5.755a1 1 0 011.814 0l2.668 5.755 6.554.855a.999.999 0 01.536 1.737l-4.876 4.347 1.37 6.544a1 1 0 01-.978 1.205z"></path></svg>' : ''}
					</div>
					<svg aria-label="More options" data-user-id="${usersData.id}" class="js-more-options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
				</div>

				<div class="video-image js-video-image">
					${checkPost(data)}
				</div>

				<div class="video-icons-container">
					<button class="like-button js-like-button js-like-btn-${data.id}" data-id="${data.id}">
						${handleLikeIcon(data.id)}
					</button>

					<button class="comment-button js-comment-button" data-id="${data.id}" data-user-id="${data.usersId}">
						<svg aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke-linejoin="round" stroke-width="2"></path></svg>
					</button>

					<button class="share-button js-share-button">
						<svg aria-label="Share" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>

					<button class="save-button js-save-button">
						<svg aria-label="Save" class="save-icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
					</button>

				</div>

				<div class="like-count-con">
					<div class="like-counts js-like-count js-like-counts-${data.id}" data-id="${data.id}">${data.likeCount.toLocaleString()} likes</div>
				</div>
				
				<div class="view-all-comments js-viewall-comment-button js-viewall-comment-${data.id}" data-id="${data.id}" data-user-id="${data.usersId}">
					View all ${data.commentCount} comments
				</div>

				<div class="comment-section">
					<input class="js-comment-input js-comment-input-${data.id}" placeholder="Add a comment...">
					<button class="comment-post-button js-post-button" data-id="${data.id}">Post</button>
					<span class="emojis-container">
						<svg aria-label="Emoji" data-id="${data.id}" class="emoji-icon js-emoji-button" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
					</span>
				</div>

			</div>
		`;
	});
	document.querySelector('.js-videos-images').innerHTML = homeHTML;

	videoAutoPlay();
	onClickSoundButton();
	
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
	document.querySelectorAll('.js-like-button').forEach(button => {
		button.addEventListener('click', () => {
			const {id} = button.dataset;
			const elem = document.querySelector(`.js-like-counts-${id}`);
			onClickLikeButton(button, elem);
			bouncyEffect(button);
		});

		button.addEventListener('mouseleave', () => {
			bouncyEffect(button);
		});
	});

	// when clicking the image/video twice the like icon appear
	document.querySelectorAll('.js-video-image img').forEach(img => {
		img.addEventListener('dblclick', () => {
			const {id} = img.dataset;
			const likeCount =	document.querySelector(`.js-like-counts-${id}`);
			const likeBtn = document.querySelector(`.js-like-btn-${id}`);
			onDlClickPost(img, likeCount, likeBtn);
		})
	});
	document.querySelectorAll('.js-video-image video').forEach(vid => {
		vid.addEventListener('dblclick', () => {
			const {id} = vid.dataset;
			const likeCount =	document.querySelector(`.js-like-counts-${id}`);
			const likeBtn = document.querySelector(`.js-like-btn-${id}`);
			onDlClickPost(vid, likeCount, likeBtn);
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
			onClickShareButton();
		});
	});

	// save button
	document.querySelectorAll('.js-save-button').forEach(button => {
		button.addEventListener('click', () => {
			onClickSaveButton(button);
		});
	});

	// more option button
	document.querySelectorAll('.js-more-options').forEach(button => {
		button.addEventListener('click', () => {
			const {userId} = button.dataset;
			onClickMoreOptionButton(userId);
		});
	});

	// input element
	document.querySelectorAll('.js-comment-input').forEach(input => {
		input.addEventListener('keyup', (event) => {
			const postButton = input.nextElementSibling;
			if (input.value) {
				postButton.style.display = 'initial';
			} else {
				postButton.style.display = 'none';
			}
			if (event.key === 'Enter') {
				onClickPostButton(postButton, input);
				postButton.style.display = 'none';
			}
		});
	});

	// comment post button
	document.querySelectorAll('.js-post-button').forEach(button => {
		button.addEventListener('click', () => {
			const input = button.previousElementSibling;
			onClickPostButton(button, input);
			button.style.display = 'none';
		});
	});

	// when you click the like counts the people who like will appear
	document.querySelectorAll('.js-like-count').forEach(likes => {
		likes.addEventListener('click', () => {
			const {id} = likes.dataset;
			likeCountFunction(id);
		});
	});

	/*
	  emoji button when clicked the emojis will appear and if the emojis are clicked
    it will appear/add in the text input
	*/
	document.querySelectorAll('.js-emoji-button').forEach(button => {
		button.addEventListener('click', () => {
			const {id} = button.dataset;
			const input = document.querySelector(`.js-comment-input-${id}`);
			onClickEmojiButton(button, input);
		});
	});


	// tooltip mouseover/mouseleave
	document.querySelectorAll('.js-user-profile').forEach(img => {
		img.addEventListener('mouseover', () => {
			const tooltip = document.querySelector(`.js-profile-tooltip-${img.dataset.id}`)
			tooltipMouseover(tooltip);
		});
		img.addEventListener('mouseleave', () => {
			const tooltip = document.querySelector(`.js-profile-tooltip-${img.dataset.id}`)
			tooltipMouseleave(tooltip);
		});
	});
	document.querySelectorAll('.js-username').forEach(name => {
		name.addEventListener('mouseover', () => {
			const tooltip = document.querySelector(`.js-username-tooltip-${name.dataset.id}`)
			tooltipMouseover(tooltip);
		});
		name.addEventListener('mouseleave', () => {
			const tooltip = document.querySelector(`.js-username-tooltip-${name.dataset.id}`);
			tooltipMouseleave(tooltip);
		});
	});
}
loadPage();
