let xOff = 0;
let yOff = 1;
let zOff = 2;
let userInput = "";
let impact = false;
let wordCount = 0;
let shapeType = true; // true for sphere, false for cube
let particles = []; // Array to hold falling particles

class Particle {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = -height / 2;
    this.z = random(-500, 500);
    this.size = random(20, 50);
    this.speed = random(1, 5);
  }

  update() {
    this.y += this.speed;
    // Remove particle if it goes beyond the canvas
    if (this.y - this.size > height / 2) {
      let index = particles.indexOf(this);
      particles.splice(index, 1);
    }
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    noFill();
    stroke(204, 153, 255); // Default color
    if (shapeType) {
      sphere(this.size);
    } else {
      rotateX(frameCount * 0.01);
      rotateY(frameCount * 0.01);
      box(this.size, this.size, this.size);
    }
    pop();
  }
}

function setup() {
  createCanvas(800, 800, WEBGL);
  textSize(18);

  let input = createInput();
  input.style('width', '200px');
  input.position((windowWidth - input.width) / 2, windowHeight / 2 - 10);
  
  let button = createButton('submit');
  button.position(input.x + input.width + 10, input.y);
  button.mousePressed(() => {
    userInput = input.value();
    wordCount = userInput.trim().split(/\s+/).length;
    impact = true;
    shapeType = !shapeType;
    input.value('');
  });

  let prompt = createDiv('What do you wish you had said?');
  prompt.position(input.x, input.y - 40);
  prompt.style('color', '#FFFFFF');
  prompt.style('text-align', 'center');
  prompt.style('width', '250px');
}

function draw() {
  background(0);
  
  fill(255);
  noStroke();
  text(userInput, -width / 2 + 10, -height / 2 + 20);
  
  noFill();
  stroke(204, 153, 255);
  translate(noise(xOff) * 100, noise(yOff) * height * 0.10, 0);
  rotateY(millis() / 10000);

  if (impact) {
    stroke(255, 0, 0); // Change shape color to red on impact
    if (shapeType) {
      sphere(300 + wordCount * 10); // Increase sphere size based on word count
    } else {
      // Draw cubes of varying sizes and colors
      cube(50 + wordCount * 10, 255, 0, 0);
      cube(75 + wordCount * 10, 255, 0, 0);
      cube(100 + wordCount * 10, 255, 0, 0);
      cube(150 + wordCount * 10, 255, 0, 0);
      cube(200 + wordCount * 10, 255, 0, 0);
      cube(275 + wordCount * 10, 255, 0, 0);
    }
    impact = false; // Reset impact after displaying
  } else {
    if (shapeType) {
      sphere(300); // Regular sphere size
    } else {
      cube(50, 255, 255, 255); // White
      cube(75, 204, 153, 255); // Purple
      cube(100, 255, 255, 255); // White
      cube(150, 204, 153, 255); // Purple
      cube(200, 255, 255, 255); // White
      cube(275, 204, 153, 255); // Purple
    }
  }

  // Manage particles
  if (frameCount % 60 == 0) { // Add a new particle every 60 frames
    particles.push(new Particle());
  }
  particles.forEach(particle => {
    particle.update();
    particle.display();
  });
  
  xOff += 0.001;
  yOff += 0.001;
  zOff += 0.001;
}

function cube(size, r, g, b) {
  push();
  noFill();
  stroke(r, g, b);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(size, size, size);
  pop();
}
