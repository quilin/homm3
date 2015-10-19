import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	players: DS.attr('number'),
	size: DS.attr('string'),

	cells: DS.attr('raw'), // passability and terrain
	items: DS.attr('raw'), // castles/armies/artifacts/mines - all of it

	games: DS.hasMany('game')
});