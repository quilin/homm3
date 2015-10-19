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
			} else {
				this.set('sortedByDirection', false);
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
		},
		'start': function () {
			var map = this.get('selectedMap');
			if (map === null) {
				return;
			}

			var game = this.get('model.game');
			game.set('map', map);
			game.set('created', new Date());

			var mapPlayersCount = map.get('players');
			var playersToCreate = [];
			var heroesToCreate = [];
			var castlesToCreate = [];
			var colors = ['red', 'blue', 'gray', 'green', 'orange', 'purple', 'teal', 'pink'];
			for (var i = 0, l = map.get('players'); i < l; ++i) {
				playersToCreate.push(this.store.createRecord('player', {
					color: colors[i]
				}).save());
				heroesToCreate.push(this.store.createRecord('hero', {
					name: 'Hero ' + colors[i]
				}).save());
				castlesToCreate.push(this.store.createRecord('castle', {
					type: 'Castle ' + colors[i]
				}).save());
			}

			var _this = this;
			SyncPromise({
				game: game.save(),
				board: this.get('model.board').save(),
				players: E.RSVP.Promise.all(playersToCreate),
				heroes: E.RSVP.Promise.all(heroesToCreate),
				castles: E.RSVP.Promise.all(castlesToCreate)
			}).then(function (r) {
				r.game.set('board', r.board);
				r.game.save();

				r.board.set('game', r.game);
				r.board.get('players').pushObjects(r.players);
				r.board.save();

				r.players.forEach(function (p) {
					p.set('board', r.board);
					p.get('heroes').pushObjects(r.heroes);
					p.get('castles').pushObjects(r.castles);
					p.save();
				});

				r.heroes.forEach(function (h, i) {
					h.set('player', r.players[i]);
				});
				r.castles.forEach(function (c, i) {
					c.set('player', r.players[i]);
				});

				_this.transitionToRoute('games.game', r.game.id);
			});
		}
	}
});