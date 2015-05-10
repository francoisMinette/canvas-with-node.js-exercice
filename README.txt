1. Run in your shell where server.js is : 
node ./server.js
Howerver, you can specify a port number within the launching command such as :
node ./server.js 4040

2. Access your localhost:<port> any your browser. With the port used in command line above, url should be:
localhost:4040

3. You are now on the web application. What is there that you can do :
- Create either rectangle, line or ellipse. (Please notice that circle is an ellipse without rescaling)
- You can create only one element at time, if you have created a rectangle and then you change it to a line, the rectangle with disappear.
- All the attributes have a default value.
- Notice that image container is limited by 700px/400px dimensions.

4. Things to know
- This is the 1.0 version of this web application.
- Many things can be improved / changed : 
	- Instead if using file for the scene, there might be a way to write the stream directly to the page in a specific area.
	- Instead of entering X/Y position it might be better to use mouse click over the image container to place the object.
	- We might be able to avoid the submitting button for the ajax request but trigger it as soon as a value is changed (Would be more dynamic).
	- Instead of using ejs template with jQuery, it might be better to use angular.js
	- We can add mode features in the 2d scene (triangle, background color or image, drawing with the mouse pointer).
	- Create a myCanvas object that uses inheritance to make a more readable and generic code.
	
	NOTE :  I am note sure if all the points described above can be done with node.js these are just first thoughts about how to improving such applications
