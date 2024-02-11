// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

let backgroundImage;

function preload() {
    // Load the Blender model (replace 'model.obj' with the path to your model file)
    myModel = loadModel('Sheep.obj', true);
    textureImg = loadImage('sheep_texture.png');
    backgroundImage = loadImage('grass.jpeg');
  }


// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), 1000, WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), 1000, WEBGL);
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;



}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(0); // Black background color

    image(backgroundImage, -825, -500, canvasContainer.width(), 1000);

    // Apply the texture
    texture(textureImg);

    // Rotate the model upright
    rotateX(PI); // Rotate around X-axis by 180 degrees to make it upright
    rotateY(HALF_PI); // Rotate around Y-axis by 90 degrees

    // Render the loaded model
    scale(1); // Scale the model
    model(myModel);

    // Draw green rectangle at the bottom
    fill(0, 255, 0); // Green fill color
    noStroke(); // No outline
    rectMode(CENTER);
    let rectHeight = 50; // Adjust height as needed
    rect(width / 2, height - rectHeight / 2, width, rectHeight); // Draw the rectangle at the bottom
}



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}