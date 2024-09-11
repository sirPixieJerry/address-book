import { describe, it, expect } from 'vitest';
import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co',
      'user+name@domain.com',
      'user@sub.domain.com',
      'user123@domain.org',
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  it('should return false for invalid email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain.c',
      'username@domain..com',
      'username@domain.c@domain.com',
      'username@domain,com',
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  it('should return false for empty email', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('should return false for email with only spaces', () => {
    expect(validateEmail('   ')).toBe(false);
  });
});
