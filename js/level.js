var level = function() {
	'use strict';

	var assets,
	    coins,
	    stage;

	function createWalls(aWorld) {
		// bottom
		helper.createBody(0, conf.canvas.height, conf.canvas.width, 1, conf.restitution, true, conf.collision.friendly, aWorld);
		// left
		helper.createBody(0, 0, 1, conf.canvas.height, conf.restitution, true, conf.collision.friendly, aWorld);
		// right
		helper.createBody(conf.canvas.width, 0, 1, conf.canvas.height, conf.restitution, true, conf.collision.friendly, aWorld);
		// top
		helper.createBody(0, 0, conf.canvas.width, 1, conf.restitution, true, conf.collision.friendly, aWorld);
	}

	function destroyCoin() {
		coins--;
	}

	function init(aAssets, aStage) {
		assets = aAssets;
		stage = aStage;
	}

	function isCompleted() {
		return coins === 0;
	}

	function render(aLevel, aWorld) {
		createWalls(aWorld);

		var map = assets.levels.layers[aLevel -1],
		    width = assets.levels.tilewidth / 2,
		    height = assets.levels.tileheight / 2;

		coins = 0;
		for (var y = 0; y < map.height; y++) {
			for (var x = 0; x < map.width; x++) {
				drawTile(map.data[x + y * map.width], x , y, width, height, aWorld);
			}
		}
	}

	function drawTile(aTile, aX, aY, aWidth, aHeight, aWorld) {
		if(aTile < 1) {
			return;
		}

		var restitution = conf.restitution,
		    tile = assets.tiles.clone(),
		    userData,
		    x = aX * assets.levels.tilewidth + aWidth,
		    y = aY * assets.levels.tileheight + aHeight;

		tile.gotoAndStop(aTile -1);
		tile.x = x;
		tile.y = y;
		tile.regX = aWidth;
		tile.regY = aHeight;
		stage.addChild(tile);

		if(aTile > 8) {
			return;
		}

		switch(aTile){
			// ground
			case 1:
			case 3:
			case 4:
			case 5:
				userData = conf.collision.friendly;
				break;
			// coin
			case 2:
				coins++;
				aWidth /= 2;
				aHeight /= 2;
				restitution = 0;
				userData = tile;
				break;
			// top spikes
			case 6:
				aHeight /= 2;
				y -= aHeight;
				userData = conf.collision.trap;
				break;
			// bottom spikes
			case 7:
				aHeight /= 2;
				y += aHeight;
				userData = conf.collision.trap;
				break;
			// water
			case 8:
				y += aHeight * 0.35;
				aHeight *= 0.65;
				userData = conf.collision.trap;
				break;
		}
		helper.createBody(x, y, aWidth, aHeight, restitution, true, userData, aWorld);
	}

	return {
		destroyCoin: destroyCoin,
		init: init,
		isCompleted: isCompleted,
		render: render
	};
}();