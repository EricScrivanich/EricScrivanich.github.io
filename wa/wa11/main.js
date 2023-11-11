const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
let overlayVisable = false;



const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

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
        overlay.style.visibility = 'hidden';
        overlayVisable = false;
    });
   

}


btn.addEventListener(`click`,darken);

function darken()
{
    if (!overlayVisable)
    {
        overlay.style.visibility = 'visible';
        overlayVisable = true;

    }
    else
    {
        overlay.style.visibility = 'hidden';
        overlayVisable = false;
    }


    
}

