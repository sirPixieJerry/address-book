export const addRippleEffect = (
  button: HTMLButtonElement,
  event: MouseEvent
): void => {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  button.appendChild(ripple);

  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left - ripple.offsetWidth / 2;
  const y = event.clientY - rect.top - ripple.offsetHeight / 2;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  setTimeout(() => {
    ripple.remove();
  }, 600);
};
