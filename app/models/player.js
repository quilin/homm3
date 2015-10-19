import DS from 'ember-data';

export default DS.Model.extend({
	color: DS.attr('string'),
	resources: DS.attr('raw'),

	board: DS.belongsTo('board'),

	// board items that belong to player
	heroes: DS.hasMany('hero'),
	castles: DS.hasMany('castle'),
	mines: DS.hasMany('mine')
	// todo: creature houses
});