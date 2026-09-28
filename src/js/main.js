import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. BUTTERY SMOOTH SCROLL (LENIS + GSAP)
// ============================================
let lenis;
try {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
} catch (e) {
  console.warn('Lenis smooth scroll initialization skipped:', e);
}

// ============================================
// 2. CURVED SVG PRELOADER (WEBFOLIO SIGNATURE)
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrap');

  // If no preloader in HTML, init immediately
  if (!loader) {
    initHeroAnimations();
    initScrollTriggers();
    return;
  }

  const svg = document.getElementById('svg');
  const curve = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z';
  const flat = 'M0,0S175,0,500,0s500,0,500,0V0H0Z';

  const tl = gsap.timeline();

  tl.to('.loader-wrap-heading .load-text span', {
    delay: 0.1,
    y: 0,
    opacity: 1,
    stagger: 0.07,
    ease: 'power3.out',
    duration: 0.4
  });

  tl.to('.loader-wrap-heading .load-text span', {
    delay: 0.35,
    y: -40,
    opacity: 0,
    stagger: 0.04,
    ease: 'power3.in',
    duration: 0.35
  });

  if (svg) {
    tl.to(svg, {
      duration: 0.65,
      attr: { d: curve },
      ease: 'power2.easeIn'
    }).to(svg, {
      duration: 0.65,
      attr: { d: flat },
      ease: 'power2.easeOut'
    });
  }

  tl.to('.loader-wrap', {
    y: -1500,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      initHeroAnimations();
      initScrollTriggers();
    }
  });
});

// ============================================
// 3. MASTER HERO ANIMATIONS (WEBFOLIO CREATIVE)
// ============================================
function initHeroAnimations() {
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl.fromTo('.main-header .hero-badge',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.8 }
  );

  heroTl.fromTo('.main-header .hero-word-reveal',
    { yPercent: 120, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.15 },
    '-=0.4'
  );

  heroTl.fromTo('.main-header .circle-button',
    { opacity: 0, scale: 0.5, rotation: -90 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
    '-=0.8'
  );

  heroTl.fromTo('.main-header .hero-desc',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9 },
    '-=0.7'
  );

  // Stat cards: only animate Y (no opacity), since CSS forces opacity:1
  heroTl.fromTo('.main-header .hero-stat-card',
    { y: 40 },
    {
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      onComplete: () => { initCounters(); }
    },
    '-=0.5'
  );

  heroTl.fromTo('.main-header .scroll-indicator-btn',
    { scale: 0 },
    { scale: 1, duration: 0.6, ease: 'back.out(2)' },
    '-=0.4'
  );
}

// ============================================
// 4. GSAP SCROLLTRIGGER ANIMATION ENGINE
// ============================================
function initScrollTriggers() {
  // Fade Up
  document.querySelectorAll('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Fade Down
  document.querySelectorAll('[data-animate="fade-down"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: -70 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Fade Left (slide in from left)
  document.querySelectorAll('[data-animate="fade-left"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Fade Right (slide in from right)
  document.querySelectorAll('[data-animate="fade-right"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Zoom In
  document.querySelectorAll('[data-animate="zoom-in"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stagger Up Children
  document.querySelectorAll('[data-animate="stagger-up"]').forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(
      children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 3D Rotate Text (d-rotate)
  document.querySelectorAll('.d-rotate').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('animated'),
      once: true
    });
  });

  // Parallax on images
  document.querySelectorAll('[data-parallax]').forEach((img) => {
    gsap.to(img, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });

  // Dynamic Number Counters
  initCounters();
}

function initCounters() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    if (!target) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let count = { val: 0 };
        gsap.to(count, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (target >= 1000) {
              counter.innerText = Math.floor(count.val).toLocaleString('de-DE');
            } else {
              counter.innerText = Math.floor(count.val);
            }
          }
        });
      }
    });
  });
}

// ============================================
// 5. MAGNETIC BUTTONS (WEBFOLIO .hover-this)
// ============================================
document.querySelectorAll('.hover-this').forEach((btn) => {
  btn.addEventListener('mousemove', function (e) {
    const pos = btn.getBoundingClientRect();
    const x = e.clientX - pos.left - pos.width / 2;
    const y = e.clientY - pos.top - pos.height / 2;
    gsap.to(btn.querySelector('.circle'), {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', function () {
    gsap.to(btn.querySelector('.circle'), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// ============================================
// 6. MAGNETIC CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
if (cursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = 'a, button, .cursor-pointer, .butn, .item-box, .item, .brand-item, input, textarea, select, .circle-button';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ============================================
// 7. CIRCULAR SCROLL-TO-TOP PROGRESS
// ============================================
const progressWrap = document.querySelector('.progress-wrap');
const progressPath = document.querySelector('.progress-wrap path');

if (progressWrap && progressPath) {
  const pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = `${pathLength}`;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

  const updateProgress = () => {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = `${progress}`;

    if (scroll > 150) {
      progressWrap.classList.add('active-progress');
    } else {
      progressWrap.classList.remove('active-progress');
    }
  };

  window.addEventListener('scroll', updateProgress);
  updateProgress();

  progressWrap.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ============================================
// 8. NAVBAR & ROLLING TEXT
// ============================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('nav-scroll');
  } else {
    navbar?.classList.remove('nav-scroll');
  }
});

// Setup rolling-text elements
document.querySelectorAll('.rolling-text').forEach((element) => {
  const innerText = element.innerText;
  element.innerHTML = '';
  const textContainer = document.createElement('div');
  textContainer.classList.add('block');
  for (const letter of innerText) {
    const span = document.createElement('span');
    span.innerText = letter.trim() === '' ? '\xa0' : letter;
    span.classList.add('letter');
    textContainer.appendChild(span);
  }
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});

// Mobile menu toggle
const navToggler = document.querySelector('.navbar-toggler');
const navCollapse = document.getElementById('navbarSupportedContent');
if (navToggler && navCollapse) {
  navToggler.addEventListener('click', () => {
    navCollapse.classList.toggle('show');
  });

  navCollapse.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navCollapse.classList.remove('show');
    });
  });
}

// ============================================
// 9. SWIPER SLIDERS
// ============================================
// Services Swiper
const servicesSwiperContainer = document.querySelector('.serv-swiper .swiper');
if (servicesSwiperContainer) {
  new Swiper(servicesSwiperContainer, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.serv-swiper-next',
      prevEl: '.serv-swiper-prev'
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
      1280: { slidesPerView: 4, spaceBetween: 30 }
    }
  });
}

// Works / Portfolio Swiper
const worksSwiperContainer = document.querySelector('.work-swiper .swiper');
if (worksSwiperContainer) {
  new Swiper(worksSwiperContainer, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 900,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.works-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.works-next',
      prevEl: '.works-prev'
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1200: { slidesPerView: 2.8, spaceBetween: 40 }
    }
  });
}

// Testimonials Swiper
const testimSwiperContainer = document.querySelector('.testim-swiper .swiper');
if (testimSwiperContainer) {
  new Swiper(testimSwiperContainer, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.testim-next',
      prevEl: '.testim-prev'
    }
  });
}

// ============================================
// 10. PORTFOLIO FILTERING
// ============================================
const filterButtons = document.querySelectorAll('.gallery-filters button');
const filterCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    filterCards.forEach((card) => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        gsap.to(card, { opacity: 1, scale: 1, duration: 0.4 });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          onComplete: () => {
            card.style.display = 'none';
          }
        });
      }
    });
  });
});

// ============================================
// 11. APPOINTMENT / CONTACT MODAL
// ============================================
const appointmentModal = document.getElementById('appointmentModal');
const openModalBtns = document.querySelectorAll('[data-open-modal]');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (appointmentModal) {
      appointmentModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (appointmentModal) {
      appointmentModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
});

if (appointmentModal) {
  appointmentModal.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
      appointmentModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

// Form Submission handling
const contactForms = document.querySelectorAll('form[data-form-handler]');
contactForms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Wird gesendet...</span>';

    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success text-center py-5">
          <div class="mb-3" style="font-size: 52px; color: var(--main-color);"><i class="fas fa-check-circle"></i></div>
          <h4 class="mb-2 text-white">Vielen Dank für Ihre Anfrage!</h4>
          <p class="text-white-50">Ihre Daten wurden erfolgreich übermittelt. Das CConcepts Team aus Simmern wird sich innerhalb von 24 Stunden persönlich bei Ihnen melden.</p>
        </div>
      `;
    }, 1000);
  });
});

// Smooth anchor scrolling via Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#' && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.2 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
});

console.log('CConcepts Master Hero & Animation Engine Activated!');
