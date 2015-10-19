import DS from 'ember-data';

export default DS.Model.extend({
	day: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),
	turn: DS.attr('number', {
		defaultValue: function () { return 0; }
	}),

	// map items that belongs to no one
	// in - when player is defeated (castles, mines and creature houses)
	// out - when player takes castle, mine, creature houses or neutral army
	armies: DS.hasMany('army'),
	castles: DS.hasMany('castle'),
	mines: DS.hasMany('mine'),

	game: DS.belongsTo('game'),
	map: DS.belongsTo('map'),
	players: DS.hasMany('player')
});