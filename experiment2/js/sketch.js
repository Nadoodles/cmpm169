// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let circles = [];
let fireworks = []; // Renamed 'nodes' to 'fireworks'
let gravity;
let nodeCount = 200;
let animationDuration = 60; // Number of frames for the animation
let clickX, clickY;

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when the method is called
  }
}

class Firework extends p5.Vector { // Renamed 'Node' to 'Firework'
  constructor(x, y, color) {
    super(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 5));
    this.minDist = 20;
    this.color = color;
  }

  update() {
    this.vel.add(gravity);
    this.add(this.vel);
  }

  attractFireworks(otherFireworks) { // Renamed 'attractNodes' to 'attractFireworks'
    for (let otherFirework of otherFireworks) {
      if (otherFirework !== this) {
        let force = p5.Vector.sub(otherFirework, this);
        let d = force.mag();
        if (d > 0 && d < this.minDist) {
          force.normalize();
          force.div(d);
          this.vel.add(force);
        }
      }
    }
  }
}

// setup() function is called once when the program starts
function setup() {
  let canvasWidth = 1300;
  let canvasHeight = 1000;
  let canvas = createCanvas(canvasWidth, canvasHeight);

  canvasContainer = $("#canvas-container");
  canvas.parent("canvas-container");
  gravity = createVector(0, 0.2);

  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });

  myInstance = new MyClass(VALUE1, VALUE2);

  var centerHorz = windowWidth / 2;
  var centerVert = windowHeight / 2;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);

  // Draw circles
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);

    // Decrease the lifespan
    circle.lifespan--;

    // Remove the circle if its lifespan is zero
    if (circle.lifespan <= 0) {
      fireworks.push(new Firework(circle.x, circle.y, circle.color)); // Create a firework when circle's lifespan ends
      circles.splice(i, 1);
    }
  }

  // Update and draw fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let firework = fireworks[i];
    firework.attractFireworks(fireworks); // Attract other fireworks to this firework
    firework.update();
    ellipse(firework.x, firework.y, 10, 10);

    // Decrease the lifespan
    firework.lifespan--;

    // Remove the firework if its lifespan is zero
    if (firework.lifespan <= 0) {
      fireworks.splice(i, 1);
    }
  }

  // call a method on the instance
  myInstance.myMethod();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // Create a new circle at the mouse position
  let circle = {
    x: mouseX,
    y: mouseY,
    diameter: 50,
    color: color(random(255), random(255), random(255)),
    lifespan: 100,
  };

  circles.push(circle);

  // Set the click coordinates for the nodes animation
  clickX = mouseX;
  clickY = mouseY;
  animationDuration = 60; // Reset animation duration
}
