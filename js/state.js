var state = function() {
	'use strict';

	var gotoMenu;

	function init(success, callback) {
		gotoMenu = callback;
	}

	return {
		init: init
	};
}();