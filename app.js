(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
  if (window.tailwind) window.tailwind.config = { corePlugins: { preflight: false }, theme: { extend: { colors: { alabaster: '#faf8f5', crust: '#d9b95b', slate: '#232629' }, fontFamily: { heading: ['Montserrat', 'sans-serif'], body: ['Open Sans', 'sans-serif'] }, spacing: { 28: '7rem' } } } };
  const icons = () => window.lucide?.createIcons(); icons();
  let lenis;
  if (!reduced && window.Lenis && window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false, anchors: false }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  const scrollTo = target => { if (lenis) { lenis.start(); lenis.scrollTo(target, { offset: -80 }); } else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reduced ? 'instant' : 'smooth' }); else target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); };
  let toastTimer;
  function toast(message) { $('#toast span').textContent = message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 4000); }
  function openModal(modal) { modal.showModal(); lenis?.stop(); }
  $$('dialog').forEach(modal => { modal.addEventListener('close', () => { if (!$('dialog[open]')) lenis?.start(); if (modal.id === 'mobile-menu') $('#menu-toggle').setAttribute('aria-expanded', 'false'); }); modal.addEventListener('click', e => { if (e.target === modal) { const r = modal.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) modal.close(); } }); });
  $$('.modal-close').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  $('#menu-toggle').addEventListener('click', () => { $('#menu-toggle').setAttribute('aria-expanded', 'true'); openModal($('#mobile-menu')); if (window.gsap && !reduced) gsap.fromTo('#mobile-menu nav a', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .45, clearProps: 'all' }); });
  $('.menu-close').addEventListener('click', () => $('#mobile-menu').close());
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', e => { const target = document.querySelector(link.getAttribute('href')); if (!target) return; e.preventDefault(); if ($('#mobile-menu').open) $('#mobile-menu').close(); scrollTo(target); if (link.classList.contains('skip-link')) { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); } }));
  const slides = [
    { subtitle: 'BREAKING BREAD', title: 'IT’S A PIECE OF CAKE', description: 'Experience the art of slow-fermented sourdough and handcrafted nocturnal pastries baked fresh every morning at Yoru Bakes.' },
    { subtitle: 'FLOUR. WATER. TIME.', title: 'GOOD THINGS TAKE TIME', description: 'A golden crust. A soft heart. Discover the quiet joy of artisan bread, made to be shared around your table.' },
    { subtitle: 'SWEET LITTLE RITUALS', title: 'A SLICE OF HAPPINESS', description: 'For slow mornings, afternoon conversations, and those just-because moments. There is always room for a little Yoru.' }
  ];
  let activeSlide = 0, paused = reduced, timer;
  const hero = $('.hero');
  function showSlide(index, manual = false) { activeSlide = (index + slides.length) % slides.length; const data = slides[activeSlide]; $$('.hero-slide').forEach((el, i) => { el.classList.toggle('is-active', i === activeSlide); el.setAttribute('aria-hidden', i !== activeSlide); }); $$('.slider-dots button').forEach((b, i) => { b.classList.toggle('active', i === activeSlide); b.setAttribute('aria-pressed', i === activeSlide); }); $('#hero-subtitle').textContent = data.subtitle; $('#hero-title').textContent = data.title; $('#hero-description').textContent = data.description; $('#slide-number').textContent = `0${activeSlide + 1}`; if (window.gsap && !reduced) gsap.fromTo('.hero-content > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .65, stagger: .06, overwrite: true }); if (manual) $('#slide-announcement').textContent = `Slide ${activeSlide + 1} of 3: ${data.title}`; }
  function startSlider() { clearInterval(timer); if (!paused && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) timer = setInterval(() => showSlide(activeSlide + 1), 6000); }
  $('#previous-slide').addEventListener('click', () => { showSlide(activeSlide - 1, true); startSlider(); });
  $('#next-slide').addEventListener('click', () => { showSlide(activeSlide + 1, true); startSlider(); });
  $$('[data-slide]').forEach(b => b.addEventListener('click', () => { showSlide(+b.dataset.slide, true); startSlider(); }));
  function updatePause() { $('#pause-slider').setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); $('#pause-slider').innerHTML = `<i data-lucide="${paused ? 'play' : 'pause'}">${paused ? '▷' : 'Ⅱ'}</i>`; icons(); }
  $('#pause-slider').addEventListener('click', () => { paused = !paused; updatePause(); startSlider(); });
  hero.addEventListener('mouseenter', () => clearInterval(timer)); hero.addEventListener('mouseleave', startSlider); hero.addEventListener('focusin', () => clearInterval(timer)); hero.addEventListener('focusout', () => setTimeout(startSlider, 0)); document.addEventListener('visibilitychange', startSlider); updatePause(); startSlider();
  $('#newsletter-form').addEventListener('submit', e => { e.preventDefault(); const input = $('#email'); const valid = input.validity.valid && input.value.trim().length > 0; input.setAttribute('aria-invalid', !valid); $('#email-error').textContent = valid ? '' : 'Please enter a valid email address, such as hello@example.com.'; if (!valid) { input.focus(); return; } toast('Lovely to meet you! Demo validated — no email was saved or subscribed.'); input.value = ''; });
  $('#email').addEventListener('input', () => { $('#email-error').textContent = ''; $('#email').removeAttribute('aria-invalid'); });
  const products = [
    { name: 'Simple Crusty Bread', price: 28000, image: 'croissant.jpg', text: 'A golden, buttery croissant with a delicate crisp crust. A simple companion for your favorite morning coffee.' },
    { name: 'Croissant with Detail', price: 32000, image: 'cinnamon.jpg', text: 'A warm cinnamon swirl with delicate pastry layers. Something sweet for the slowest part of your day.' },
    { name: 'Breakfast Croissant', price: 35000, image: 'chocolat.jpg', text: 'A flaky pain au chocolat with a rich chocolate center. Made for an unhurried breakfast.' }
  ];
  const cart = [0, 0, 0];
  function renderCart() { $('#bag-count').textContent = cart.reduce((a, b) => a + b, 0); $('#cart-items').innerHTML = cart.some(Boolean) ? products.map((p, i) => cart[i] ? `<div class="cart-row"><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><div class="quantity"><button data-minus="${i}" aria-label="Remove one ${p.name}">−</button><span>${cart[i]}</span><button data-add="${i}" aria-label="Add one ${p.name}">+</button></div></div>` : '').join('') : '<p>Your bag is waiting for a little happiness. Explore the collection to find your favorite.</p>'; $('#cart-total').textContent = money(products.reduce((sum, p, i) => sum + p.price * cart[i], 0)); $('#copy-order').disabled = !cart.some(Boolean); }
  document.addEventListener('click', e => { const add = e.target.closest('[data-add]'); if (add) { cart[+add.dataset.add]++; renderCart(); toast('A little happiness added to your bag.'); } const minus = e.target.closest('[data-minus]'); if (minus) { const id = +minus.dataset.minus; cart[id] = Math.max(0, cart[id] - 1); renderCart(); } const detail = e.target.closest('[data-product]'); if (detail) { const id = +detail.dataset.product, p = products[id]; $('#product-content').innerHTML = `<img class="detail-image" src="assets/${p.image}" alt="${p.name}"><p class="eyebrow gold">THE YORU COLLECTION</p><h2>${p.name}</h2><p>${p.text}</p><p class="modal-note">Illustrative menu. Confirm ingredients and allergens with the bakery before ordering.</p><button class="button black" data-add="${id}">ADD TO BAG · ${money(p.price)}</button>`; openModal($('#product-modal')); } });
  function openCart() { if ($('#mobile-menu').open) $('#mobile-menu').close(); openModal($('#cart-modal')); }
  $('#bag-button').addEventListener('click', openCart); $('.mobile-bag').addEventListener('click', openCart);
  $('#copy-order').addEventListener('click', async () => { const text = 'Yoru Bakes — sample selection\n' + products.map((p, i) => cart[i] ? `${cart[i]} × ${p.name} — ${money(cart[i] * p.price)}` : '').filter(Boolean).join('\n') + '\nTotal: ' + $('#cart-total').textContent; try { await navigator.clipboard.writeText(text); toast('Your selection is copied. No order has been placed.'); } catch { toast('Clipboard unavailable. You can review your selection in the bag.'); } });
  $('#social-info').addEventListener('click', () => { $('#info-content').innerHTML = '<p class="eyebrow gold">FIND YORU</p><h2>STAY CURIOUS</h2><p>The official Instagram account has not been added to this preview yet. Visit Notes from Yoru to try the newsletter form.</p>'; openModal($('#info-modal')); });
  $('#credits-button').addEventListener('click', () => { $('#info-content').innerHTML = '<p class="eyebrow gold">BEHIND THE PREVIEW</p><h2>MADE FOR YORU</h2><p>Original Yoru logos and cat silhouettes supplied by the brand. Product names, prices, editorial copy, and customer personas are illustrative. Newsletter and shopping bag are demonstrations.</p><ul class="credit-list"><li><a href="https://unsplash.com/photos/a-woman-holding-a-baguette-in-her-hands-Ld-5d4x18wQ" target="_blank" rel="noopener">Baguette portrait — Zeinab Bt</a></li><li><a href="https://unsplash.com/photos/sliced-cakes-MssPSnkV1yM" target="_blank" rel="noopener">Loaf cake — Jeff Siepman</a></li><li><a href="https://unsplash.com/photos/a-croissant-sitting-on-top-of-a-white-surface-VzUE5RtCuBA" target="_blank" rel="noopener">Croissant — personalgraphic.com</a></li><li><a href="https://unsplash.com/photos/cinnamon-roll-with-calligraphy-and-necklace-yhajzIMUp-g" target="_blank" rel="noopener">Cinnamon pastry — Stacy</a></li><li><a href="https://unsplash.com/photos/a-piece-of-bread-sitting-on-top-of-a-cork-coaster-XDS-YmjUUvY" target="_blank" rel="noopener">Pain au chocolat — Vicky Nguyen</a></li><li>Additional bakery photography from Unsplash.</li></ul>'; openModal($('#info-modal')); });
  $('#peek-cat').addEventListener('click', () => { $('#peek-cat').classList.add('hello'); toast('Purrhaps one more pastry?'); setTimeout(() => $('#peek-cat').classList.remove('hello'), 3000); if (window.gsap && !reduced) gsap.fromTo('#peek-cat', { rotation: -6 }, { rotation: 6, duration: .2, yoyo: true, repeat: 3, onComplete: () => gsap.set('#peek-cat', { rotation: 0 }) }); });
  $('#back-top').addEventListener('click', () => scrollTo(0));
  let scrollFrame;
  function updateScroll() { const y = window.scrollY; $('#header').classList.toggle('scrolled', y > 25); $('#back-top').classList.toggle('visible', y > 300); const max = document.documentElement.scrollHeight - innerHeight; $('#back-top').style.setProperty('--progress', `${max > 0 ? Math.min(100, y / max * 100) : 0}%`); scrollFrame = null; }
  addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, { passive: true }); updateScroll();
  function motion() {
    if (reduced || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.hero-images', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      $$('.reveal').forEach(el => gsap.from(el, { opacity: 0, y: 30, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, clearProps: 'opacity,transform' }));
      $$('.image-curtain').forEach(el => gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
      gsap.fromTo('.story-image.first', { y: 25, rotationY: -5 }, { y: -18, rotationY: 0, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.fromTo('.story-image.second', { y: -15 }, { y: 25, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      const path = $('.signature-stroke'), length = path.getTotalLength(); gsap.set(path, { strokeDasharray: length, strokeDashoffset: length }); gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut', scrollTrigger: { trigger: '.signature', start: 'top 90%', once: true } });
      gsap.to('.bread-strips', { y: 65, ease: 'none', scrollTrigger: { trigger: '.newsletter', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.flour-particles', { y: -45, ease: 'none', scrollTrigger: { trigger: '.newsletter', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.pastry', { opacity: 0, y: 35, rotation: -7, duration: .8, stagger: .16, ease: 'power3.out', scrollTrigger: { trigger: '.pastries', start: 'top 85%', once: true }, clearProps: 'all' });
      gsap.fromTo('.sitting-cat', { y: 65, rotation: -8 }, { y: 0, rotation: 0, scrollTrigger: { trigger: '.testimonials', start: 'top 95%', end: 'top 60%', scrub: 1 } });
      gsap.to('.cat-tail', { rotation: 25, yoyo: true, repeat: -1, duration: 1.7, ease: 'sine.inOut' });
      gsap.to('.flour-dust', { y: 70, ease: 'none', scrollTrigger: { trigger: '.testimonials', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    if (matchMedia('(pointer:fine)').matches) { const cursor = $('#cursor-cat'); const xTo = gsap.quickTo(cursor, 'x', { duration: .3 }), yTo = gsap.quickTo(cursor, 'y', { duration: .3 }); document.addEventListener('pointermove', e => { xTo(e.clientX + 16); yTo(e.clientY + 16); cursor.style.opacity = e.target.closest('.pastry-visual,.peek-cat') ? '.8' : '0'; }); }
  }
  // Visible content and CSS loader timeout provide a fallback when CDNs are unavailable.
  if (!reduced && window.gsap) gsap.timeline({ onComplete: () => $('#preloader').classList.add('loaded') }).from('.preloader .stack-logo', { opacity: 0, y: 10, duration: .5 }).to('#preloader', { yPercent: -101, duration: .8, delay: .25, ease: 'power3.inOut' });
  else $('#preloader').classList.add('loaded');
  motion(); renderCart(); $('#year').textContent = new Date().getFullYear();
  document.fonts?.ready.then(() => window.ScrollTrigger?.refresh()); window.addEventListener('load', () => window.ScrollTrigger?.refresh());
})();
