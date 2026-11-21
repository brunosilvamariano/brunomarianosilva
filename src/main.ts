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
const form = document.querySelector<HTMLFormElement>('#contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Olá, Bruno! Sou ${data.get('name')}.\nE-mail: ${data.get('email')}\nInteresse: ${data.get('service')}\n\n${data.get('message')}`;
  window.open(
    `https://wa.me/5547991597258?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  );
  const status = document.querySelector<HTMLElement>('#form-status');
  if (status) status.textContent = 'Sua mensagem está pronta. Conclua o envio no WhatsApp.';
});
document.querySelector('#year')!.textContent = String(new Date().getFullYear());

const servicePicker = document.querySelector<HTMLDetailsElement>('.service-picker');
const serviceSummary = servicePicker?.querySelector('summary');
document.querySelectorAll<HTMLInputElement>('.service-options input').forEach((radio) => {
  radio.addEventListener('change', () => {
    const value = document.querySelector('#service-value');
    if (value) value.textContent = radio.value;
    if (servicePicker) servicePicker.open = false;
    serviceSummary?.focus();
  });
  radio.addEventListener('invalid', () => {
    if (servicePicker) servicePicker.open = true;
  });
});
servicePicker?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    servicePicker.open = false;
    serviceSummary?.focus();
  }
});
