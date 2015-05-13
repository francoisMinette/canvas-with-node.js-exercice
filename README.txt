1. Run in your shell where server.js is : 
node ./server.js
However, you can specify a port number within the launching command such as :
node ./server.js 4040

2. Access your localhost:<port> any your browser. With the port used in command line above, url should be:
localhost:4040

3. You are now on the web application. What is there that you can do :
- Create either rectangle, line or ellipse. (Please notice that circle is an ellipse without rescaling)
- You can create / remove many elements in the scene.
- All the attributes have a default value.
- Notice that image container is limited by 700px/400px dimensions.

4. Things to know
- This is the 2.0 version of this web application.
- What is changed from v1.0 :
	- Instead of using a file for the image that was written before by server and used by all clients after. Now we use socket and fill canvas.context with the data. Then we return the buffer which will be used by the client that sent the request.
	- We can now add many shapes to the scene
	- We can remove the last shape created. If you remove one then you will be able to remove the previous one again.
	- On client side I changed jQuery selector with document.querySelector which is faster.
	
- Other things that can be improved / changed : 
	- Instead of sending a big array of data to the server I tried to send the current buffer of the scene from client and then server would be able to use it to create new canvas and write new shape over it. 
	But I did not manage to make it work. There might be a way though, but then I would have to change the way to remove the previously created shapes.
	
	NOTE :  I am note sure if all the points described above can be done with node.js these are just first thoughts about how to improve such application
