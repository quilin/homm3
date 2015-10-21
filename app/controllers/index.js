import E from 'ember';
import R from 'homm3/extensions/random-extensions';

export default E.Controller.extend({
	actions: {
		'createTestMap': function () {
			var generateCells = function (x) {
				var rows = [];
				for (var i = 0; i < x; ++i) {
					var cells = [];
					for (var j = 0; j < x; ++j) {
						cells.push({
							passable: R('bool', 0.7),
							terrain: Math.ceil(Math.random() * 4) / 4 + 1
						});
					}
					rows.push(cells);
				}
				return rows;
			};

			var _this = this;
			this.store.findAll('map').then(function (maps) {
				_this.store.createRecord('map', {
					name: 'Test Map ' + maps.get('length'),
					description: 'This is a test map made for some purposes',
					players: 2,
					size: 'S',

					cells: generateCells(32)
				}).save();
			});
		}
	}
});