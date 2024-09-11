import { describe, it, expect } from 'vitest';
import { getAvatarColor } from './getAvatarColor';

const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#33FFF5',
  '#F5FF33',
];

const contact = {
  firstName: 'Max',
  lastName: 'Mustermann',
};

describe('getAvatarColor', () => {
  it('should return a color from the colors array', () => {
    const color = getAvatarColor(contact.firstName, contact.lastName);
    expect(colors).toContain(color);
  });
});
