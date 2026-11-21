import './styles/main.css';

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
filters.forEach((button) =>
  button.addEventListener('click', () => {
    filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    document.querySelectorAll<HTMLElement>('[data-category]').forEach((project) => {
      project.hidden =
        button.dataset.filter !== 'todos' && project.dataset.category !== button.dataset.filter;
    });
  }),
);

document.querySelector('#year')!.textContent = String(new Date().getFullYear());

import './styles/refinements.css';
