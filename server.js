/*
 *	Server file which deal with server
 */

var Canvas = require('canvas');
var express = require('express');
var bodyParser = require('body-parser');
var myCanvas = require('./myCanvas');
	
var jsonParser = bodyParser.json();
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public" ) );

/* Receiving request from client . Can be simple connexion or ajax request with parameters*/
app.get('/', jsonParser, function(req, res) {
	res.render('index');
	myCanvas.draw(req.query);

	res.end();
});

/* Port  can be specified when server is launched or it will use 4000 by default*/
var port = parseInt(process.argv[2] || '4000', 10);
app.listen(port);
console.log('Test server listening on port %d', port);