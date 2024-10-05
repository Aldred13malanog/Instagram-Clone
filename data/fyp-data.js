export let fypData = [{
	id: '1',
	usersId: '1',
	timePosted: '5d',
	post: 'images/456036016_17908906671005216_2301621398217315790_n.jpg',
	typePost: 'image',
	isLiked: false,
	likeCount: 4088,
	commentCount: 37,
}, {
	id: '2',
	usersId: '2',
	timePosted: '5d',
	post: [
		'images/456280243_18323906743149200_7573442816776639681_n.jpg',
		'images/456300845_18323906755149200_8017102237953669691_n.jpg',
		'images/moon3.jpg'
	],
	index: 0,
	typePost: 'images',
	isLiked: false,
	likeCount: 10722,
	commentCount: 46,
}, {
	id: '3',
	usersId: '3',
	timePosted: '2d',
	post: 'images/bugatti1.jpg',
	typePost: 'image',
	isLiked: false,
	
	likeCount: 232486,
	commentCount: 14,
	
}, {
	id: '4',
	usersId: '3',
	timePosted: 'August 16',
	post: [
		'images/b2.jpg',
		'images/b3.jpg',
		'images/b4.jpg',
		'images/b5.jpg',
		'images/b6.jpg',
		'images/b7.jpg',
	],
	index: 0,
	typePost: 'images',
	isLiked: false,
	likeCount: 479720,
	commentCount: 23,
}, {
	id: '5',
	usersId: '4',
	timePosted: 'June 29',
	post: 'videos/2ef708320cadd722a62209f426ec2bb0.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '6',
	usersId: '4',
	timePosted: 'June 14',
	post: [
		'images/Snaptik.app_736833265708151936611.jpg',
		'images/Snaptik.app_736833265708151936613.jpg',
		'images/Snaptik.app_736833265708151936615.jpg',
		'images/Snaptik.app_736833265708151936617.jpg',
		'images/Snaptik.app_73683326570815193665.jpg',
		'images/Snaptik.app_73683326570815193667.jpg',
		'images/Snaptik.app_73683326570815193669.jpg'
	],
	index: 0,
	typePost: 'images',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '7',
	usersId: '4',
	timePosted: 'June 14',
	post: 'videos/Snaptik.app_7356131429182410000.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '8',
	usersId: '4',
	timePosted: 'June 14',
	post: 'videos/Snaptik.app_7193141068131552538.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '9',
	usersId: '4',
	timePosted: 'June 14',
	post: 'videos/Snaptik.app_7342079688350633221.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '10',
	usersId: '4',
	timePosted: 'June 14',
	post: 'videos/Snaptik.app_7343949051953466630.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}, {
	id: '11',
	usersId: '4',
	timePosted: 'June 14',
	post: 'videos/Snaptik.app_7346646673009003822.mp4',
	typePost: 'video',
	isLiked: false,
	likeCount: 4088,
	commentCount: 9,
}]; 

export function getMatchingData(id) {
	let matchingData;

	fypData.forEach(data => {
		if (id === data.id) {
			matchingData = data;
		};
	});

	return matchingData;
}