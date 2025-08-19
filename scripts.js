  const slides = document.querySelectorAll('.cs-picture-carousel img');
  let i = 0;

  function showSlide(n) {
    slides.forEach((img, idx) => img.classList.toggle('is-active', idx === n));
  }

  if (slides.length) {
    showSlide(0);
    setInterval(() => {
      i = (i + 1) % slides.length;
      showSlide(i);
    }, 3000); // Change every 3 seconds
  }

  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('cs-navigation');
    if (!nav) return;
  
    const toggle = nav.querySelector('.cs-toggle');
    const menu   = nav.querySelector('.cs-ul-wrapper');
  
    if (!toggle || !menu) return;
  
    const open = () => {
      nav.classList.add('cs-active');
      document.body.classList.add('cs-open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      nav.classList.remove('cs-active');
      document.body.classList.remove('cs-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
  
    toggle.addEventListener('click', () => {
      nav.classList.contains('cs-active') ? close() : open();
    });
  
    // close when clicking a link
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('.cs-li-link, .cs-button-solid');
      if (link) close();
    });
  });       
/* GALLERY LIGHTBOX */
const images = document.querySelectorAll('.cs-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Previous image
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Next image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});