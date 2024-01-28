// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let circles = [];
let fireworks = [];
let gravity;
let nodeCount = 200;
let animationDuration = 60;
let clickX, clickY;
let waves = [];
let stars = [];

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when the method is called
  }
}

class Firework extends p5.Vector {
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

  attractFireworks(otherFireworks) {
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

class Wave {
  constructor() {
    this.amplitude = random(10, 100);
    this.period = random(100, 300);
    this.yOffset = random(TWO_PI);
  }

  update() {
    this.yOffset += 0.01;
  }

  display() {
    fill(0, 0, 255);
    noStroke();
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 20) {
      let y = this.amplitude * sin(TWO_PI * x / this.period + this.yOffset);
      vertex(x, height - 50 + y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function setup() {
  let canvasWidth = 1300;
  let canvasHeight = 1000;
  let canvas = createCanvas(canvasWidth, canvasHeight);

  canvasContainer = $("#canvas-container");
  canvas.parent("canvas-container");
  gravity = createVector(0, 0.2);

  $(window).resize(function () {
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });

  myInstance = new MyClass(VALUE1, VALUE2);

  var centerHorz = windowWidth / 2;
  var centerVert = windowHeight / 2;
}

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
      circles.splice(i, 1);
    }
  }

  // Update and draw fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let firework = fireworks[i];
    firework.attractFireworks(fireworks);
    firework.update();
    fill(firework.color);
    ellipse(firework.x, firework.y, 10, 10);

    // Decrease the lifespan
    firework.lifespan--;

    // Remove the firework if its lifespan is zero
    if (firework.lifespan <= 0) {
      fireworks.splice(i, 1);
    }
  }

  // Draw waves
  for (let i = 0; i < waves.length; i++) {
    waves[i].update();
    waves[i].display();
  }

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  // call a method on the instance
  myInstance.myMethod();
}

function mousePressed() {
  // Create a new circle at the mouse position
  let circle = {
    x: mouseX,
    y: mouseY,
    diameter: 30,
    color: color(random(255), random(255), random(255)),
    lifespan: 20,
  };

  // Push the circle first
  circles.push(circle);

  // Then create and push multiple fireworks
  for (let i = 0; i < 15; i++) {
    let firework = new Firework(
      mouseX + random(-20, 20),
      mouseY + random(-20, 20),
      circle.color
    );

    fireworks.push(firework);
  }

  // Set the click coordinates for the nodes animation
  clickX = mouseX;
  clickY = mouseY;
  animationDuration = 60; // Reset animation duration
}

function keyPressed() {
  if (key === 'W' || key === 'w') {
    waves.push(new Wave());
  }

  if (key === "E" || key === "e") {
    waves = [];
  }

  if (key === 'S' || key === 's') {
    stars.push(new Star());
  }
}
