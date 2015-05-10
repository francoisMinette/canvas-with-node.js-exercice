/*
 *	Custom javascript file to read / write on the DOM elements and handle few events
 */

$(document).ready(function() {
		displayFields("rectangle");
});

/* Hide and display the good fields from form that are related to the shape */
function displayFields(shape) {
	$(".field").hide();
	$(".field." + shape).show();
}

/* This handles the sending ajax request with good parameters. Then it will refresh the img element src attribute*/
function displayImage(e)  {
	$.ajax({
		url: window.location.href,
		data: { 
			shape: $("#shape")[0].value,
			posX: $("#attributes #posX")[0].value,
			posY: $("#attributes #posY")[0].value,
			width: $("#attributes #width")[0].value, 
			height: $("#attributes #height")[0].value,
			scaleX: $("#attributes #scaleX")[0].value, 
			scaleY: $("#attributes #scaleY")[0].value,
			color: $("#attributes #color")[0].value.toLowerCase(),
			radius: $("#attributes #radius")[0].value,
			rotation : $("#attributes #rotation")[0].value
		}
	})
	.done(function(){
		var d = new Date();
		var tempSrc = $("#main-canvas")[0].src;
		
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
		$(targetToChange)[0].value = value.toFixed(0);
	else
		$(targetToChange)[0].value = value.toFixed(2);
}