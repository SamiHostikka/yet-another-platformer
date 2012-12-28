var helper = function() {
	'use strict';

	var b2Body = Box2D.Dynamics.b2Body,
	    b2BodyDef = Box2D.Dynamics.b2BodyDef,
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	    b2Vec2 = Box2D.Common.Math.b2Vec2;

	function createBody(aX, aY, aWidth, aHeight, aRestitution, aStatic, aUserData, aWorld) {
		var bodyDefinition = new b2BodyDef();
		bodyDefinition.type = (aStatic) ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
		bodyDefinition.position = new b2Vec2(aX / conf.scale, aY / conf.scale);
		bodyDefinition.userData = aUserData;

		var fixtureDefinition = new b2FixtureDef();
		fixtureDefinition.shape = new b2PolygonShape;
		fixtureDefinition.restitution = aRestitution;
		fixtureDefinition.shape.SetAsBox(aWidth / conf.scale, aHeight / conf.scale);

		if(!aStatic) {
			bodyDefinition.fixedRotation = true;
			fixtureDefinition.density = conf.density;
			fixtureDefinition.friction = conf.friction;
		}

		var body = aWorld.CreateBody(bodyDefinition);
		body.CreateFixture(fixtureDefinition);

		return body;
	}

	return {
		createBody: createBody
	};
}();