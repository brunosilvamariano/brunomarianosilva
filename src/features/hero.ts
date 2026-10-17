import { elements, requiredElement } from '../shared/dom';
import type { MotionState } from '../shared/motion';

export function initHero(motion: MotionState): void {
  const title = requiredElement<HTMLHeadingElement>('#hero-title');
  const lines = title.innerHTML
    .split(/<br\s*\/?>/i)
    .map((line) => line.replace(/<[^>]*>/g, '').trim());
  title.setAttribute('aria-label', lines.join(' '));
  title.textContent = '';
  let letterIndex = 0;
  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) title.append(document.createElement('br'));
    [...line].forEach((letter) => {
      const span = document.createElement('span');
      span.className = 'hero-letter';
      span.textContent = letter;
      span.style.setProperty('--letter', String(letterIndex++ * 0.2));
      span.setAttribute('aria-hidden', 'true');
      title.append(span);
    });
  });

  // Cada coluna tem dois ciclos de dígitos; a última linha preserva o valor real.
  elements('[data-counter]').forEach((counter) => {
    const value = counter.dataset.counter;
    if (!value || !/^\d+$/.test(value)) return;
    const number = requiredElement('.counter-number', counter);
    number.textContent = '';
    [...value].forEach((digit, index) => {
      const cell = document.createElement('span');
      const reel = document.createElement('span');
      cell.className = 'counter-digit';
      reel.className = 'digit-reel';
      const end = 10 + Number(digit);
      reel.style.setProperty(
        '--digit-start',
        String(motion.reducedMotion.matches ? end : index + 1),
      );
      reel.style.setProperty('--digit-end', String(end));
      reel.style.setProperty('--digit-index', String(index));
      for (let i = 0; i < 20; i++) {
        const row = document.createElement('span');
        row.textContent = String(i % 10);
        reel.append(row);
      }
      cell.append(reel);
      number.append(cell);
    });
  });
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.documentElement.classList.add('counters-ready');
    }),
  );
}
