export const peopleWhoLikeData = [{
	id: '1',
	users: [{
		username: 'beaner.faggit',
		name: 'weird thing'
	}, {
		username: 'zodiyak777',
		name: 'Ben'
	}, {
		username: 'deadpoolmakesmewetandsticky_',
		name: ''
	}, {
		username: 'ihate.walmart',
		name: 'Ezekiel'
	}, {
		username: 'henryschwerin',
		name: 'Henry Schwerin'
	}, {
		username: 'cjaguy2002',
		name: 'Cameron Antone'
	}, {
		username: 'loowitrail',
		name: 'Mason'
	}, {
		username: 'joseph.chm',
		name: 'yosef'
	}, {
		username: 'sjacqus3s',
		name: 'livv'
	}, {
		username: 'ye.ah6398',
		name: 'Sam J'
	}, {
		username: 'charlesthewu',
		name: 'Charles Wu'
	}, {
		username: 'jamestooshifty',
		name: 'james'
	}, {
		username: 'maddox_____jones',
		name: 'Maddox'
	}, {
		username: 'gabrielfdz_0',
		name: 'Ing. A. Turrona'
	}]
}, {
	id: '2',
	users: []
}, {
	id: '3',
	users: []
}, {
	id: '4',
	users: []
}, {
	id: '5',
	users: []
}, {
	id: '6',
	users: []
}, {
	id: '7',
	users: []
}, {
	id: '8',
	users: []
}, {
	id: '9',
	users: []
}, {
	id: '10',
	users: []
}, {
	id: '11',
	users: []
}, {
	id: '12',
	users: []
}];

export function getMatchingLikedData(id) {
	let matchingData;

	peopleWhoLikeData.forEach(data => {
		if (id === data.id) {
			matchingData = data;
		};
	});

	return matchingData;
}