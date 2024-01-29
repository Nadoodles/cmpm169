// sketch.js - purpose and description here
// Author: Jose Nadales
// Date: 1/27/24

// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let canvasContainer;
let angle = 90;
let arts = [];
let maxArts = 20;
let lastSpawnFrame = 0;
let designChangeInterval = 5000; // Time interval in milliseconds to change the design
let lastDesignChangeTime = 0;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $(window).resize(function () {
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
}

function draw() {
    background(0);

    // Check if it's time to spawn a new shape
    if (frameCount - lastSpawnFrame >= 1 && arts.length < maxArts) {
        arts.push({
            x: random(width),
            y: random(height),
            angle: random(360),
            resizeFactor: random(0.5, 1.5),
            fillColor: color(random(255), random(255), random(255)), // Random color
        });
        lastSpawnFrame = frameCount;
    }

    // Check if it's time to change the design
    if (millis() - lastDesignChangeTime >= designChangeInterval) {
        changeDesign(); // Trigger design change
        lastDesignChangeTime = millis(); // Update the last design change time
    }

    for (let j = 0; j < arts.length; j++) {
        let currentArt = arts[j];

        push();
        translate(currentArt.x, currentArt.y);
        rotate(radians(currentArt.angle));

        // Draw the rotating lines with a different irregular pattern
        for (let i = 0; i < 360; i += 10 + random(10)) {
            rotate(radians(i));

            let length = 200 * currentArt.resizeFactor * (1 + 0.5 * sin(radians(frameCount * 2)));

            stroke(currentArt.fillColor);
            strokeWeight(3);
            line(length, 0, 0, length);
        }
        pop();
    }
}



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // Disperse lines outwards
    for (let j = 0; j < arts.length; j++) {
        let currentArt = arts[j];

        currentArt.angle += random(360); // Randomly change the initial angle
        currentArt.resizeFactor = random(0.5, 1.5); // Randomly change the resize factor
    }
}

// Function to change the design
function changeDesign() {
    // Clear the existing shapes
    arts = [];

    // Add your new design logic here
    // For example, draw random circles
    for (let i = 0; i < 10; i++) {
        let circleX = random(width);
        let circleY = random(height);
        let circleSize = random(50, 150);
        let circleColor = color(random(255), random(255), random(255));

        fill(circleColor);
        noStroke();
        ellipse(circleX, circleY, circleSize, circleSize);
    }
}
