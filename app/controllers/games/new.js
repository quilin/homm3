import E from 'ember';
import SyncPromise from 'homm3/extensions/sync-promise';

export default E.Controller.extend({
	selectedMap: function () {
		var result = null;
		this.get('model.maps.[]').forEach(function (m, i) {
			if (m.selected) {
				result = m;
			}
		});
		return result;
	}.property('model.maps.@each.selected'),

	massageData: function () {
		this.get('model.maps.[]').forEach(function (m, i) {
			m.set('index', i + 1);
			m.set('selected', false);
		});
	}.observes('model.maps.[]'),

	sortedByField: null,
	sortedByDirection: null,

	actions: {
		'orderMaps': function (filter) {
			if (this.get('sortedByField') === filter) {
				this.set('sortedByDirection', !this.get('sortedByDirection'));
			}
			this.set('sortedByField', filter);

			var maps = this.get('model.maps.[]').sortBy(filter);
			if (this.get('sortedByDirection')) {
				maps = maps.toArray().reverse();
			}
			this.set('model.maps', maps);
		},
		'selectMap': function (map) {
			this.get('model.maps.[]').forEach(function (m) {
				m.set('selected', m === map);
			});

			var _this = this;
			var playersToCreate = Array(this.get('selectedMap.players'));
			for (var i = 0; i < playersToCreate.length; ++i) {
				var color = Math.floor(255 * Math.random());
				playersToCreate[i] = this.store.createRecord('player', {
					color: 'rgb(' + color + ',' + color + ',' + color + ')'
				});
			}

			this.set('playersToCreate', E.A(playersToCreate));
		},
		'start': function () {
			var map = this.get('selectedMap');
			if (map === null) {
				return;
			}

			var game = this.get('model.game');
			game.set('map', map);
			game.set('created', new Date());

			var _this = this;
			SyncPromise({
				game: game.save(),
				board: this.get('model.board').save(),
				players: E.RSVP.Promise.all(this.get('playersToCreate.[]').map(function (p) { return p.save(); }))
			}).then(function (r) {
				r.game.set('board', r.board);
				r.game.save();

				r.board.set('game', r.game);
				r.board.get('players').pushObjects(r.players);
				r.board.save();

				r.players.forEach(function (p) {
					p.set('board', r.board);
					p.save();
				});

				_this.transitionToRoute('games.game', r.game.id);
			});
		}
	}
});