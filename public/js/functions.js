/*
 *	Custom javascript file to read / write on the DOM elements and handle few events
 */

$(document).ready(function() {
		displayFields("rectangle");
});

/* Hide and display the good fields from form that are related to the shape */
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
	$.ajax({
		url: window.location.href,
		data: { 
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
		}
	})
	.done(function(){
		var d = new Date();
		var tempSrc = document.querySelector("#main-canvas").src;
		
		if (tempSrc.indexOf('?') >0 ) {
			tempSrc = tempSrc.substr(0, tempSrc.indexOf('?'));
		}
		
		setTimeout(function() {
			$("#main-canvas").attr("src", tempSrc + "?" + d.getTime());
		}, 50);
	});
}

/*  This changes the written value beside an input of type range when changed */
function updateTextValue(value, targetToChange) {
	if (value > 1)
		document.querySelector(targetToChange).value = value.toFixed(0);
	else
		document.querySelector(targetToChange).value = value.toFixed(2);
}