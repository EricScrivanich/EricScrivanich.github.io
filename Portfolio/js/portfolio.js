const originalTitleWidth = 450;


const headerImage = document.querySelector(".header-image");



let finalWidth = originalTitleWidth;


headerImage.style.width = `${originalTitleWidth}px`;




document.addEventListener("DOMContentLoaded", function () {
  let currentImageIndex = 0;
  const images = document.querySelectorAll(".gallery-image");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const scrollTime = 9;


 
  let count;

  function showImage(index) {
    images.forEach((img, idx) => {
      img.style.opacity = idx === index ? "1" : "0";
    });
  }

  function NextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
    count = scrollTime; // Reset the countdown for automatic transition
  }

  function PreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
    count = scrollTime; // Reset the countdown for automatic transition
  }

  nextButton.addEventListener("click", NextImage);
  prevButton.addEventListener("click", PreviousImage);

  showImage(currentImageIndex); // Show the first image initially

  function DoCountdown() {
    count = scrollTime;
    let repeat = setInterval(reduce, 1000);
  }

  function reduce() {
    if (count > 0) {
      count--;
    } else {
      NextImage();
    }
  }

  DoCountdown(); // Start the countdown for automatic transition
});

// window.addEventListener("scroll", function () {
//   const scrollPosition = window.scrollY;

//   if (scrollPosition > 50) {
//     if (scrollPosition > 50 &&  finalWidth >= 200) {
//       let newWidth = originalTitleWidth  - ((scrollPosition - 50) *2);
//        headerImage.style.width = `${newWidth}px`;

//       finalWidth = newWidth; // Ensure width doesn't go below 30%
//       // headerImage.style.width = `${newWidth}%`; // Shrink the image

//       console.log(newWidth);
//       console.log(scrollPosition);
//     }
//     else {
//       headerImage.style.width = `${200}px`;
//       finalWidth = 200
//     }
//   } else {
//     headerImage.style.width = `${originalTitleWidth}px`;

//     console.log("Width reset to 60%");
//     console.log(scrollPosition);
//   }
// });

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const minImageWidth = 260; // Minimum width the image can shrink to
  const shrinkStart = 50; // Scroll position where the image starts shrinking
  const shrinkRate = 2; // Pixels reduced per scroll pixel
  

  // Calculate the new width based on the scroll position
  let shrinkAmount = Math.max(0, (scrollPosition - shrinkStart) * shrinkRate);
  let newWidth = Math.max(minImageWidth, originalTitleWidth - shrinkAmount);

  // Calculate the amount to translate the image on the X-axis
  let translateX = (originalTitleWidth - newWidth) / 2;

  // Apply the new width and translation
  headerImage.style.width = `${newWidth}px`;
  // headerImage.style.transform = `translateX(${translateX}px)`;

  finalWidth = newWidth; // Keep track of the final width
});
