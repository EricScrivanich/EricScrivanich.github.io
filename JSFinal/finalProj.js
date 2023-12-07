let phoneNumbers = [];
const canvas = document.getElementById('gameCanvas');
const numberDisplay = document.getElementsByClassName("values");
const ctx = canvas.getContext('2d');
        
canvas.width = 800;
canvas.height = 600;

let ballRadius = 10;
let numberSize = 50; // Size of squares
let x = canvas.width / 2;
let y = canvas.height - ballRadius; // Start the ball at the bottom of the canvas
let dx = 0;
let dy = 0;
let speed = 5;
let aiming = true;
let mouseX = 0;
let mouseY = 0;
let squares = []; // Array to hold squares
let hitValues = [];
let amountOfTargets = 3;
let targetNumber = 0;
let amountOfTargetsHit = 0;


document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let PhoneNumber = document.getElementById('phoneNumber').value;

    // Remove non-numeric characters
    PhoneNumber = PhoneNumber.replace(/\D/g, '');

    // Add the processed phone number to the list
    phoneNumbers.push(PhoneNumber);

    console.log("Processed Phone Number: " + PhoneNumber); 
    console.log("All Phone Numbers: " + phoneNumbers.join(", ")); // Log all stored phone numbers

    // Hide the phone number input form
    document.getElementById('phoneNumberInput').style.display = 'none';

    // Show the additional content and start the game
    document.querySelector('.afterSubmission').style.display = 'block';
    initializeSquares();
    draw();

    // Add your animation logic here before the game starts
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
                ctx.fillStyle = "red";
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
        function checkCollision() {
            squares.forEach((square, index) => {
                if (x + ballRadius > square.x && x - ballRadius < square.x + square.size &&
                    y + ballRadius > square.y && y - ballRadius < square.y + square.size) {
                    // Collision detected
                    console.log("Collision with square " + (index + 1) + ", value: " + square.value);
        
                    // Handle the collision (e.g., remove the square)
                    squares.splice(index, 1);
                    hitValues.push(square.value);
                    checkAmountHit();
                    
        
                    // Additional actions based on the value can be added here
                }
            });
        }
        function checkAmountHit()
        {
            amountOfTargetsHit ++;

            if (amountOfTargetsHit >= amountOfTargets)
            {
                console.log("nextLEvel");

            }
        }
        function drawHitValues() {
            
            if (numberDisplay.length > 0) {
                numberDisplay[0].textContent = "Hit Values: " + hitValues.join(", ");
            }
            
        }

        function initializeSquares() {
            for (let i = 0; i < amountOfTargets; i++) {
                // let number = Math.floor(Math.random() * 10);
                number = phoneNumbers[targetNumber];
                targetNumber ++;
                let x = Math.floor(Math.random() * (canvas.width - numberSize));
                let y = Math.floor(Math.random() * (canvas.height / 3));
                squares.push(new Number(x, y, numberSize, number));
            }
        }

        function drawSquares() {
            squares.forEach(square => {
                square.square();
                square.drawNumber();
            });
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawDirectionLine() {
            if (aiming) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = '#FF0000';
                ctx.stroke();
            }
        }

        function updateBallPosition() {
            if (!aiming) {
                x += dx;
                y += dy;

                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
                    dy = -dy;
                }
            }
        }

        canvas.addEventListener('mousemove', function(event) {
            const rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        });

        canvas.addEventListener('click', function() {
            if (aiming) {
                const angle = Math.atan2(mouseY - y, mouseX - x);
                dx = speed * Math.cos(angle);
                dy = speed * Math.sin(angle);
                aiming = false;
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                window.location.reload(); // Reload the game when space bar is pressed
            }
        });

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawDirectionLine();
            updateBallPosition();
            drawSquares();
            checkCollision();
            drawHitValues();
            requestAnimationFrame(draw);
        }

        // Initialize and start the game
        // initializeSquares();
        // draw();
 
