// sketch.js - purpose and description here
// Author: Jose Nadales
// Date: 2/162/24

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
let inputText = 'I am going to use this termporarily';

let fontSizeMax = 20;
let fontSizeMin = 10;
let spacing = 12; // line height
let kerning = 0.5; // between letters

let fontSizeStatic = false;
let blackAndWhite = false;

function preload() {
    // Load your .webp file
    img = loadImage('gojo.webp');
  }
  

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), 1500);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), 1500);
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    textFont('Times');
    textSize(10);
    textAlign(LEFT, CENTER);
    print(img.width + ' • ' + img.height);


}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(0);

    var x = 0;
    var y = 10;
    var counter = 0;

    while (y < height) {
        // translate position (display) to position (image)
        img.loadPixels();
        // get current color
        var imgX = round(map(x, 0, width, 0, img.width));
        var imgY = round(map(y, 0, height, 0, img.height));
        var c = color(img.get(imgX, imgY));
        var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

        push();
        translate(x, y);

        if (fontSizeStatic) {
        textSize(fontSizeMax);
        if (blackAndWhite) {
            fill(greyscale);
        } else {
            fill(c);
        }
        } else {
        // greyscale to fontsize
        var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
        fontSize = max(fontSize, 1);
        textSize(fontSize);
        if (blackAndWhite) {
            fill(0);
        } else {
            fill(c);
        }
        }

        var letter = inputText.charAt(counter);
        text(letter, 0, 0);
        var letterWidth = textWidth(letter) + kerning;
        // for the next letter ... x + letter width
        x += letterWidth;

        pop();

        // linebreaks
        if (x + letterWidth >= width) {
        x = 0;
        y += spacing;
        }

        counter++;
        if (counter >= inputText.length) {
        counter = 0;
        }
    }
    noLoop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  // change render mode
  if (key == '1') fontSizeStatic = !fontSizeStatic;
  // change color style
  if (key == '2') blackAndWhite = !blackAndWhite;
  print('fontSizeMin: ' + fontSizeMin + ', fontSizeMax: ' + fontSizeMax + ', fontSizeStatic: ' + fontSizeStatic + ', blackAndWhite: ' + blackAndWhite);
  loop();

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}