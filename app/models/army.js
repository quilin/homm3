import DS from 'ember-data';

export default DS.Model.extend({
	player: DS.belongsTo('player'),
	hero: DS.belongsTo('hero')
});