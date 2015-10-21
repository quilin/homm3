import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	position: DS.attr('coordinates'),
	inCastle: DS.attr('boolean', {
		defaultValue: function () { return false; }
	}),

	level: DS.attr('number', {
		defaultValue: function () { return 1; }
	}),
	attack: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),
	defence: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),
	power: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),
	knowledge: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),

	player: DS.belongsTo('player'),
	army: DS.belongsTo('army')
});