import { describe, it, expect } from 'vitest';
import { getInitials } from './getInitials';

const contact = {
  firstName: 'Max',
  lastName: 'Mustermann',
};

describe('getInitials', () => {
  it('should return the correct initials', () => {
    const initials = getInitials(contact.firstName, contact.lastName);
    expect(initials).toBe('MM');
  });
});
