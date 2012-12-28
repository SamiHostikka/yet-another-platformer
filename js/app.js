var app = function() {
	'use strict';

	var assets = {},
	    canvasHeight,
	    canvasWidth,
	    preloader,
	    stage;

	var MANIFEST = [
		{id: 'character', src: 'assets/character.png'},
		{id: 'levels', src: 'assets/levels.json'},
		{id: 'tiles', src: 'assets/tiles.png'}
	];

	function gotoGame(aLevel) {
		game.init(aLevel, assets, canvasHeight, canvasWidth, stage, gotoMenu);
	}

	function gotoMenu() {
		menu.init(canvasHeight, canvasWidth, stage, gotoGame);
	}

	function init() {
		var canvas = document.getElementById('canvas');
		canvasHeight = canvas.height;
		canvasWidth = canvas.width;

		stage = new createjs.Stage(canvas);
		stage.snapPixelsEnabled = true;

		loadAssets();
	}

	function loadAssets() {
		var msg = new createjs.Text("Loading...", "24px sans-serif", "#333");
		msg.textAlign = "center";
		msg.x = canvasWidth / 2;
		msg.y = canvasHeight / 2;
		stage.addChild(msg);
		stage.update();
		stage.removeChild(msg);

		preloader = new createjs.PreloadJS();
		preloader.onComplete = prepareAssets;
		preloader.loadManifest(MANIFEST);
	}

	function prepareAssets() {
		var id = 'character';
		var spriteSheet = new createjs.SpriteSheet({
			animations: {
				stand: [0],
				walkRight: [0, 10],
				walkLeft: [11, 21],
				standTop: [22],
				walkTopRight: [22, 32],
				walkTopLeft: [33, 43]
			},
			images: [preloader.getResult(id).result],
			frames: {
				height: 96,
				width: 75
			}
		});
		assets[id] = new createjs.BitmapAnimation(spriteSheet);

		assets.levels = JSON.parse(preloader.getResult('levels').result);

		id = 'tiles';
		spriteSheet = new createjs.SpriteSheet({
			images: [preloader.getResult(id).result],
			frames: {
				height: 70,
				width: 70
			}
		});
		assets[id] = new createjs.BitmapAnimation(spriteSheet);

		gotoMenu();
	}

	return {
		init: init
	};
}();