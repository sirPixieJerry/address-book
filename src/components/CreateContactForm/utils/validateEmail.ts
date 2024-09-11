export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const domainPart = email.split('@')[1];
  if (domainPart && /\.\./.test(domainPart)) {
    return false;
  }
  return emailRegex.test(email);
};
