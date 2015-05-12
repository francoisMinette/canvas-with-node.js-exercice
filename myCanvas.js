/*
 * This file is where all the reading parameters from ajax request / drawing image in file will happen.
 */

var Canvas = require('canvas');
var fs = require('fs');

/* Public function which is called by server when new connexion or new request is received from client
	According to shape parameter it will redirect to related drawing function and then return buffer to server */
exports.draw = function(data, callback) {
	var buffer;
	switch(data.shape) {
		case"rectangle":
			drawRectangle(data, function(buf) {
				buffer = buf;
			});
			break;
		case "line":
			drawLine(data, function(buf) {
				buffer = buf;
			});
			break;
		case "ellipse":
			drawEllipse(data, function(buf) {
				buffer = buf;
			});
			break;
		default:
			drawEmpty(function(buf) {
				buffer = buf;
			});
	}
	callback(buffer);
};

/* Initialize canvas with white image color */
drawEmpty = function(callback) {
	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 700, 400);
	
	callback(canvas.toBuffer());
}

/* Initialize canvas with rectangle according to data */
drawRectangle = function(data, callback) {
	!data.width? width = 150: width = parseInt(data.width);
	!data.height? height = 150: height = parseInt(data.height);
	!data.posX? posX = 700/2 - width/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2 - height/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.rotation? rotation = 0: rotation = parseFloat(data.rotation);
	
	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = color;
	ctx.translate(posX + width/2, posY + height/2);
	ctx.rotate(rotation);
	ctx.translate(-posX - width/2, -posY - height/2);
	ctx.rect(posX, posY, width, height);
	ctx.save();
	ctx.fill();
	
	callback(canvas.toBuffer());
};

/* Initialize canvas with line according to data */
drawLine = function(data, callback) {
	!data.width? width = 150: width = parseInt(data.width);
	!data.posX? posX = 700/2  - width/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.rotation? rotation = 0: rotation = parseFloat(data.rotation);
	
	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = color;
	ctx.translate(posX + width/2, posY);
	ctx.rotate(rotation);
	ctx.translate(-posX - width/2, -posY);
	ctx.rect(posX, posY, width, 1);
	ctx.save();
	ctx.fill();
	
	callback(canvas.toBuffer());
};

/* Initialize canvas with ellipse according to data */
drawEllipse = function(data, callback) {
	!data.radius? radius = 75: radius = parseInt(data.radius);
	!data.posX? posX = 700/2: posX = parseInt(data.posX);
	!data.posY? posY = 400/2: posY = parseInt(data.posY);
	!data.color? color ="#000000": color ="#" + data.color;
	!data.scaleX? scaleX = 1: scaleX = parseFloat(data.scaleX);
	!data.scaleY? scaleY = 1: scaleY = parseFloat(data.scaleY);

	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	ctx.beginPath();
	ctx.translate(posX + radius/2*scaleX, posY + radius/2*scaleY);
	ctx.scale(scaleX, scaleY);
	ctx.translate(- posX - radius/2*scaleX, - posY - radius/2*scaleY);
	ctx.fillStyle = color;
	ctx.arc(posX, posY, radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	
	callback(canvas.toBuffer());
}