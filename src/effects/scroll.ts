import { requiredElement } from '../shared/dom';
import type { MotionState } from '../shared/motion';

/** Agrupa leituras e atualizações de rolagem em um único frame. */
export function initScrollEffects(motion: MotionState): void {
  const header = requiredElement('.header');
  const about = requiredElement('.about');
  let frame = 0;
  const sync = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - innerHeight;
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--reading', String(total ? y / total : 0));
      header.classList.toggle('scrolled', y > 15);
      const offset = motion.canAnimate() && innerWidth > 767 ? -Math.min(90, y * 0.12) : 0;
      rootStyle.setProperty('--portrait-scroll', `${offset}px`);
      const progress = Math.max(
        0,
        Math.min(
          1,
          (innerHeight - about.getBoundingClientRect().top) / (innerHeight + about.offsetHeight),
        ),
      );
      rootStyle.setProperty(
        '--arrow-rotation',
        `${motion.canAnimate() ? -14 + progress * 26 : 0}deg`,
      );
    });
  };
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  motion.onChange(sync);
}
