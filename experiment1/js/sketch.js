// sketch.js - purpose and description here
// Author: Jose Nadales
// Date: 1/15/24

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let particles = [];
let canvasContainer;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = random(20, 50); // Random diameter between 20 and 50 pixels
        this.color = color(random(255), random(255), random(255)); // Random color
        this.speedX = random(-2, 2); // Random horizontal speed
        this.speedY = random(-2, 2); // Random vertical speed
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width || this.x < 0) {
            this.speedX *= -1;
        }

        if (this.y > height || this.y < 0) {
            this.speedY *= -1;
        }
    }

    display() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function () {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyProjectClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(220);

    // Display and update each particle
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // Create a new particle at the mouse position
    let newParticle = new Particle(mouseX, mouseY);
    particles.push(newParticle);
}
