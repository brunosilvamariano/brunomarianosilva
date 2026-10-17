import { elements, requiredElement } from '../shared/dom';

export function initMenu(): void {
  const button = requiredElement<HTMLButtonElement>('.menu-toggle');
  const menu = requiredElement('#menu');
  const pageRegions = [requiredElement('main'), requiredElement('footer')];
  const setMenu = (open: boolean): void => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    pageRegions.forEach((region) => {
      region.inert = open;
    });
  };

  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  elements<HTMLAnchorElement>('a', menu).forEach((link) =>
    link.addEventListener('click', () => setMenu(false)),
  );
  document.addEventListener('keydown', (event) => {
    // Mantém a navegação por teclado dentro do menu quando ele cobre a tela.
    if (event.key === 'Tab' && menu.classList.contains('open')) {
      const links = elements<HTMLAnchorElement>('a', menu);
      const first = links[0];
      const last = links.at(-1);
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === button)
      ) {
        event.preventDefault();
        (document.activeElement === button ? last : button)?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        button.focus();
      } else if (!event.shiftKey && document.activeElement === button) {
        event.preventDefault();
        first?.focus();
      }
    }
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
      button.focus();
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });
}
