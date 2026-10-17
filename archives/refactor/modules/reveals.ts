import { elements } from './dom';
import type { MotionState } from './motion';

export function initReveals(motion: MotionState): void {
  elements<HTMLHeadingElement>('.about-copy h2,.services-heading h2').forEach(heading => {
    const lines = heading.innerHTML.split(/<br\s*\/?>/i);
    heading.innerHTML = lines.map(line => `<span class="reveal-title"><span>${line}</span></span>`).join('');
  });
  elements('.services-cards .reveal').forEach((card, index) => {
    card.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
  });

  const targets = elements('.reveal');
  if ('IntersectionObserver' in window && !motion.reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('js-ready');
    targets.forEach(element => observer.observe(element));
  } else targets.forEach(element => element.classList.add('visible'));
}
