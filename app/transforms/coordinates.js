import DS from 'ember-data';

export default DS.Transform.extend({
	deserialize: function (serialized) {
		var data = serialized.split(',').map(function (n) { return +n; });
		return { x: data[0], y: data[1] };
	},
	serialize: function (deserialized) {
		return [deserialized.x, deserialized.y].join(',');
	}
});