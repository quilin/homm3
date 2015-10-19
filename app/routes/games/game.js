import E from 'ember';

export default E.Route.extend({
	model: function (params) {
		return this.store.findRecord('game', params.game_id);
	}
});