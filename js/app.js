var app = function() {
	'use strict';

	var assets = {},
	    preloader,
	    stage;

	var MANIFEST = [
		{id: 'arrows', src: 'assets/arrows.png'},
		{id: 'character', src: 'assets/character.png'},
		{id: 'levels', src: 'assets/levels.json'},
		{id: 'tiles', src: 'assets/tiles.png'}
	];

	function gotoGame() {
		game.init(assets, stage);
	}

	function init() {
		var canvas = document.getElementById('canvas');
		conf.canvas.height = canvas.height;
		conf.canvas.width = canvas.width;

		stage = new createjs.Stage(canvas);
		stage.enableMouseOver();
		stage.snapPixelsEnabled = true;

		loadAssets();
	}

	function loadAssets() {
		var txt = helper.createText('Loading...', 32, conf.canvas.width / 2, conf.canvas.height / 2);
		stage.addChild(txt);
		stage.update();
		stage.removeChild(txt);

		preloader = new createjs.PreloadJS();
		preloader.onComplete = prepareAssets;
		preloader.loadManifest(MANIFEST);
	}

	function prepareAssets() {
		var id = 'arrows';
		spriteSheet = new createjs.SpriteSheet({
			animations: {
				left: [0],
				right: [1]			},
			images: [preloader.getResult(id).result],
			frames: {
				height: conf.arrowSize,
				width: conf.arrowSize
			}
		});
		assets[id] = new createjs.BitmapAnimation(spriteSheet);

		id = 'character';
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
				height: conf.character.height,
				width: conf.character.width
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

		gotoGame();
	}

	return {
		init: init
	};
}();