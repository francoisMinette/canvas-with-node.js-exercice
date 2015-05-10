/*
 * This file is where all the reading parameters from ajax request / drawing image in file will happen.
 */

var Canvas = require('canvas');
var fs = require('fs');

/* Public function that is called in server file when new connexion or new request is received
	According to shape parameter it will redirect to related drawing function */
exports.draw = function(data) {
	switch(data.shape) {
		case"rectangle":
			drawRectangle(data);
			break;
		case "line":
			drawLine(data);
			break;
		case "ellipse":
			drawEllipse(data);
			break;
		default:
			drawEmpty();
	}
};

/* Draw empty image with white color */
drawEmpty = function() {
	var canvas = new Canvas(700, 400);
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 700, 400);
	createImage(canvas, ctx);
}

/* Draw rectangle according to data */
drawRectangle = function(data) {
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
	
	createImage(canvas, ctx);
};

/* Draw line according to data */
drawLine = function(data) {
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
	
	createImage(canvas, ctx);
};

/* Draw ellipse according to data */
drawEllipse = function(data) {
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
	
	createImage(canvas, ctx);
}

/* write the stream within file which is used by template in index.ejs */
createImage = function(canvas, ctx) {
	var out = fs.createWriteStream(__dirname + '/public/img/scene.png')
	, stream = canvas.pngStream();

	stream.on('data', function(chunk) {
		out.write(chunk);
	});
	  
	stream.on('end', function() {
		console.log('saved png');
	});
};