var game = function() {
	'use strict';

	var b2Settings = Box2D.Common.b2Settings,
	    b2Vec2 = Box2D.Common.Math.b2Vec2,
	    b2World = Box2D.Dynamics.b2World;

	var assets,
	    destroyQueue = [],
	    gotoMenu,
	    level,
	    stage,
	    world;

	function clearStage() {
		for(var i = 0, max = destroyQueue.length; i < max; i++) {
			if(destroyQueue[i].GetUserData()) {
				stage.removeChild(destroyQueue[i].GetUserData());
				world.DestroyBody(destroyQueue[i]);
			}
		}
		destroyQueue = [];
	}

	function destroyStage() {
		stage.removeAllChildren();
		world = null;
	}

	function exit() {
		character.destroy();
		createjs.Ticker.removeAllListeners();
		destroyStage();

		gotoMenu();
	}

	function gotoNextLevel() {
		level++;
		if(level <= assets.levels.layers.length) {
			initStage();
			return;
		}
		exit();
	}

	function init(aLevel, aAssets, aStage, aGotoMenu) {
		level = aLevel;
		assets = aAssets;
		stage = aStage;
		gotoMenu = aGotoMenu;

		tilemap.init(assets, stage);
		character.init(assets, stage);
		initStage();
		start();
	}

	function initStage() {
		var gravity2 = new b2Vec2(0, 0),
		    doSleep = true;
		world = new b2World(gravity2, doSleep);
		b2Settings.b2_velocityThreshold = conf.velocityThreshold;

		tilemap.render(level, world);
		character.draw(world);
	}

	function start() {
		createjs.Ticker.setFPS(conf.fps);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.addListener(updateStage);
	}

	function updateStage() {
		clearStage();
		character.move();

		world.Step(conf.timestep, conf.velocityIterations, conf.positionIterations);
		world.DrawDebugData();
		world.ClearForces();

		stage.update();
	}

	return {
		init: init
	};
}();