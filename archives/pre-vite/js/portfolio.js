/* Movimento editorial sem dependências.
   Links e cards permanecem utilizáveis sem JS. Todos os movimentos contínuos
   respeitam prefers-reduced-motion e o botão de pausa do visitante. */
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let motionPaused = false;
const canAnimate = () => !reducedMotion.matches && !motionPaused;

// Menu móvel: bloqueia o conteúdo de fundo e devolve o foco ao fechar com Esc.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const pageRegions = [document.querySelector('main'), document.querySelector('footer')];
const setMenu = open => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  pageRegions.forEach(region => { region.inert = open; });
};
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuButton.focus(); }
});
matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

// Entrada tipográfica: letras em máscara e contadores em rolos de dígitos.
const heroTitle = document.querySelector('#hero-title');
const heroText = heroTitle.textContent;
heroTitle.setAttribute('aria-label', heroText);
heroTitle.textContent = '';
[...heroText].forEach((letter, index) => {
  const span = document.createElement('span');
  span.className = 'hero-letter'; span.textContent = letter;
  span.style.setProperty('--letter', index); span.setAttribute('aria-hidden', 'true');
  heroTitle.append(span);
});
document.querySelectorAll('[data-counter]').forEach(counter => {
  const number = counter.querySelector('.counter-number'); number.textContent = '';
  [...counter.dataset.counter].forEach((digit, index) => {
    const cell = document.createElement('span'); cell.className = 'counter-digit';
    const reel = document.createElement('span'); reel.className = 'digit-reel';
    const end = 10 + Number(digit);
    reel.style.setProperty('--digit-start', reducedMotion.matches ? end : index + 1);
    reel.style.setProperty('--digit-end', end); reel.style.setProperty('--digit-index', index);
    for (let i = 0; i < 20; i++) { const row = document.createElement('span'); row.textContent = i % 10; reel.append(row); }
    cell.append(reel); number.append(cell);
  });
});
requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('counters-ready')));

// Entrada das seções: máscaras nos títulos e atraso gradual entre cards.
document.querySelectorAll('.about-copy h2,.services-heading h2').forEach(heading => {
  const lines = heading.innerHTML.split(/<br\s*\/?>/i);
  heading.innerHTML = lines.map(line => `<span class="reveal-title"><span>${line}</span></span>`).join('');
});
document.querySelectorAll('.services-cards .reveal').forEach((card, i) => card.style.setProperty('--reveal-delay', `${(i % 3) * 85}ms`));
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.documentElement.classList.add('js-ready');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));

// Rolagem: uma única atualização por frame, usando apenas transformações.
const header = document.querySelector('.header');
const about = document.querySelector('.about');
let scrollFrame;
const syncScroll = () => {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const y = window.scrollY;
    const total = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--reading', total ? y / total : 0);
    header.classList.toggle('scrolled', y > 15);
    const offset = canAnimate() && innerWidth > 767 ? -Math.min(90, y * .12) : 0;
    document.documentElement.style.setProperty('--portrait-scroll', `${offset}px`);
    const progress = Math.max(0, Math.min(1, (innerHeight - about.getBoundingClientRect().top) / (innerHeight + about.offsetHeight)));
    document.documentElement.style.setProperty('--arrow-rotation', `${canAnimate() ? -14 + progress * 26 : 0}deg`);
  });
};
window.addEventListener('scroll', syncScroll, { passive: true });
window.addEventListener('resize', syncScroll, { passive: true }); syncScroll();

// Portfólio infinito: duplicação decorativa, rolagem nativa e pausa por interação.
const track = document.querySelector('.project-track');
const projects = [...track.querySelectorAll('.project')];
const controls = [...document.querySelectorAll('[data-slide]')];
const position = document.querySelector('.project-position');
const cloneFragment = document.createDocumentFragment();
projects.forEach(project => {
  const clone = project.cloneNode(true); clone.classList.add('project-clone'); clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
  cloneFragment.append(clone);
});
track.append(cloneFragment);
controls.forEach(button => { button.disabled = false; });
const step = () => projects[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
const cycle = () => step() * projects.length;
let hovered = false, focused = false, dragging = false, visible = false, idleUntil = 0;
let lastFrame = 0, autoFrame = 0, floatScroll = track.scrollLeft, manualScroll = false;
let dragStart = 0, dragLeft = 0, moved = false;
const pauseAfterInteraction = () => { idleUntil = performance.now() + 6000; floatScroll = track.scrollLeft; };
const updatePosition = () => {
  const count = Math.min(projects.length - 1, Math.max(0, Math.round((track.scrollLeft % cycle()) / step())));
  position.textContent = `${String(count + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
};
const navigate = direction => {
  pauseAfterInteraction(); manualScroll = true;
  if (direction < 0 && track.scrollLeft < step() / 2) track.scrollLeft += cycle();
  if (direction > 0 && track.scrollLeft >= cycle()) track.scrollLeft -= cycle();
  track.scrollBy({ left: direction * step(), behavior: canAnimate() ? 'smooth' : 'instant' });
};
controls.forEach(button => button.addEventListener('click', () => navigate(Number(button.dataset.slide))));
track.addEventListener('keydown', event => {
  if (event.target !== track) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); navigate(event.key === 'ArrowRight' ? 1 : -1); }
});
track.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') hovered = true; });
track.addEventListener('pointerleave', () => { hovered = false; });
track.addEventListener('focusin', () => { focused = true; });
track.addEventListener('focusout', () => { focused = false; pauseAfterInteraction(); });
track.addEventListener('wheel', pauseAfterInteraction, { passive: true });
track.addEventListener('touchstart', () => { dragging = true; pauseAfterInteraction(); }, { passive: true });
track.addEventListener('touchend', () => { dragging = false; pauseAfterInteraction(); }, { passive: true });
track.addEventListener('scroll', () => { updatePosition(); if (manualScroll || hovered || dragging || !canAnimate()) floatScroll = track.scrollLeft; }, { passive: true });
track.addEventListener('scrollend', () => { manualScroll = false; floatScroll = track.scrollLeft; });
track.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  dragging = true; moved = false; dragStart = event.clientX; dragLeft = track.scrollLeft; pauseAfterInteraction();
});
window.addEventListener('pointermove', event => {
  if (!dragging || event.pointerType !== 'mouse') return;
  const distance = event.clientX - dragStart;
  if (Math.abs(distance) > 5) { moved = true; track.classList.add('dragging'); track.scrollLeft = dragLeft - distance; }
}, { passive: true });
window.addEventListener('pointerup', () => { if (dragging) { dragging = false; track.classList.remove('dragging'); pauseAfterInteraction(); } });
track.addEventListener('dragstart', event => event.preventDefault());
track.addEventListener('click', event => { if (moved) { event.preventDefault(); moved = false; } }, true);
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) startAuto(); }, { rootMargin: '100px' }).observe(track);
} else visible = true;
function animatePortfolio(time) {
  autoFrame = 0;
  const dt = Math.min(time - (lastFrame || time), 50); lastFrame = time;
  if (visible && !document.hidden && canAnimate() && !hovered && !focused && !dragging && time > idleUntil && !manualScroll) {
    floatScroll += dt * .037;
    if (floatScroll >= cycle()) floatScroll -= cycle();
    track.scrollLeft = floatScroll;
  }
  if (visible && !document.hidden && canAnimate()) autoFrame = requestAnimationFrame(animatePortfolio);
}
function startAuto() { lastFrame = 0; if (!autoFrame && visible && canAnimate() && !document.hidden) autoFrame = requestAnimationFrame(animatePortfolio); }
document.addEventListener('visibilitychange', startAuto);
window.addEventListener('resize', () => { floatScroll = track.scrollLeft; updatePosition(); });
updatePosition();

// Cursor nos projetos, iluminação dos cards e atração discreta das setas.
document.querySelectorAll('.project-image').forEach(link => {
  link.addEventListener('pointermove', event => {
    if (!finePointer.matches || !canAnimate() || dragging) return;
    const rect = link.getBoundingClientRect();
    link.style.setProperty('--cursor-x', `${event.clientX - rect.left - rect.width / 2}px`);
    link.style.setProperty('--cursor-y', `${event.clientY - rect.top - rect.height / 2}px`);
  });
  link.addEventListener('pointerleave', () => { link.style.setProperty('--cursor-x', '0px'); link.style.setProperty('--cursor-y', '0px'); });
});
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || !canAnimate()) return;
    const rect = card.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
    card.style.setProperty('--pointer-x', `${x}px`); card.style.setProperty('--pointer-y', `${y}px`);
    card.style.setProperty('--tilt-x', `${(y / rect.height - .5) * -2.5}deg`);
    card.style.setProperty('--tilt-y', `${(x / rect.width - .5) * 2.5}deg`);
  });
  card.addEventListener('pointerleave', () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
});
document.querySelectorAll('.text-link').forEach(link => {
  link.addEventListener('pointermove', event => {
    if (!finePointer.matches || !canAnimate()) return;
    const rect = link.getBoundingClientRect();
    link.style.setProperty('--magnet-x', `${(event.clientX - rect.left - rect.width / 2) * .055}px`);
    link.style.setProperty('--magnet-y', `${(event.clientY - rect.top - rect.height / 2) * .15}px`);
  });
  link.addEventListener('pointerleave', () => { link.style.setProperty('--magnet-x', '0px'); link.style.setProperty('--magnet-y', '0px'); });
});

// Controle global: pausa portfólio, assinatura e efeitos de movimento por ponteiro.
const motionButtons = [...document.querySelectorAll('.motion-toggle')];
const syncMotion = () => {
  document.documentElement.classList.toggle('motion-paused', motionPaused || reducedMotion.matches);
  motionButtons.forEach(button => {
    const paused = motionPaused || reducedMotion.matches;
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
    button.title = paused ? 'Retomar animações' : 'Pausar animações';
    button.innerHTML = button.classList.contains('footer-motion') ? (paused ? 'Retomar movimento ↗' : 'Pausar movimento Ⅱ') : `<span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
  });
  syncScroll(); startAuto();
};
motionButtons.forEach(button => button.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); }));
reducedMotion.addEventListener('change', () => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); syncMotion(); });
syncMotion();
document.querySelector('#year').textContent = new Date().getFullYear();
