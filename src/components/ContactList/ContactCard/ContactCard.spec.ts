import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactCard from './ContactCard.vue';
import ContactAvatar from '../ContactAvatar/ContactAvatar.vue';
import { ContactCardItem } from '../ContactCardItem';
import { IconEmail, IconHomeWork, IconLocalPhone } from '../../icons';

const mockContact = {
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max.mustermann@example.com',
  addresses: [
    {
      streetName: 'Musterstraße',
      streetNumber: '123',
      zipCode: '10115',
      city: 'Berlin',
    },
  ],
  phoneNumbers: [
    {
      phoneNumber: '+49-30-1234567',
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    contact: mockContact,
    closeDialog: vi.fn(),
    ...overrides,
  };
  return mount(ContactCard, { props });
};

describe('When ContactCard is mounted,', () => {
  describe('and a contact prop is provided,', () => {
    it('Then it renders the ContactAvatar component.', () => {
      const wrapper = renderComponent();

      const avatarComponent = wrapper.findComponent(ContactAvatar);
      expect(avatarComponent.exists()).toBe(true);
    });

    it('Then it renders the name of the contact.', () => {
      const wrapper = renderComponent();

      const nameElement = wrapper.find('.contact-name');
      expect(nameElement.text()).toBe(
        `${mockContact.firstName} ${mockContact.lastName}`
      );
    });

    it('Then it renders the email of the contact.', () => {
      const wrapper = renderComponent();

      const emailItem = wrapper.findComponent(ContactCardItem);
      const emailLink = emailItem.find('a.email');

      expect(emailItem.props('icon')).toBe(IconEmail);
      expect(emailLink.attributes('href')).toBe(`mailto:${mockContact.email}`);
      expect(emailLink.text()).toBe(mockContact.email);
    });

    describe('and an address is provided.', () => {
      it('Then it renders the address of the contact.', () => {
        const wrapper = renderComponent();
        const address = mockContact.addresses[0];

        const addressItem = wrapper
          .findAllComponents({ name: 'ContactCardItem' })
          .at(1);
        if (!addressItem) return;
        const addressText = addressItem.find('address.address').text();

        expect(addressItem.props('icon')).toBe(IconHomeWork);
        expect(addressText).toContain(
          `${address.streetName} ${address.streetNumber}`
        );
        expect(addressText).toContain(`${address.zipCode} ${address.city}`);
      });
    });

    describe('and a phone number is provided.', () => {
      it('Then it renders the phone number of the contact.', () => {
        const wrapper = renderComponent();
        const phoneNumber = mockContact.phoneNumbers[0];

        const phoneNumberItem = wrapper
          .findAllComponents({ name: 'ContactCardItem' })
          .at(2);
        if (!phoneNumberItem) return;
        const phoneNumberLink = phoneNumberItem.find('a');

        expect(phoneNumberItem.props('icon')).toBe(IconLocalPhone);
        expect(phoneNumberLink.attributes('href')).toBe(
          `tel:${phoneNumber.phoneNumber}`
        );
        expect(phoneNumberLink.text()).toBe(phoneNumber.phoneNumber);
      });
    });

    describe('and no phone number or address is provided.', () => {
      it('Then it does not render a phone number or address', () => {
        const wrapper = renderComponent({
          contact: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            addresses: [],
            phoneNumbers: [],
          },
        });

        expect(
          wrapper.findAllComponents({ name: 'ContactCardItem' }).length
        ).toBe(1); // Only email
      });
    });
  });
});
