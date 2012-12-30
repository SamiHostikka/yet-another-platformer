var character = function() {
	'use strict';

	var b2Vec2 = Box2D.Common.Math.b2Vec2;

	var assets,
	    body,
	    gravity,
	    stage,
	    walkLeft,
	    walkRight,
	    world;

	var KEYCODE_DOWN = 40,
	    KEYCODE_LEFT = 37,
	    KEYCODE_RIGHT = 39,
	    KEYCODE_UP = 38;

	function destroy() {
		removeEventListener('keydown', keyDown);
		removeEventListener('keyup', keyUp);
	}

	function draw(aWorld) {
		world = aWorld;
		walkLeft = walkRight = false;
		gravity = true;

		var height = conf.character.height / 2,
		    width = conf.character.width / 2,
		    x = assets.levels.tilewidth,
		    y = assets.levels.tileheight * (assets.levels.height - 2);

		assets.character.gotoAndStop('stand');
		assets.character.x = x;
		assets.character.y = y;
		assets.character.regX = width;
		assets.character.regY = height;
		stage.addChild(assets.character);

		body = helper.createBody(x, y, width, height, false, conf.collision.character, world);
	}

	function init(aAssets, aStage) {
		assets = aAssets;
		stage = aStage;

		addEventListener('keydown', keyDown);
		addEventListener('keyup', keyUp);
	}

	function keyDown(event) {
		event = (event) ? event : window.event;
		var keyCode = (event.which) ? event.which : event.keyCode;
		switch(keyCode){
			case KEYCODE_DOWN:
				gravity = true;
				break;
			case KEYCODE_LEFT:
				walkLeft = true;
				assets.character.gotoAndPlay((gravity) ? 'walkLeft' : 'walkTopLeft');
				break;
			case KEYCODE_RIGHT:
				walkRight = true;
				assets.character.gotoAndPlay((gravity) ? 'walkRight' : 'walkTopRight');
				break;
			case KEYCODE_UP:
				gravity = false;
				break;
		}
	}

	function keyUp(event) {
		event = (event) ? event : window.event;
		var keyCode = (event.which) ? event.which : event.keyCode;
		switch(keyCode){
			case KEYCODE_LEFT:
				walkLeft = false;
				break;
			case KEYCODE_RIGHT:
				walkRight = false;
				break;
		}
		assets.character.gotoAndStop((gravity) ? 'stand' : 'standTop');
	}

	function move() {
		var velocity = new b2Vec2(0, 0);
		if(walkRight) {
			velocity.x  = conf.velocity.x;
		}
		else if(walkLeft) {
			velocity.x  = -conf.velocity.x;
		}
		if(gravity) {
			velocity.y = conf.velocity.y;
		}
		else {
			velocity.y = -conf.velocity.y;
		}
		body.SetLinearVelocity(velocity);

		assets.character.x = body.GetWorldCenter().x * conf.scale;
		assets.character.y = body.GetWorldCenter().y * conf.scale;
	}

	return {
		destroy: destroy,
		draw: draw,
		init: init,
		move: move
	};
}();