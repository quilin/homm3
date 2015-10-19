import E from 'ember';

export default function (promiseMap) {
	return new E.RSVP.Promise(function (res, rej) {
		var promises = [];
		var names = [];
		for (var promiseName in promiseMap) {
			names.push(promiseName);
			promises.push(promiseMap[promiseName]);
		}

		E.RSVP.Promise.all(promises).then(function (values) {
			var result = {};
			for (var i = 0; i < values.length; ++i) {
				result[names[i]] = values[i];
			}
			res(result);
		}, rej);
	});
};