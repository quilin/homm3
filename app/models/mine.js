import DS from 'ember-data';

export default DS.Model.extend({
	resource: DS.attr('string'),

	player: DS.belongsTo('player')
});