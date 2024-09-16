// check post fun
export function checkPost(data) {
	if (data.typePost === 'image') {
		return `
			<div class="img-con">
				<img src="${data.post}">
				<div class="image-like js-image-like">
					<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
				</div>
			</div>
		`;
	}
	if (data.typePost === 'video') {
		return `
			<div class="vid-con">
				<video src="${data.post}" class="js-video-${data.id}"></video>
				<div class="image-like js-image-like">
					<svg aria-label="Unlike" fill="currentColor" role="img" viewBox="0 0 48 48"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
				</div>
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
			const video = prevSib.children[0];
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
let currentIndex = 0;
let id;
export function imageSlider(button) {
	const imgId = button.dataset.id;
	let images;
	let slides;

	if (button.textContent == '❮') {
		const nextSib = button.nextElementSibling;
		images = button.previousElementSibling;
		slides = images.children.length;

		if (id !== imgId) {
			currentIndex = 0;
		}

		id = imgId;
		
		currentIndex--;
		if (currentIndex === 0) {
			button.classList.add('inactive');
		}
		if (currentIndex < slides - 1) {
			nextSib.classList.remove('inactive');
		}
	}

	if (button.textContent == '❯') {
		const prevElemSib = button.previousElementSibling;			
		images = prevElemSib.previousElementSibling;
		slides = images.children.length;

		if (id !== imgId) {
			currentIndex = 0;
		}
		
		id = imgId;

		currentIndex++;
		if (currentIndex > 0) {
			prevElemSib.classList.remove('inactive');
		}
		if (currentIndex === slides - 1) {
			button.classList.add('inactive');
		}
	}

	images.style.transform = `translateX(${-currentIndex * (100 / slides)}%)`;
}

// img/vid like
let count = 0;
let timeoutId;
export function imgVidLike(elem) {
	const parentElem = elem.parentElement; 
	const imglike = parentElem.children[1];
	clearTimeout(timeoutId);
	count++;

	if (count === 2) {
		imglike.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(-20deg)';
		setTimeout(() => {
			imglike.style.transform = 'translate(-50%, -50%)';
		}, 250);
		setTimeout(() => {
			imglike.style.transform = 'translate(-50%, -50%) scale(0)';
		}, 700);
	}
	timeoutId = setTimeout(() => {
		count = 0;
	}, 500);
}

// bouncy effect
export function bouncyEffect(elem) {
	elem.style.transition = 'transform 0.15s ease'; // Start transition
	elem.style.transform = 'scale(1.2)'; // Scale up on unhover
	
	setTimeout(() => {
		elem.style.transform = 'scale(1)'; // Bounce back to original size
	}, 100); // Delay to bounce back after scaling up
}