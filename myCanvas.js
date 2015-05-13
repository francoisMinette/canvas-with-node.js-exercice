/*
 * This file is where we will read array of data and fill context with all the shapes in it. 
 * Then we return buffer.
 */

var Canvas = require('canvas');

/* Public function which is called by server when new connexion or new request is received from client
	According to data array and shape parameter it will redirect to related drawing function in a loop
	and then return buffer to server  once all data table is read*/
exports.draw = function(data, callback) {
	var buffer;
	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	for (var i = 0; i < data.length; i++) {
		ctx.beginPath();
		
		switch(data[i].shape) {
		case"rectangle":
			drawRectangle(data[i], ctx, function(ctx) {
				ctx = ctx;
			});
			break;
		case "line":
			drawLine(data[i], ctx, function(ctx) {
				ctx = ctx;
			});
			break;
		case "ellipse":
			drawEllipse(data[i], ctx, function(ctx) {
				ctx = ctx;
			});
			break;
		default:
			drawEmpty(ctx, function(ctx) {
				ctx = ctx;
			});
		}
		
		ctx.closePath();
		ctx.fill();
	}
	
	callback(canvas.toBuffer());
};

/* Add white rectangle to given context and return it */
drawEmpty = function(ctx, callback) {
	ctx.fillStyle = "white";
	ctx.rect(0, 0, 700, 400);
	
	callback(ctx);
}

/* Add custom rectangle according to data to given context and return it */
drawRectangle = function(data, ctx, callback) {
	!data.width? width = 150: width = parseInt(data.width);
	!data.height? height = 150: height = parseInt(data.height);
	!data.posX? posX = 700/2 - width/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2 - height/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.rotation? rotation = 0: rotation = parseFloat(data.rotation);
	
	ctx.translate(posX + width/2, posY + height/2);
	ctx.rotate(rotation);
	ctx.translate(-posX - width/2, -posY - height/2);
	ctx.fillStyle = color;
	ctx.rect(posX, posY, width, height);
	
	callback(ctx);
};

/* Add custom Line according to data to given context and return it */
drawLine = function(data, ctx, callback) {
	!data.width? width = 150: width = parseInt(data.width);
	!data.posX? posX = 700/2  - width/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.rotation? rotation = 0: rotation = parseFloat(data.rotation);
	
	ctx.translate(posX + width/2, posY);
	ctx.rotate(rotation);
	ctx.translate(-posX - width/2, -posY);
	ctx.fillStyle = color;
	ctx.rect(posX, posY, width, 1);
	
	callback(ctx);
};

/* Add custom circle / ellipse according to data to given context and return it  */
drawEllipse = function(data, ctx, callback) {
	!data.radius? radius = 75: radius = parseInt(data.radius);
	!data.posX? posX = 700/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.scaleX? scaleX = 1: scaleX = parseFloat(data.scaleX);
	!data.scaleY? scaleY = 1: scaleY = parseFloat(data.scaleY);
	
	ctx.translate(posX + radius/2*scaleX, posY + radius/2*scaleY);
	ctx.scale(scaleX, scaleY);
	ctx.translate(- posX - radius/2*scaleX, - posY - radius/2*scaleY);
	ctx.fillStyle = color;
	ctx.arc(posX, posY, radius, 0, Math.PI*2, true); 
	
	callback(ctx);
}