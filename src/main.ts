import './styles/main.css';
import { requiredElement } from './shared/dom';
import { createMotionState } from './shared/motion';
import { initMenu } from './features/navigation';
import { initHero } from './features/hero';
import { initReveals } from './effects/reveal';
import { initScrollEffects } from './effects/scroll';
import { initPortfolio } from './features/portfolio';
import { initPointerEffects } from './effects/pointer';

// Cada interação tem seu módulo; todos compartilham a preferência de movimento.
const motion = createMotionState();
initMenu();
initHero(motion);
initReveals(motion);
initScrollEffects(motion);
initPortfolio(motion);
initPointerEffects(motion);
requiredElement('#year').textContent = String(new Date().getFullYear());
