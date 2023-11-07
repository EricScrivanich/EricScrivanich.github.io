
const btn = document.querySelector("button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded",() =>{
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
});

btn.addEventListener('click',draw);


function draw() {
    console.log(Math.random(.7).toFixed(1))

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = `rgba(${random(255)},${random(255)},${random(255)},1)`;

        ctx.fillRect(0,0,canvas.width,canvas.height)

    for (let i=0; i < 200; i++){
        ctx.beginPath();
        let choice = random(2);
        ctx.fillStyle = `rgba(${random(255)},${random(255)},${random(255)},${Math.random().toFixed(1)})`;
        
        if (choice === 0)
        {
            Circle();
        }
        else {
            Square();
        }
    }
    
        

    }

    function Circle()
    {
        
        ctx.arc (
            random(canvas.width),
            random(canvas.height),
            random(50),
            0,
            2 * Math.PI,
        );

        ctx.fill()

    }


    function Square()
    {

       
        ctx.fillRect(
            random(canvas.width),
            random(canvas.height),
            random(80),random(80));
            ctx.fill()
  
        
    }



function random(number) {
    return Math.floor(Math.random() * number);
}