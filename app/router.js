import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

	this.route('games', function () {
		this.route('new');
		this.route('game', { path: '/:game_id' });
	});

});

export default Router;
