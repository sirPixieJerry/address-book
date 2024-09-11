export const addRippleEffect = (button: HTMLButtonElement): void => {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  button.appendChild(ripple);

  const rect = button.getBoundingClientRect();
  const x = rect.width / 2 - ripple.offsetWidth / 2;
  const y = rect.height / 2 - ripple.offsetHeight / 2;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  setTimeout(() => {
    ripple.remove();
  }, 600);
};
