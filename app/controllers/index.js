import E from 'ember';

export default E.Controller.extend({
	actions: {
		'createTestMap': function () {
			var generateCells = function (x) {
				var rows = [];
				for (var i = 0; i < x; ++i) {
					var cells = [];
					for (var j = 0; j < x; ++j) {
						cells.push({
							passable: Math.random() > 0.3,
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