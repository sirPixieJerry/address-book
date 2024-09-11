import { describe, it, expect } from 'vitest';
import type { ContactType, GroupedContactsType } from '../../types';
import { groupContacts } from './groupContacts';

describe('groupContacts', () => {
  it('should group contacts by the first letter of their last name', () => {
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
      {
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bob.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
    ];

    const groupedContacts: GroupedContactsType = groupContacts(contacts);

    expect(groupedContacts['D']).toHaveLength(2);
    expect(groupedContacts['J']).toHaveLength(1);
    expect(groupedContacts['S']).toHaveLength(1);
  });

  it('should return an empty object when no contacts are provided', () => {
    const contacts: ContactType[] = [];

    const groupedContacts: GroupedContactsType = groupContacts(contacts);

    expect(groupedContacts).toEqual({});
  });

  it('should sort contacts within each group by last name', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bob.doe@example.com',
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

    const groupedContacts: GroupedContactsType = groupContacts(contacts);

    expect(groupedContacts['D']).toHaveLength(2);
    expect(groupedContacts['D'][0].firstName).toBe('John');
    expect(groupedContacts['D'][1].firstName).toBe('Bob');
    expect(groupedContacts['S'][0].firstName).toBe('Jane');
    expect(groupedContacts['J'][0].firstName).toBe('Alice');
  });

  it('should handle contacts with last names starting with different cases correctly', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'John',
        lastName: 'doe',
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
        lastName: 'johnson',
        email: 'alice.johnson@example.com',
        addresses: [],
        phoneNumbers: [],
      },
      {
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bob.doe@example.com',
        addresses: [],
        phoneNumbers: [],
      },
    ];

    const groupedContacts: GroupedContactsType = groupContacts(contacts);

    expect(groupedContacts['D']).toHaveLength(2);
    expect(groupedContacts['J']).toHaveLength(1);
    expect(groupedContacts['S']).toHaveLength(1);
  });

  it('should handle non-alphabetic characters in last names', () => {
    const contacts: ContactType[] = [
      {
        firstName: 'John',
        lastName: "O'Connor",
        email: 'john.oconnor@example.com',
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

    const groupedContacts: GroupedContactsType = groupContacts(contacts);

    expect(groupedContacts['O']).toHaveLength(1);
    expect(groupedContacts['S']).toHaveLength(1);
    expect(groupedContacts['J']).toHaveLength(1);
  });
});
