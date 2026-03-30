// navbar scroll
const nav = document.getElementById('nav');
const stBtn = document.getElementById('stBtn');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('sc', window.scrollY > 60);
  if (stBtn) stBtn.classList.toggle('on', window.scrollY > 300);
});
if (stBtn) {
  stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// mobile menu
const hbg = document.getElementById('hbg');
const drawer = document.getElementById('drawer');
if (hbg && drawer) {
  hbg.addEventListener('click', () => drawer.classList.toggle('op'));
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.remove('op'));
  });
}

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      ro.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('[data-r]').forEach(el => ro.observe(el));

// portfolio filter
document.querySelectorAll('.ft').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.ft').forEach(b => b.classList.remove('on'));
    this.classList.add('on');
    const f = this.dataset.f;
    document.querySelectorAll('.wi, .project-card-v2').forEach(item => {
      item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
    });
  });
});

// chatbot
const cbTog = document.getElementById('cbTog');
const cbBox = document.getElementById('cbBox');
const cbX = document.getElementById('cbX');
const cbFt = document.getElementById('cbFt');
const svcs = [
  { i: '⚡', l: 'Landing Page', m: 'Tenho interesse em uma Landing Page' },
  { i: '🏢', l: 'Site Institucional', m: 'Tenho interesse em um Site Institucional' },
  { i: '⚙️', l: 'Suporte e Manutenção', m: 'Tenho interesse em Suporte e Manutenção' },
];

if (cbTog && cbBox && cbX && cbFt) {
  cbTog.addEventListener('click', () => {
    cbBox.classList.add('op');
    cbTog.style.display = 'none';
    cbFt.innerHTML = '';
    svcs.forEach(s => {
      const b = document.createElement('button');
      b.className = 'cb-svc';
      b.innerHTML = `<span>${s.i}</span>${s.l}`;
      b.onclick = () => window.open(`https://wa.me/5547991597258?text=${encodeURIComponent(s.m)}`, '_blank');
      cbFt.appendChild(b);
    });
  });
  cbX.addEventListener('click', () => {
    cbBox.classList.remove('op');
    cbTog.style.display = 'flex';
  });
}

// form → WhatsApp
function sendForm(e) {
  e.preventDefault();
  const n = document.getElementById('fn').value || 'visitante';
  const s = document.getElementById('fs').value || '-';
  const m = document.getElementById('fm').value || '';
  window.open(`https://wa.me/5547991597258?text=${encodeURIComponent(`Olá Bruno! Sou ${n}.\n\nAssunto: ${s}\n\n${m}`)}`, '_blank');
}

