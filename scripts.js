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
    }, 4000); // Change every 4 seconds
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