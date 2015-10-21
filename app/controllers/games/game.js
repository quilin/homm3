import E from 'ember';
import SyncPromise from 'homm3/extensions/sync-promise';

export default E.Controller.extend({
	currentPlayer: function () {
		return this.get('model.board.players').objectAt(this.get('model.board.turn'));
	}.property('model.board.turn'),

	selectDefaultHero: function () {
		var heroes = E.A();
		this.get('model.board.players').forEach(function (player) {
			player.get('heroes').forEach(function (hero) {
				heroes.pushObject(hero);
			});
		});

		var currentPlayerId = this.get('currentPlayer.id');
		var currentPlayerHeroes = heroes.filter(function (hero) {
			return hero.get('player.id') == currentPlayerId;
		});

		var selectedHero = currentPlayerHeroes
			.filterBy('selected', true)
			.objectAt(0);
		if (selectedHero) {
			return;
		}

		var firstHero = currentPlayerHeroes.objectAt(0);
		if (firstHero) {
			firstHero.set('selected', true);
		}
	}.observes('model.board.turn', 'model.board.players.@each.heroes'),

	mapHeroes: function () {
		var result = E.A();
		this.get('model.board.players').forEach(function (player) {
			player.get('heroes').forEach(function (hero) {
				result.pushObject({ color: player.get('color'), data: hero });
			});
		});
		return result;
	}.property('model.board.players.@each.heroes.@each.position'),
	mapCastles: function () {
		var result = E.A();
		this.get('model.board.players').forEach(function (player) {
			player.get('castles').forEach(function (castle) {
				result.pushObject({ color: player.get('color'), data: castle });
			});
		});
		return result;
	}.property('model.board.players.@each.castles'),

	actions: {
		'selectHero': function (hero) {
			this.get('currentPlayer.heroes.[]').forEach(function (h) {
				h.set('selected', h === hero);
			});
		},

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
