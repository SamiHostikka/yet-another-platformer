var app = function() {
	'use strict';

	function gotoGame(level) {
		game.init(level, gotoState);
	}

	function gotoMenu() {
		menu.init(gotoGame);
	}

	function gotoState(success) {
		state.init(success, gotoMenu);
	}

	function init() {

	}

	return {
		init: init
	};
}();