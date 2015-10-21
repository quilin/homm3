import E from 'ember';

export default E.Component.extend({
	map: null,
	heroes: null,
	castles: null,

	mapSize: 1024,

	drawMap: function () {
		var canvas = this.$('.game-worldmap')[0];
		var ctx = canvas.getContext('2d');

		var mapRows = this.get('map.cells');
		var delta = this.get('mapSize') / mapRows.length;

		mapRows.forEach(function (row, i) {
			row.forEach(function (cell, j) {
				ctx.fillStyle = cell.passable ? '#ddf' : '#777';
				ctx.fillRect(j * delta, i * delta, delta, delta);
			});
		});

		this.get('heroes').forEach(function (h) {
			ctx.fillStyle = h.color;
			var position = h.data.get('position');
			ctx.fillRect(
				position.x * delta + 10,
				position.y * delta + 10,
				delta - 20,
				delta - 20);
		});

		this.get('castles').forEach(function (c) {
			ctx.fillStyle = c.color;
			var position = c.data.get('position');
			ctx.fillRect(
				position.x * delta + 5 - delta,
				position.y * delta + 5 - delta,
				delta * 3 - 10,
				delta * 2 - 10);
		});
		
		ctx.stroke();
	}.observes('heroes', 'castles'),

	didInsertElement: function () {
		this.drawMap();
	}

});