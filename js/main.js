document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const headerEl = document.querySelector('.header');
  if (navToggle && headerEl) {
    navToggle.addEventListener('click', () => {
      const open = headerEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    headerEl.querySelectorAll('nav a').forEach(a =>
      a.addEventListener('click', () => {
        headerEl.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }));
  }

  // --- Header scroll glass effect
  const header = document.querySelector('.header');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('header-scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // --- GSAP
  if (!reduce && typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero timeline
    const tl = gsap.timeline();
    tl.from('.hero-name', { opacity: 0, y: 50, duration: 1, ease: 'back.out(1.3)' })
      .from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.35')
      .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.25')
      .from('.hero-stats', { opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.15')
      .from('.hero-ticker', { opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.1');

    // Education split
    gsap.from('.edu-left img', {
      opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '.edu-split', start: 'top 85%' },
    });
    gsap.from('.edu-right', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.edu-split', start: 'top 85%' },
    });

    // Experience stagger
    gsap.utils.toArray('.exp').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, x: -30, duration: 0.7, ease: 'circ.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    // Portfolio stagger
    gsap.utils.toArray('.portoBox').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
    });

    // Skills stagger
    gsap.utils.toArray('.skill-cat').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills', start: 'top 82%', toggleActions: 'play none none none' },
      });
    });

    // Certification
    gsap.from('.cert-swiper', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.certificate', start: 'top 85%', toggleActions: 'play none none none' },
    });

    // Footer stagger
    gsap.from('.footer-content > *', {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: 'footer', start: 'top 90%', toggleActions: 'play none none none' },
    });
  }

  // --- Swiper
  if (typeof Swiper !== 'undefined') {
    new Swiper('.cert-swiper', {
      slidesPerView: 1,
      spaceBetween: 12,
      autoHeight: true,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      },
    });
  }

  // --- Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('.cert-slide').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && lightbox) {
    const close = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
});
