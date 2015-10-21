var randomInt = function (range) {
	return Math.ceil(Math.random() * range);
};

var randomBool = function (prob) {
	return Math.random() < prob;
};

var randomPosition = function (r1, r2) {
	return {
		x: randomInt(r2 - r1) + r1,
		y: randomInt(r2 - r1) + r1
	};
};

var getRandomizer = function (type) {
	switch (type) {
		case 'int':
			return randomInt;
		case 'bool':
			return randomBool;
		case 'position':
			return randomPosition;
		default:
			return Math.random;
	}
};

var randomize = function (type, opts) {
	var randomizer = getRandomizer(type);
	return randomizer.apply(null, Array.prototype.slice.call(arguments, 1));
};

export default randomize;