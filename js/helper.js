var helper = function() {
	'use strict';

	var b2Body = Box2D.Dynamics.b2Body,
	    b2BodyDef = Box2D.Dynamics.b2BodyDef,
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	    b2Vec2 = Box2D.Common.Math.b2Vec2;

	function createBody(aX, aY, aWidth, aHeight, aStatic, aUserData, aWorld) {
		var bodyDefinition = new b2BodyDef();
		bodyDefinition.type = (aStatic) ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
		bodyDefinition.position = new b2Vec2(aX / conf.scale, aY / conf.scale);
		bodyDefinition.userData = aUserData;
		if(!aStatic) {
			bodyDefinition.fixedRotation = true;
		}

		var fixtureDefinition = new b2FixtureDef();
		fixtureDefinition.restitution = conf.restitution;
		fixtureDefinition.shape = new b2PolygonShape;
		fixtureDefinition.shape.SetAsBox(aWidth / conf.scale, aHeight / conf.scale);

		var body = aWorld.CreateBody(bodyDefinition);
		body.CreateFixture(fixtureDefinition);

		return body;
	}

	function createText(aTxt, aSize, aX, aY) {
		var txt = new createjs.Text(aTxt, aSize + 'px sans-serif', '#333');
		txt.shadow = new createjs.Shadow('#fff', 0, 2, 0);
		txt.textAlign = 'center';
		txt.x = aX;
		txt.y = aY;
		return txt;
	}

	return {
		createBody: createBody,
		createText: createText
	};
}();