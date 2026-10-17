import { elements, requiredElement } from './dom';

export function initMenu(): void {
  const button = requiredElement<HTMLButtonElement>('.menu-toggle');
  const menu = requiredElement('#menu');
  const pageRegions = [requiredElement('main'), requiredElement('footer')];
  const setMenu = (open: boolean): void => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    pageRegions.forEach(region => { region.inert = open; });
  };

  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  elements<HTMLAnchorElement>('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
      button.focus();
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
}
