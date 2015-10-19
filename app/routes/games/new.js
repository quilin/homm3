import E from 'ember';
import CM from 'homm3/extensions/composite-model';

export default E.Route.extend({
	model: function () {
		return CM({
			game: this.store.createRecord('game'),
			board: this.store.createRecord('board'),
			maps: this.store.findAll('map')
		});
	}
});