const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
let overlayVisable = false;
let counter = 0;
let colorInterval;
let redBool = true;



const btn = document.querySelector('button');
const redOverlay = document.querySelector('.redOverlay');
const blueOverlay = document.querySelector('.blueOverlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', `pic2.jpg`, `pic3.jpg`, `pic4.jpg`, `pic5.jpg`];

for (let i = 0; i < images.length; i++)
{
    const newDiv = document.createElement('div');
    const newImage = document.createElement('img');
    newImage.setAttribute('src',images[i]);
    thumbBar.appendChild(newDiv);
    newDiv.appendChild(newImage);
    newImage.addEventListener(`click`,() => {
        displayedImage.src = newImage.src;
        
        ClearOverlay();
    });
   

}


btn.addEventListener(`click`,StartOverlay);

function StartOverlay()
{
    if (overlayVisable)
    {
        ClearOverlay();
    }
    else 
    {
        colorInterval = setInterval(Overlay,800);
        overlayVisable = true;
        btn.textContent = 'Stop';
    }
   
}
function ClearOverlay()
{
    clearInterval(colorInterval);
        
        blueOverlay.style.visibility = 'hidden';
        redOverlay.style.visibility = 'hidden';
        btn.textContent = 'Render';

        overlayVisable = false;

}

function Overlay()
{
    if (counter > 10)
    {
        clearInterval(colorInterval);
    }

    if (redBool)
    {
        blueOverlay.style.visibility = 'hidden';
        redOverlay.style.visibility = 'visible';
        redBool = false;
        

    }
    else 
    {
        
        redOverlay.style.visibility = 'hidden';
        blueOverlay.style.visibility = 'visible';
        redBool = true;

    }

}

