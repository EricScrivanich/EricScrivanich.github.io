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
