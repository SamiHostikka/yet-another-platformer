var game = function() {
	'use strict';

	var gotoState;

	function init(level, callback) {
		gotoState = callback;
	}

	return {
		init: init
	};
}();