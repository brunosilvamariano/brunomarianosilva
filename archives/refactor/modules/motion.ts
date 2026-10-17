import { elements } from './dom';

export interface MotionState {
  readonly reducedMotion: MediaQueryList;
  readonly finePointer: MediaQueryList;
  canAnimate(): boolean;
  onChange(listener: () => void): void;
}

/** Preferência compartilhada por portfólio, parallax, ponteiro e rodapé. */
export function createMotionState(): MotionState {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const listeners = new Set<() => void>();
  const buttons = elements<HTMLButtonElement>('.motion-toggle');
  let pausedByVisitor = false;

  const sync = (): void => {
    const paused = pausedByVisitor || reducedMotion.matches;
    document.documentElement.classList.toggle('motion-paused', paused);
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
      button.title = paused ? 'Retomar animações' : 'Pausar animações';
      button.innerHTML = button.classList.contains('footer-motion')
        ? (paused ? 'Retomar movimento ↗' : 'Pausar movimento Ⅱ')
        : `<span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
    });
    listeners.forEach(listener => listener());
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    pausedByVisitor = !pausedByVisitor;
    sync();
  }));
  reducedMotion.addEventListener('change', () => {
    elements('.reveal').forEach(element => element.classList.add('visible'));
    sync();
  });
  sync();

  return {
    reducedMotion,
    finePointer,
    canAnimate: () => !reducedMotion.matches && !pausedByVisitor,
    onChange(listener) {
      listeners.add(listener);
      listener();
    },
  };
}
