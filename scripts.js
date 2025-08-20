document.addEventListener('DOMContentLoaded', () => {
  initCarousel();     // safe: only if .cs-picture-carousel exists
  initMobileNav();    // you already guard this; leaving as-is
  initLightbox();     // safe: only if lightbox elements exist
  initContactForm();  // safe: only if contact form exists
});

/* ---------- CAROUSEL (safe-init) ---------- */
function initCarousel() {
  const slides = document.querySelectorAll('.cs-picture-carousel img');
  if (!slides.length) return;

  let i = 0;
  const showSlide = (n) => {
    slides.forEach((img, idx) => img.classList.toggle('is-active', idx === n));
  };

  showSlide(0);
  setInterval(() => {
    i = (i + 1) % slides.length;
    showSlide(i);
  }, 3000);
}

/* ---------- MOBILE NAV (your code, with guards) ---------- */
function initMobileNav() {
  const nav = document.getElementById('cs-navigation');
  if (!nav) return;

  const toggle = nav.querySelector('.cs-toggle');
  const menu   = nav.querySelector('.cs-ul-wrapper');
  if (!toggle || !menu) return;

  const open  = () => { nav.classList.add('cs-active'); document.body.classList.add('cs-open');  toggle.setAttribute('aria-expanded', 'true');  };
  const close = () => { nav.classList.remove('cs-active'); document.body.classList.remove('cs-open'); toggle.setAttribute('aria-expanded', 'false'); };

  toggle.addEventListener('click', () => {
    nav.classList.contains('cs-active') ? close() : open();
  });

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('.cs-li-link, .cs-button-solid');
    if (link) close();
  });
}

/* ---------- GALLERY LIGHTBOX (safe-init) ---------- */
function initLightbox() {
  const images      = document.querySelectorAll('.cs-item img');
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn    = document.querySelector('.lightbox .close');
  const prevBtn     = document.querySelector('.lightbox .prev');
  const nextBtn     = document.querySelector('.lightbox .next');

  // If the lightbox structure isn't on this page, bail cleanly.
  if (!lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      currentIndex = index;
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  prevBtn.addEventListener('click', () => {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  nextBtn.addEventListener('click', () => {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
}

/* ---------- CONTACT FORM (safe-init) ---------- */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const submit  = document.getElementById('formSubmit'); // can be <a> or <button>
  const message = document.getElementById('formMessage');
  if (!form || !submit || !message) return;

  const showMsg = (text, kind = '') => {
    message.textContent = text;
    message.className = '';
    if (kind) message.classList.add(kind);
    message.style.display = 'block';
  };

  // If submit is an <a>, emulate submit. If it's a <button type="submit">, this is harmless.
  submit.addEventListener('click', (e) => {
    // If it's an anchor with href, prevent the jump
    if (submit.tagName === 'A') e.preventDefault();
    if (!form.checkValidity()) {
      showMsg('Please fill out all required fields.', 'error');
      return;
    }
    // Works for both cases; will trigger the 'submit' event
    form.requestSubmit?.() || form.submit();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      showMsg('Please fill out all required fields.', 'error');
      return;
    }

    // Optional: UX guard against double-clicks
    if ('disabled' in submit) submit.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) {
        let errText = 'Message didn’t send. Please try again.';
        try {
          const data = await res.json();
          if (data?.errors?.length) errText = data.errors.map(e => e.message).join(' ');
        } catch (_) {}
        showMsg(errText, 'error');
        return;
      }

      form.reset();
      showMsg('Message sent!', 'success');
      setTimeout(() => (message.style.display = 'none'), 5000);
    } catch {
      showMsg('Network error. Please check your connection.', 'error');
    } finally {
      if ('disabled' in submit) submit.disabled = false;
    }
  });
}
