import { elements, requiredElement } from '../shared/dom';
import type { MotionState } from '../shared/motion';

export function initPortfolio(motion: MotionState): void {
  const track = requiredElement<HTMLDivElement>('.project-track');
  const projects = elements('.project', track);
  const firstProject = projects[0];
  if (!firstProject) return;
  const controls = elements<HTMLButtonElement>('[data-slide]');
  const position = requiredElement('.project-position');

  // Clones decorativos mantêm o ciclo contínuo sem duplicar a navegação assistiva.
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    const clone = project.cloneNode(true) as HTMLElement;
    clone.classList.add('project-clone');
    clone.setAttribute('aria-hidden', 'true');
    elements<HTMLAnchorElement>('a', clone).forEach((link) => {
      link.tabIndex = -1;
    });
    fragment.append(clone);
  });
  track.append(fragment);
  controls.forEach((button) => {
    button.disabled = false;
  });

  const step = (): number =>
    firstProject.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const cycle = (): number => step() * projects.length;
  let hovered = false;
  let focused = false;
  let dragging = false;
  let visible = false;
  let idleUntil = 0;
  let lastFrame = 0;
  let autoFrame = 0;
  let floatScroll = track.scrollLeft;
  let manualScroll = false;
  let dragStart = 0;
  let dragLeft = 0;
  let moved = false;

  const pauseAfterInteraction = (): void => {
    idleUntil = performance.now() + 6000;
    floatScroll = track.scrollLeft;
  };
  const updatePosition = (): void => {
    const count = Math.min(
      projects.length - 1,
      Math.max(0, Math.round((track.scrollLeft % cycle()) / step())),
    );
    position.textContent = `${String(count + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
  };
  const navigate = (direction: -1 | 1): void => {
    pauseAfterInteraction();
    manualScroll = true;
    if (direction < 0 && track.scrollLeft < step() / 2) track.scrollLeft += cycle();
    if (direction > 0 && track.scrollLeft >= cycle()) track.scrollLeft -= cycle();
    track.scrollBy({
      left: direction * step(),
      behavior: motion.canAnimate() ? 'smooth' : 'instant',
    });
  };
  controls.forEach((button) =>
    button.addEventListener('click', () => navigate(button.dataset.slide === '-1' ? -1 : 1)),
  );
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') hovered = true;
  });
  track.addEventListener('pointerleave', () => {
    hovered = false;
  });
  track.addEventListener('focusin', () => {
    focused = true;
  });
  track.addEventListener('focusout', () => {
    focused = false;
    pauseAfterInteraction();
  });
  track.addEventListener('wheel', pauseAfterInteraction, { passive: true });
  track.addEventListener(
    'touchstart',
    () => {
      dragging = true;
      pauseAfterInteraction();
    },
    { passive: true },
  );
  const stopTouch = (): void => {
    dragging = false;
    pauseAfterInteraction();
  };
  track.addEventListener('touchend', stopTouch, { passive: true });
  track.addEventListener('touchcancel', stopTouch, { passive: true });
  track.addEventListener(
    'scroll',
    () => {
      updatePosition();
      if (manualScroll || hovered || dragging || !motion.canAnimate())
        floatScroll = track.scrollLeft;
    },
    { passive: true },
  );
  track.addEventListener('scrollend', () => {
    manualScroll = false;
    floatScroll = track.scrollLeft;
  });
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    moved = false;
    dragStart = event.clientX;
    dragLeft = track.scrollLeft;
    pauseAfterInteraction();
  });
  window.addEventListener(
    'pointermove',
    (event) => {
      if (!dragging || event.pointerType !== 'mouse') return;
      const distance = event.clientX - dragStart;
      if (Math.abs(distance) > 5) {
        moved = true;
        track.classList.add('dragging');
        track.scrollLeft = dragLeft - distance;
      }
    },
    { passive: true },
  );
  const stopDrag = (): void => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('dragging');
    pauseAfterInteraction();
  };
  window.addEventListener('pointerup', stopDrag);
  window.addEventListener('pointercancel', stopDrag);
  track.addEventListener('dragstart', (event) => event.preventDefault());
  track.addEventListener(
    'click',
    (event) => {
      if (moved) {
        event.preventDefault();
        moved = false;
      }
    },
    true,
  );

  function animatePortfolio(time: number): void {
    autoFrame = 0;
    const delta = Math.min(time - (lastFrame || time), 50);
    lastFrame = time;
    if (
      visible &&
      !document.hidden &&
      motion.canAnimate() &&
      !hovered &&
      !focused &&
      !dragging &&
      time > idleUntil &&
      !manualScroll
    ) {
      floatScroll += delta * 0.037;
      if (floatScroll >= cycle()) floatScroll -= cycle();
      track.scrollLeft = floatScroll;
    }
    if (visible && !document.hidden && motion.canAnimate())
      autoFrame = requestAnimationFrame(animatePortfolio);
  }
  function startAuto(): void {
    lastFrame = 0;
    if (!autoFrame && visible && motion.canAnimate() && !document.hidden)
      autoFrame = requestAnimationFrame(animatePortfolio);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) startAuto();
      },
      { rootMargin: '100px' },
    ).observe(track);
  } else visible = true;
  document.addEventListener('visibilitychange', startAuto);
  window.addEventListener('resize', () => {
    floatScroll = track.scrollLeft;
    updatePosition();
  });
  motion.onChange(startAuto);
  updatePosition();
}
