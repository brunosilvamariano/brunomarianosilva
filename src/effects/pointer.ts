import { elements } from '../shared/dom';
import type { MotionState } from '../shared/motion';

export function initPointerEffects(motion: MotionState): void {
  const active = (): boolean => motion.finePointer.matches && motion.canAnimate();

  elements('.project-image').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      if (!active() || link.closest('.dragging')) return;
      const rect = link.getBoundingClientRect();
      link.style.setProperty('--cursor-x', `${event.clientX - rect.left - rect.width / 2}px`);
      link.style.setProperty('--cursor-y', `${event.clientY - rect.top - rect.height / 2}px`);
    });
    link.addEventListener('pointerleave', () => {
      link.style.setProperty('--cursor-x', '0px');
      link.style.setProperty('--cursor-y', '0px');
    });
  });
  elements('.service-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (!active()) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--pointer-x', `${x}px`);
      card.style.setProperty('--pointer-y', `${y}px`);
      card.style.setProperty('--tilt-x', `${(y / rect.height - 0.5) * -2.5}deg`);
      card.style.setProperty('--tilt-y', `${(x / rect.width - 0.5) * 2.5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
  elements('.text-link').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      if (!active()) return;
      const rect = link.getBoundingClientRect();
      link.style.setProperty(
        '--magnet-x',
        `${(event.clientX - rect.left - rect.width / 2) * 0.055}px`,
      );
      link.style.setProperty(
        '--magnet-y',
        `${(event.clientY - rect.top - rect.height / 2) * 0.15}px`,
      );
    });
    link.addEventListener('pointerleave', () => {
      link.style.setProperty('--magnet-x', '0px');
      link.style.setProperty('--magnet-y', '0px');
    });
  });
}
