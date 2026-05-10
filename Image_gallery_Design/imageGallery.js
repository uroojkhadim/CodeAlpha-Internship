const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let visibleImages = [...images];

// Open Lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
  });
});

// Enhance Lightbox UI
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === closeBtn) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }
});

// Smooth Fade Animation for Lightbox
function showImage() {
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.style.opacity = '1';
  }, 300);
}

// Close Lightbox
closeBtn.onclick = () => lightbox.style.display = 'none';

// Next / Prev
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage();
};

// Update filterImages function to fix filtering and active button state
function filterImages(category) {
  const buttons = document.querySelectorAll('.filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Update active button state
  buttons.forEach(button => {
    if (button.textContent.toLowerCase() === category) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Filter gallery items
  galleryItems.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Keyboard Navigation
window.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'Escape') {
      closeBtn.click();
    }
  }
});

// Smooth Fade Animation for Lightbox
function showImage() {
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.style.opacity = '1';
  }, 300);
}

// Add Floating Animation to Gallery Items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.style.transition = 'transform 0.5s ease-in-out';
  item.addEventListener('mouseover', () => {
    item.style.transform = 'translateY(-10px)';
  });
  item.addEventListener('mouseout', () => {
    item.style.transform = 'translateY(0)';
  });
});

// Loading Animation
images.forEach((img) => {
  img.style.opacity = '0';
  img.onload = () => {
    img.style.transition = 'opacity 0.5s';
    img.style.opacity = '1';
  };
});