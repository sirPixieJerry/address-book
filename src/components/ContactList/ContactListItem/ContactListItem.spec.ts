import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactListItem from './ContactListItem.vue';
import { ContactAvatar } from '../ContactAvatar';

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
    {
      streetName: 'Beispielweg',
      streetNumber: '456',
      zipCode: '80331',
      city: 'München',
    },
  ],
  phoneNumbers: [
    {
      phoneNumber: '+49-30-1234567',
    },
    {
      phoneNumber: '+49-89-9876543',
    },
  ],
};

global.HTMLDialogElement.prototype.showModal = vi.fn();
global.HTMLDialogElement.prototype.close = vi.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    contact: mockContact,
    ...overrides,
  };
  return mount(ContactListItem, { props });
};

describe('When ContactGroup is mounted,', () => {
  describe('and a contact is provided.', () => {
    it('Then it should display a ContactAvatar.', () => {
      const wrapper = renderComponent();

      const avatarComponent = wrapper.findComponent(ContactAvatar);
      expect(avatarComponent.exists()).toBeTruthy();
    });

    it('Then it should display the name of the contact.', () => {
      const wrapper = renderComponent();

      const contactName = wrapper
        .find('li button')
        .findAll('p')
        .filter(
          (node) =>
            node.text() === `${mockContact.firstName} ${mockContact.lastName}`
        );
      expect(contactName.length).toBe(1);
      expect(contactName[0].exists()).toBeTruthy();
    });
  });

  // 🚩fix later!!! Find a reliable method to test the methods openDialog and closeDialog

  // describe('and the list item button is clicked.', () => {
  //   it('Then it should open the dialog.', async () => {
  //     const wrapper = renderComponent();

  //     console.log(wrapper.html());

  //     await wrapper.find('li button').trigger('click');

  //     const dialog = wrapper.find('dialog');
  //     expect(dialog.exists()).toBe(true);
  //     expect(dialog.isVisible()).toBe(true);
  //   });
  // });

  // describe('and the dialog is opened,', () => {
  //   describe('and the close button is clicked.', () => {
  //     it('Then it should close the dialog.', async () => {
  //       const wrapper = renderComponent();

  //       await wrapper.find('li button').trigger('click');

  //       const dialog = wrapper.find('dialog');
  //       expect(dialog.exists()).toBe(true);

  //       const foo = wrapper.find('dialog button'); //.trigger('click');
  //       console.log(foo.html());

  //       await foo.trigger('click');

  //       console.log(wrapper.html());

  //       // expect(dialog.exists()).toBe(false);
  //     });
  //   });
  // });
});
