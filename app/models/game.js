import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	created: DS.attr('date'),

	map: DS.belongsTo('map'),
	board: DS.belongsTo('board')
});