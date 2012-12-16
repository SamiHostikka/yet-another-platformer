var menu = function() {
	'use strict';

	var gotoGame;

	function init(callback) {
		gotoGame = callback;
	}

	return {
		init: init
	};
}();