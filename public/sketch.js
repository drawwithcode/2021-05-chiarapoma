let clientSocket = io(); //activate socket on server side

clientSocket.on("connect", newConnection);

clientSocket.on("mouseBroadcast", newBroadcast);

let myImage;

function preload() {
  myImage = loadImage("./assets/albero_neve.png"); // percorso per trovare file
  font0 = loadFont("assets/The Perfect Christmas.ttf");
  font1 = loadFont("assets/Poppins-Regular.ttf");
}

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);

  fill("orange");
  circle(data.x, data.y, 30);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(205, 230, 245);

  imageMode(CENTER); // posiziona dal centro dell'immagine
  image(
    myImage,
    width / 2, //posizione dell'immagine al centro
    height / 1.5
  );

  textFont(font0, 100);
  textAlign(CENTER);
  fill("red");
  //stroke(255);
  text("Decorate the Christmas tree", windowWidth / 2, 890);

  textFont(font1, 100);
  textSize(20);
  textAlign(CENTER);
  fill("grey");
  //stroke(255);
  text("click on the tree to start", windowWidth / 2, 950);
}

function draw() {
  fill("red");
}

function mouseClicked() {
  circle(mouseX, mouseY, 30);
  let message = {
    //object contain mouse positzion
    x: mouseX,
    y: mouseY,
  };
  clientSocket.emit("mouse", message); //send to the server calling it mouse
}
