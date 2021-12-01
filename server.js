console.log("up and running");

let express = require("express"); //loaded express, provide file

let app = express(); //activate express

let port = process.env.PORT || 3000; //define port number

let server = app.listen(port); // the connection will happen in the port 3000

console.log("server is running on http://localhost:" + port);

app.use(express.static("public")); //the file in this folder will be static, so don't change when server is runninng

let serverSocket = require("socket.io"); //serveresocket is the name of the variable, load the socket library

let io = serverSocket(server); // input output, gestire incoming outcoming input, make it running on server

io.on("connection", newConnection);

function newConnection(newSocket) {
  console.log(newSocket.id);

  newSocket.on("mouse", mouseMessage); //new socket receiv a new mouse movement

  function mouseMessage(dataReceived) {
    console.log(dataReceived);
    newSocket.broadcast.emit("mouseBroadcast", dataReceived); //every time the mouse is moved the information in sent from client to server, the server take it and send it to all other client.
  }
}
