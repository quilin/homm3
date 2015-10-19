import E from 'ember';

export default E.Component.extend({
	map: null,
	mapSize: 200,

	didInsertElement: function () {
		var canvas = this.$('.game-minimap')[0];
		var ctx = canvas.getContext('2d');
		var mapRows = this.get('map.cells');
		var delta = this.get('mapSize') / mapRows.length;
		for (var i = 0; i < mapRows.length; ++i) {
			for (var j = 0; j < mapRows[i].length; ++j) {
				ctx.fillStyle = mapRows[i][j].passable ? '#5a5' : '#a55' ;
				ctx.fillRect(j * delta, i * delta, delta, delta);
			}
		}
		ctx.stroke();
	}
});