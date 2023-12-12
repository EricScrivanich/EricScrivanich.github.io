let phoneNumbers = [];
const canvas = document.getElementById("gameCanvas");
const body = document.querySelector("body");
const ctx = canvas.getContext("2d");

const error = document.getElementById("submissionError");
const gif = document.querySelector(".gif");
const hacked = document.querySelector(".hacked");

canvas.width = 730;
canvas.height = 600;

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let ballRadius = 14;
const squareSize = 60;
const spikeSize = 45;

let ballX = canvas.width / 2;
let ballY = canvas.height - ballRadius;
let dx = 0;
let dy = 0;
let speed = 5;
let aiming = true;
let mouseX = 0;
let mouseY = 0;

const collisionMargin = 5;

let count;
const timer = document.getElementById("timer");
let repeat;

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
let spikeSpawnThreshold = 60;

let ready = true;

//Arrays For Level Difficulty
let lvl = 0;
const lvlAmountOfTargets = [1, 2, 1, 3, 3];
const lvlAmountOfSpikes = [0, 1, 3, 0, 3];

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
      error.textContent = `Your number is too short, please add (${
        10 - phoneNumbers.length
      }) more number(s).`;
      return;
    } else if (phoneNumbers.length > 10) {
      error.textContent = `Your number is too long, please remove (${
        phoneNumbers.length - 10
      }) number(s).`;
      return;
    }

    document.getElementById("beforeSubmission").style.display = "none";

    gif.style.display = "block";

    setTimeout(() => {
      gif.style.display = "none";
      body.style.backgroundColor = "black";
      hacked.style.display = "block";
      let formattedNumber = formatPhoneNumber(phoneNumbers.join(""));
      document.getElementById("values").textContent = formattedNumber;
      initializeSquares();
      initializeSpikes();
      showGame();
      countdown();
      

      draw();

     
    }, 0); 
  });



  function countdown() {
  clearInterval(repeat); // Clear any previous interval
  count = 15; // Set your desired countdown time
  timer.textContent = count;
  setTimeout(() => {
    repeat = setInterval(reduce, 1000); 
    
  }, 1500); 
   // Initialize timer display
  // Start
  }

  function reduce() {
    if (count > 0) {
      count--;
      timer.textContent = count;
    } else {
      restartGame();
      
    }
  }

  function resetFadeInAnimation() {
    const gameArea = document.querySelector(".afterSubmission");
    gameArea.classList.remove("animate-fadeIn");
    const hacked = document.querySelector(".hacked");
    hacked.classList.remove("animate-moveDown");
    void hacked.offsetWidth; // Trigger reflow
    hacked.classList.add("animate-moveDown");
     gameArea.classList.add("animate-fadeIn");
  }
  function showGame() 
  {
  setTimeout(() => {
    let gameArea = document.querySelector('.afterSubmission');
    let hacked = document.querySelector(".hacked");
    gameArea.style.display = 'block';
    gameArea.classList.add('animate-fadeIn');
    hacked.classList.add("animate-moveDown");

    // ... rest of your showGame function ...
  }, 500);
}
  

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
    correctIndexValue++;
    drawHitValues();
    updatePhoneNumberDisplay(correctIndexValue);
    amountOfTargetsHit++;

    if (amountOfTargetsHit >= lvlAmountOfTargets[lvl]) {
      console.log("nextLevel");
      nextLevel();
    }
  } 
  else {
    // numberDisplay.style.color = "red";
    restartGame();
    console.log("wrong");
  }
}

function formatPhoneNumber(number) {
  // Assuming a US phone number format: XXX-XXX-XXXX
  return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}
function drawHitValues() {
  // if (numberDisplay.length > 0) {
  //     numberDisplay[0].textContent = "Hit Values: " + hitValues.join(", ");
  // }
}

function updatePhoneNumberDisplay(correctDigits) {
  let display = document.getElementById("values");
  let displayText = display.textContent;
  let updatedText = "";
  let digitCount = 0;

  for (let i = 0; i < displayText.length; i++) {
    if (/\d/.test(displayText[i])) {
      // Check if the character is a digit
      if (digitCount < correctDigits) {
        updatedText += `<span style="color: white;">${displayText[i]}</span>`;
        digitCount++;
      } else {
        updatedText += displayText[i];
      }
    } else {
      updatedText += displayText[i]; // Non-digit characters
    }
  }

  display.innerHTML = updatedText;
}

function initializeSquares() {
  for (let i = 0; i < lvlAmountOfTargets[lvl]; i++) {
    // let number = Math.floor(Math.random() * 10);
    number = phoneNumbers[squareNumberValue];
    squareNumberValue++;
    let X, Y;
    let overlap;

    do {
      overlap = false;
      X = Math.floor(Math.random() * (canvas.width - squareSize));
      Y = Math.floor(Math.random() * (canvas.height / 3));

      for (n = 0; n < positionX.length; n++) {
        if (
          Math.abs(positionX[n] - X) < spawnThreshold &&
          Math.abs(positionY[n] - Y) < spawnThreshold
        ) {
          overlap = true;
          break;
        }
      }
    } while (overlap);

    positionX.push(X);
    positionY.push(Y);
    ready = true;
    squares.push(new Number(X, Y, squareSize, number));
  }
}

function initializeSpikes() {
  for (let i = 0; i < lvlAmountOfSpikes[lvl]; i++) {
    let X, Y;
    let overlap;

    do {
      overlap = false;
      X = Math.floor(Math.random() * (canvas.width - spikeSize));
      Y = Math.floor(Math.random() * (canvas.height / 2));

      for (let n = 0; n < positionX.length; n++) {
        if (
          Math.abs(positionX[n] - X) < spikeSpawnThreshold &&
          Math.abs(positionY[n] - Y) < spikeSpawnThreshold
        ) {
          overlap = true;
          break;
        }
      }
    } while (overlap);

    positionX.push(X);
    positionY.push(Y);
    spikes.push(new Spike(X, Y, spikeSize));
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
      ballX + ballRadius > spike.x + collisionMargin &&
      ballX - ballRadius < spike.x + spike.size - collisionMargin &&
      ballY + ballRadius > spike.y + collisionMargin &&
      ballY - ballRadius < spike.y + spike.size - collisionMargin
    ) {
      // Collision detected with a spike

      restartGame(); // Restart the game when hitting a spike
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
  let formattedNumber = formatPhoneNumber(phoneNumbers.join(""));
  document.getElementById("values").textContent = formattedNumber;
  amountOfTargetsHit = 0;

  correctIndexValue = 0;
  hitValues = []; // Clear hit values

  positionX = [];
  positionY = [];

  drawHitValues();

  // Clear existing squares and respawn them
  squares = [];
  spikes = [];
  squareNumberValue = 0; // Reset the square number value index
  initializeSquares();
  initializeSpikes();
  resetFadeInAnimation();
  countdown();

  // Reset display color
  // numberDisplay.style.color = "initial"; // Reset the color of numberDisplay

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
  spikes = [];
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
