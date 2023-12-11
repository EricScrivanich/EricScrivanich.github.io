let phoneNumbers = [];
const canvas = document.getElementById("gameCanvas");
const body = document.querySelector("body");
const ctx = canvas.getContext("2d");
const numberDisplay = document.getElementById("values");
const error = document.getElementById("submissionError");


canvas.width = 800;
canvas.height = 600;

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let ballRadius = 14;
let numberSize = 50;

let ballX = canvas.width / 2;
let ballY = canvas.height - ballRadius;
let dx = 0;
let dy = 0;
let speed = 5;
let aiming = true;
let mouseX = 0;
let mouseY = 0;

let amountOfTargets = 2;
let squareNumberValue = 0;
let amountOfTargetsHit = 0;
let correctIndexValue = 0;

let squares = [];
let spikes = [];
let hitValues = [];

let positionX = [];
let positionY = [];
let spawnThreshold = 40;

let ready = true;

//Arrays For Level Difficulty
let lvl = 0;
let lvlAmountOfTargets = [6, 1, 2, 2, 3, 1];
let lvlAmountOfSpikes = [0, 1, 1];

document
  .getElementById("phoneForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    phoneNumbers = [];
    let PhoneNumber = document.getElementById("phoneNumber").value;

    let splitUpNumbers = PhoneNumber.split("");

    for (i = 0; i < splitUpNumbers.length; i++) {
      let x = splitUpNumbers[i];

      for (d = 0; d < digits.length; d++) {
        if (digits[d] == x) {
          phoneNumbers.push(x);
          break;
        }
      }
    }

    if (phoneNumbers.length < 10) {
      error.textContent = `Your number is too short, please add (${10 - phoneNumbers.length}) more numbers`
      return;
    }
     else if (phoneNumbers.length > 10) {
       error.textContent = `Your number is too long, please remove (${
         10 - phoneNumbers.length
       }) numbers`;
       return;
     }

    document.getElementById("beforeSubmission").style.display = "none";

    document.querySelector(".afterSubmission").style.display = "block";
    body.style.backgroundColor = "black";
    initializeSquares();
    initializeSpikes();

    draw();
  });


  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  });

  canvas.addEventListener("click", function () {
    if (aiming) {
      const angle = Math.atan2(mouseY - ballY, mouseX - ballX);
      dx = speed * Math.cos(angle);
      dy = speed * Math.sin(angle);
      aiming = false;
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      restartGame(); // Reload the game when space bar is pressed
    }
  });




class Number {
  constructor(x, y, size, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
  }

  square() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
  drawNumber() {
    ctx.font = "16px Arial"; // Adjust font size as needed
    ctx.fillStyle = "black"; // Font color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.value, this.x + this.size / 2, this.y + this.size / 2);
  }
}

class Spike {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  drawSpike() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = "red"; // Red color for these squares
    ctx.fill();
    ctx.closePath();
  }
}





function checkAccuracy(value) {
  if (phoneNumbers[correctIndexValue] == value) {
    console.log("yaaayyy");

    correctIndexValue++;
    drawHitValues();
    amountOfTargetsHit++;

    if (amountOfTargetsHit >= lvlAmountOfTargets[lvl]) {
      console.log("nextLevel");
      nextLevel();
    }
  } else {
    numberDisplay.style.color = "red";
    restartGame();
    console.log("wrong");
  }
}
function drawHitValues() {
  // if (numberDisplay.length > 0) {
  //     numberDisplay[0].textContent = "Hit Values: " + hitValues.join(", ");
  // }

  numberDisplay.textContent = hitValues;
}

function initializeSquares() {
  for (let i = 0; i < lvlAmountOfTargets[lvl]; i++) {
    // let number = Math.floor(Math.random() * 10);
    number = phoneNumbers[squareNumberValue];
    squareNumberValue++;
    let X = Math.floor(Math.random() * (canvas.width - numberSize));
    let Y = Math.floor(Math.random() * (canvas.height / 3));

    for (n = 0; n < positionX.length; n++) {
      if (Math.abs(positionX[n] - X) < spawnThreshold && Math.abs(positionY[n] - Y) < spawnThreshold) {
        console.log("overlap");
        console.log(number);
        console.log();
      }
    }

    positionX.push(X);
    positionY.push(Y);
    ready = true;
    squares.push(new Number(X, Y, numberSize, number));
  }
}

function initializeSpikes() {
  for (let i = 0; i < lvlAmountOfSpikes[lvl]; i++) {
    let x = Math.floor(Math.random() * (canvas.width - numberSize));
    let y = Math.floor(Math.random() * (canvas.height / 2));
    spikes.push(new Spike(x, y, numberSize));
  }
}

function drawSquares() {
  squares.forEach((square) => {
    square.square();
    square.drawNumber();
  });
}

function drawSpikes() {
  spikes.forEach((spike) => {
    spike.drawSpike();
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function drawDirectionLine() {
  if (aiming) {
    ctx.beginPath();
    ctx.moveTo(ballX, ballY);
    ctx.lineTo(mouseX, mouseY);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}

function updateBallPosition() {
  if (!aiming) {
    ballX += dx;
    ballY += dy;

    if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
      dx = -dx;
    }
    if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
      dy = -dy;
    }
  }
}


function checkCollision() {
  // Check collision with numbered squares
  squares.forEach((square, index) => {
    if (
      ballX + ballRadius > square.x &&
      ballX - ballRadius < square.x + square.size &&
      ballY + ballRadius > square.y &&
      ballY - ballRadius < square.y + square.size
    ) {
      // Collision detected with a numbered square
      console.log(
        "Collision with numbered square " +
          (index + 1) +
          ", value: " +
          square.value
      );
      squares.splice(index, 1); // Remove the square
      hitValues.push(square.value); // Add the value to hit values
      checkAccuracy(square.value); // Check if the value is accurate
    }
  });

  // Check collision with spikes
  spikes.forEach((spike, index) => {
    if (
      ballX + ballRadius > spike.x &&
      ballX - ballRadius < spike.x + spike.size &&
      ballY + ballRadius > spike.y &&
      ballY - ballRadius < spike.y + spike.size
    ) {
      // Collision detected with a spike
      console.log("Collision with a spike");
      spikes.splice(index, 1); // Remove the spike
      // Handle collision with a spike
      // For example, call restartGame() or another function
      restartGame(); // Assuming you want to restart the game when hitting a spike
    }
  });
}


function restartGame() {
  // Reset ball position and state
  ballX = canvas.width / 2;
  ballY = canvas.height - ballRadius;
  lvl = 0;
  dx = 0;
  dy = 0;
  aiming = true;
  amountOfTargetsHit = 0;

  correctIndexValue = 0;
  hitValues = []; // Clear hit values

  positionX = [];
  positionY = [];

  drawHitValues();

  // Clear existing squares and respawn them
  squares = [];
  squareNumberValue = 0; // Reset the square number value index
  initializeSquares();

  // Reset display color
  numberDisplay.style.color = "initial"; // Reset the color of numberDisplay

  // Optionally reset other game states or variables as needed
}

function nextLevel() {
  ballX = canvas.width / 2;
  ballY = canvas.height - ballRadius;
  lvl++;
  dx = 0;
  dy = 0;
  aiming = true;
  positionX = [];
  positionY = [];
  amountOfTargets = 3;
  amountOfTargetsHit = 0;
  initializeSquares();
  initializeSpikes();
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawDirectionLine();
  updateBallPosition();
  drawSquares();
  drawSpikes();
  checkCollision();

  requestAnimationFrame(draw);
}