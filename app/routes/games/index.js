import E from 'ember';

export default E.Route.extend({
	model: function () {
		return this.store.findAll('game');
	}
});