var game = function() {
	'use strict';

	var b2ContactListener = Box2D.Dynamics.b2ContactListener,
	    b2Settings = Box2D.Common.b2Settings,
	    b2Vec2 = Box2D.Common.Math.b2Vec2,
	    b2World = Box2D.Dynamics.b2World;

	var assets,
	    currentLevel,
	    destroyQueue = [],
	    gotoMenu,
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

	function collision(contact) {
		var aBody = contact.GetFixtureA().GetBody(),
		    bBody = contact.GetFixtureB().GetBody(),
		    aData = aBody.GetUserData(),
		    bData = bBody.GetUserData();

		if((!aData && !bData) || aData === conf.collision.friendly || bData === conf.collision.friendly) {
			return;
		}

		if(aData === conf.collision.trap || bData === conf.collision.trap) {
			initStage();
			return;
		}

		if(aData === conf.collision.character) {
			level.destroyCoin();
			destroyQueue.push(bBody);
			if(level.isCompleted()) {
				gotoNextLevel();
			}
			return;
		}

		if(bData === conf.collision.character) {
			level.destroyCoin();
			destroyQueue.push(bBody);
			if(level.isCompleted()) {
				gotoNextLevel();
			}
		}
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
		currentLevel++;
		if(currentLevel <= assets.levels.layers.length) {
			destroyStage();
			initStage();
			return;
		}
		exit();
	}

	function init(aLevel, aAssets, aStage, aGotoMenu) {
		currentLevel = aLevel;
		assets = aAssets;
		stage = aStage;
		gotoMenu = aGotoMenu;

		level.init(assets, stage);
		character.init(assets, stage);
		initStage();
		start();
	}

	function initStage() {
		var gravity2 = new b2Vec2(0, 0),
		    doSleep = true;
		world = new b2World(gravity2, doSleep);
		b2Settings.b2_velocityThreshold = conf.velocityThreshold;

		level.render(currentLevel, world);
		character.draw(world);

		var collisionListener = new b2ContactListener();
		collisionListener.BeginContact = collision;
		world.SetContactListener(collisionListener);
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