export const commentsData = [{
	id: '0',
	comments: [{
		username: 'jacoblokietek_',
		comment: 'bro straightened his neck, stopped pushing out his core, and changed the lighting, wow so impressive'
	}, {
		username: 'mainlych3rry',
		comment: 'Did he went from iphone 13 to Iphone 11?'
	}, {
		username: 'lowbeat11',
		comment: 'No one gonna talk abt the tag'
	}, {
		username: 'ted_.bundt.pan_',
		comment: "I'm so confused"
	}]
}, {
	id: '1',
	comments: [{
		username: 'g4ybirey',
		comment: 'Cok guzel :)'
	}, {
		username: 'chulita_pie',
		comment: "it's like the skies mirror [] it has the reflection all over it []"
	}, {
		username: 'mahmud01970',
		comment: 'Probabliy, moon new moon is borning same hours always, is there regulation'
	}, {
		username: 'slyrsth73',
		comment: "So detailed you can see the were the dust settled from impact craters, and yet no landing sites..."
	}]
}, {
	id: '2',
	comments: [{
		username: 'bugatti',
		comment: 'BUGATTI is the center stage at Chantilly Arts & Elegance Richard Mille - a unique celebration of the art of living, automotive haute couture, and refinement set against the majestic backdrop of Chateau de Chantilly. Here, each detail, much like every BUGATTI crafted, tells a story.'
	}, {
		username: 'eddy5968_',
		comment: "Amazing"
	}, {
		username: 'pedalhappytaj',
		comment: 'Beautiful stories being told'
	}]
}, {
	id: '3',
	comments: [{
		username: 'fettyshane13',
		comment: 'Yeahh ima need slide 2-3 framed!'
	}, {
		username: 'thereflexartpatrick',
		comment: 'Les 24 H du Mans pour 2025 ? 2026 ?'
	}, {
		username: 'soul_999956',
		comment: '1 legend 1 beast'
	}, {
		username: 'sneakybruh_',
		comment: 'My favorite hypercar ever'
	}]
}, {
	id: '4',
	comments: []
}, {
	id: '5',
	comments: []
}, {
	id: '6',
	comments: []
}, {
	id: '7',
	comments: []
}, {
	id: '8',
	comments: []
}, {
	id: '9',
	comments: []
}, {
	id: '10',
	comments: []
}];

export function getMatchingCommentsData(id) {
	let matchingData;

	commentsData.forEach(data => {
		if (id === data.id) {
			matchingData = data;
		}
	});

	return matchingData;
}