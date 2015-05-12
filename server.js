/*
 *	Server file which deal with server
 */
var Canvas = require('canvas');
var myCanvas = require('./myCanvas');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public" ) );

/* Receiving request from client accessing http://localhost:<PORT>*/
app.get('/', function(req, res) {
	res.render('index');
	
	io.sockets.on('connection', function (socket) {
		myCanvas.draw({}, function(buffer) {
			socket.emit('scene-response', { buffer: buffer });
		});
	});
	
	res.end();
});

/* If client send request for scene changing */
io.sockets.on('connection', function (socket) {
	socket.on('scene-request', function (data) {
		myCanvas.draw(data, function(buffer) {
			socket.emit('scene-response', { buffer: buffer });
		});
	});
});

/* Port  can be specified when server is launched or it will use 4000 by default*/
var port = parseInt(process.argv[2] || '4000', 10);
server.listen(port);
console.log('Test server listening on port %d', port);