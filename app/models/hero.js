import DS from 'ember-data';

export default DS.Model.extend({
	level: DS.attr('number'),
	attack: DS.attr('number'),
	defence: DS.attr('number'),
	power: DS.attr('number'),
	knowledge: DS.attr('number'),

	player: DS.belongsTo('player'),
	army: DS.belongsTo('army')
});