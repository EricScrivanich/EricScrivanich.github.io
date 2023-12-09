let phoneNumbers = [];
const canvas = document.getElementById('gameCanvas');
const body = document.querySelector('body');
const numberDisplay = document.getElementById("values");
const ctx = canvas.getContext('2d');
        
canvas.width = 800;
canvas.height = 600;

const digits = [0,1,2,3,4,5,6,7,8,9];

let ballRadius = 10;
let numberSize = 50; 
let x = canvas.width / 2;
let y = canvas.height - ballRadius; 
let dx = 0;
let dy = 0;
let speed = 5;
let aiming = true;
let mouseX = 0;
let mouseY = 0;
let squares = []; 
let hitValues = [];
let amountOfTargets = 6;
let squareNumberValue = 0;
let amountOfTargetsHit = 0;
let correctIndexValue = 0;


document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    phoneNumbers = [];
    let PhoneNumber = document.getElementById('phoneNumber').value;

    let splitUpNumbers = PhoneNumber.split("");


    for(i = 0; i < splitUpNumbers.length; i++)
    {
        let x = splitUpNumbers[i];
       
        for(d = 0; d < digits.length; d++)
        {
            if(digits[d] == x)
            {
                phoneNumbers.push(x);
                break;
            }
        }
    }

    if (phoneNumbers.length != 10)
    {
        console.log(phoneNumbers.length)
        console.log("tooshort");
        let PhoneNumber = document.getElementById('phoneNumber').value;
        return;
    }

    document.getElementById('beforeSubmission').style.display = 'none';

    
    document.querySelector('.afterSubmission').style.display = 'block';
    body.style.backgroundColor = 'black';
    initializeSquares();
    draw();

    
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
                    checkAccuracy(square.value);
                    
        
                    // Additional actions based on the value can be added here
                }
            });
        }
        function checkAccuracy(value)
        {
            if (phoneNumbers[correctIndexValue] == value)
            {
                console.log("yaaayyy");
                
                correctIndexValue ++;
                drawHitValues();
                amountOfTargetsHit ++;
    
                if (amountOfTargetsHit >= amountOfTargets)
                {
                    console.log("nextLevel");
    
                }
            }
            else
            {
                numberDisplay.style.color = 'red';
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
            for (let i = 0; i < amountOfTargets; i++) {
                // let number = Math.floor(Math.random() * 10);
                number = phoneNumbers[squareNumberValue];
                squareNumberValue ++;
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
            ctx.fillStyle = "green";
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
           
            requestAnimationFrame(draw);
        }

        function restartGame() {
            // Reset ball position and state
            x = canvas.width / 2;
            y = canvas.height - ballRadius;
            dx = 0;
            dy = 0;
            aiming = true;
            amountOfTargetsHit = 0;
            correctIndexValue = 0;
            hitValues = []; // Clear hit values
            drawHitValues();
        
            // Clear existing squares and respawn them
            squares = [];
            squareNumberValue = 0; // Reset the square number value index
            initializeSquares();
        
            // Reset display color
            numberDisplay.style.color = 'initial'; // Reset the color of numberDisplay
        
            // Optionally reset other game states or variables as needed
        }
        

       
 
