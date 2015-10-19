import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),

	level: DS.attr('number', function () { return 1; }),
	attack: DS.attr('number', function () { return 0; }),
	defence: DS.attr('number', function () { return 0; }),
	power: DS.attr('number', function () { return 0; }),
	knowledge: DS.attr('number', function () { return 0; }),

	player: DS.belongsTo('player'),
	army: DS.belongsTo('army')
});