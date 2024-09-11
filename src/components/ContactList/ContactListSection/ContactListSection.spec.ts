import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactGroup from './ContactListSection.vue';
import { ContactListItem } from '../ContactListItem';

const mockContacts = [
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
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    letter: 'A',
    contacts: [],
    ...overrides,
  };
  return mount(ContactGroup, { props });
};

describe('When ContactGroup is mounted,', () => {
  describe('and a letter prop is provided.', () => {
    it('Then it should render the letter as h2 element.', () => {
      const wrapper = renderComponent();

      const header = wrapper.find('h2');
      expect(header.text()).toBe('A');
    });

    it('should correctly bind the letter to aria-labelledby', () => {
      const wrapper = renderComponent();

      const ulElement = wrapper.find('ul');
      expect(ulElement.attributes('aria-labelledby')).toBe('group-A');
    });

    it('should correctly bind the letter to id', () => {
      const wrapper = renderComponent();

      const h2Element = wrapper.find('h2');
      expect(h2Element.attributes('id')).toBe('group-A');
    });
  });

  describe('and an array of contacts is provided.', () => {
    it('Then it should render the ContactListItem N times', () => {
      const wrapper = renderComponent({ contacts: mockContacts });

      const listItemComponents = wrapper.findAllComponents(ContactListItem);
      expect(listItemComponents.length).toBe(mockContacts.length);
    });
  });
});
