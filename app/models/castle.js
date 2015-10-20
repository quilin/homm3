import DS from 'ember-data';

export default DS.Model.extend({
	type: DS.attr('string'),
	position: DS.attr('coordinates'),

	player: DS.belongsTo('player'),
	heroes: DS.hasMany('hero'),
	armies: DS.hasMany('armies')
});