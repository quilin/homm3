import E from 'ember';

export default function (model) {
	var promises = [];
	var keys = [];
	for (var key in model) {
		promises.push(model[key]);
		keys.push(key);
	}

	return new Ember.RSVP.Promise(function (resolve) {
		Ember.RSVP.Promise.all(promises)
			.then(function (values) {
				var result = {};
				for (var i = 0; i < values.length; ++i) {
					result[keys[i]] = values[i];
				}
				resolve(result);
			});
	});
};