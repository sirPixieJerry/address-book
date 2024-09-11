import { describe, it, expect } from 'vitest';
import type { ContactType } from '../../types';
import { sortContactsByLastname } from './sortContactsByLastname';

describe('sortContactsByLastname', () => {
  it('should sort contacts by last name in ascending order', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        addresses: [],
        phoneNumbers: [],
      },
    ];

    const sortedContacts = sortContactsByLastname(contacts);

    expect(sortedContacts[0].lastName).toBe('Doe');
    expect(sortedContacts[1].lastName).toBe('Johnson');
    expect(sortedContacts[2].lastName).toBe('Smith');
  });

  it('should handle an empty contacts array', () => {
    const contacts: ContactType[] = [];

    const sortedContacts = sortContactsByLastname(contacts);

    expect(sortedContacts).toEqual([]);
  });

  it('should handle contacts with the same last name', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        addresses: [],
        phoneNumbers: [],
      },
    ];

    const sortedContacts = sortContactsByLastname(contacts);

    expect(sortedContacts[0].lastName).toBe('Doe');
    expect(sortedContacts[1].lastName).toBe('Doe');
    expect(sortedContacts[2].lastName).toBe('Smith');
  });

  it('should be a pure function (original array should not be modified)', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        addresses: [],
        phoneNumbers: [],
      },
    ];

    const originalContacts = [...contacts];

    sortContactsByLastname(contacts);

    expect(contacts).toEqual(originalContacts);
  });
});
