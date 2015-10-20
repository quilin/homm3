import E from 'ember';
import SyncPromise from 'homm3/extensions/sync-promise';

export default E.Controller.extend({
	currentPlayer: function () {
		var board = this.get('model.board');
		var players = board.get('players.[]');
		return players.objectAt(board.get('turn'));
	}.property('model.board.turn'),

	actions: {
		'save': function () {
			this.get('model.board').then(function (b) {
				b.save();
			});
		},

		'endTurn': function () {
			var _this = this;
			var board = _this.get('model.board');
			var players = _this.get('model.board.players.[]');
			if (board.get('turn') === players.get('length') - 1) {
				board.set('turn', 0);
				board.incrementProperty('day');
			} else {
				board.incrementProperty('turn');
			}
		}
	}
});
