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

let bg;
let i = 0;
let rotationStopped = false;
let rotationStopTime;
let sound;
let second_sound;
let animationStarted = false;

function preload() {
  // Load your sound files in the preload function
  sound = loadSound('sound.wav');
  second_sound = loadSound("buildup.wav");
}

function setup() {

  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), 800, WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), 800, WEBGL);
  });
  // create an instance of the class
  myInstance = new MyClass(VALUE1, VALUE2);
  
  bg = loadImage("shpe.png");
  bg.resize(width, height);
  noStroke();
}

function mousePressed() {
  if (!animationStarted) {
    // Start the animation and play the first sound when the mouse is clicked
    rotationStopped = false;
    animationStarted = true;
    second_sound.play();
  }
}

function draw() {
  background(0);

  if (animationStarted) {
    // Your animation code here
    let numRowsToShow = floor(map(i, 0, height, 0, bg.height));

    for (let x = 0; x < bg.width; x += 20) {
      for (let y = 0; y < numRowsToShow; y += 20) {
        let c = bg.get(x, y);
        let b = brightness(c);
        b = map(b, 0, 255, 15, 5);
        fill(c);

        let scaleValue = map(y, 0, bg.height, -1, 1);

        push();
        translate(x - bg.width / 2 + 10, y - bg.height / 2 + 10); // Center the cubes
        if (!rotationStopped) {
          rotateY(radians(i * 2)); // Rotate each cube
        }
        scale(4, 4, scaleValue);
        box(b * 0.2, b * 0.2, b * 1.5); // Create a box with height based on brightness
        pop();
      }
    }

    i += 2;

    if (i > height) {
      if (!rotationStopped) {
        // Play the sound when the animation reaches the bottom
        sound.play();

        rotationStopTime = millis(); // Save the current time when the animation reaches the bottom
        rotationStopped = true;
      }

      // Wait for 3000 milliseconds (3 seconds) before restarting the rotation
      if (millis() - rotationStopTime > 3000) {
        rotationStopped = false;
        i = 0;
        animationStarted = false; // Reset the flag so the animation can start again on the next mouse click
      }
    }
  }
}
