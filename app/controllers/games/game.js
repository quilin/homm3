import E from 'ember';

export default E.Controller.extend({
	player: function () {
		var board = this.get('model.board');
		var players = board.get('players.[]');
		return players.objectAt(board.get('turn'));
	}.property('model'),

	actions: {
		'endTurn': function () {
			var board = this.get('model.board');
			var players = board.get('players.[]');

			if (board.get('turn') === players.get('length') - 1) {
				board.set('turn', 0);
				board.incrementProperty('day');
			} else {
				board.incrementProperty('turn');
			}
			// todo: no save method for some reason :c
			board.save();

			var currentTurn = board.get('turn');
			this.setProperties({
				playerIndex: currentTurn,
				player: players.objectAt(currentTurn)
			});
		}
	}
});
