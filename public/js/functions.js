/*
 *	Custom javascript file to read / write on the DOM elements and handle few events
 */
 
 $(document).ready(function() {
	displayFields("rectangle");	
});
 
var url = window.location.href;
var socket = io.connect(url);

/* Deal with server response regarding buffer for scene changing */
socket.on('scene-response', function(data) {
	var uint8Arr = new Uint8Array(data.buffer);
    var binary = '';
	
    for (var i = 0; i < uint8Arr.length; i++) {
        binary += String.fromCharCode(uint8Arr[i]);
    }
	
    var base64String = window.btoa(binary);
		$("#main-canvas").attr("src",  'data:image/png;base64,' + base64String);
});

/* Hide and display the good fields depending on the shape parameter */
function displayFields(shape) {
	list = document.querySelectorAll(".field");
	for (var i = 0; i < list.length; i++) {
		if (list[i].className.indexOf(shape) !== -1)
			list[i].style.display = 'block';
		else 
			list[i].style.display = 'none';
	}
}

/* This handles the sending ajax request with good parameters. Then it will refresh the img element src attribute*/
function displayImage(e)  {
	var data = { 
			shape: document.querySelector("#shape").value,
			posX: document.querySelector("#attributes #posX").value,
			posY: document.querySelector("#attributes #posY").value,
			width: document.querySelector("#attributes #width").value, 
			height: document.querySelector("#attributes #height").value,
			scaleX: document.querySelector("#attributes #scaleX").value, 
			scaleY: document.querySelector("#attributes #scaleY").value,
			color: document.querySelector("#attributes #color").value.toLowerCase(),
			radius: document.querySelector("#attributes #radius").value,
			rotation : document.querySelector("#attributes #rotation").value
		};
	
	socket.emit('scene-request', data);
}

/*  This changes the written value beside an input of type range when changed */
function updateTextValue(value, targetToChange) {
	if (value > 1)
		document.querySelector(targetToChange).value = value.toFixed(0);
	else
		document.querySelector(targetToChange).value = value.toFixed(2);
}