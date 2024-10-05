let usersData = [{
	id: '1',
	profile: 'images/profile-pictures/439569681_1506351150225590_6884425732722025783_n.jpg',
	name: 'gotnocontext',
	userName: 'meme 🔌',
	isFavorited: false,
	isVerified: false,
	postCount: 1060,
	followers: '289K',
	following: 20,
	dateJoined: 'July 2023',
	accountBasedIn: 'United States'
}, {
	id: '2',
	profile: 'images/profile-pictures/376235112_856885885870151_5381045761512455911_n.jpg',
	userName: 'Space Club',
	name: 'spaceclub',
	isFavorited: false,
	isVerified: false,
	postCount: 1518,
	followers: '609K',
	following: 227,
	dateJoined: 'January 2017',
	accountBasedIn: 'Not Shared'
}, {
	id: '3',
	profile: 'images/profile-pictures/295452217_634946657631062_8329313819020271629_n.jpg',
	name: 'bugatti',
	userName: 'Bugatti',
	isFavorited: false,
	isVerified: true,
	postCount: 2186,
	followers: '23.9M',
	following: 277,
	dateJoined: 'July 2013',
	accountBasedIn: 'Not Shared'
}, {
	id: '4',
	profile: 'images/profile-pictures/435031363_1364445837602935_2491872393277349611_n.jpg',
	name: 'aaaaaaaaaaldma',
	userName: 'Aaaaaaaaaa',
	isFavorited: false,
	isVerified: false,
	postCount: 58,
	followers: '0',
	following: 13,
	dateJoined: 'July 2021',
	accountBasedIn: 'Philippines'
}];

export function getUsersData(userId) {
	let matchingUserData;

	usersData.forEach(data => {
		if (userId === data.id) {
			matchingUserData = data;
		}
	});

	return matchingUserData;
}

export function removeUsersData(id) {
	let newData = [];

	usersData.forEach(data => {
		if (data.id !== id) {
			newData.push(data);
		}
	});

	usersData = newData;
}