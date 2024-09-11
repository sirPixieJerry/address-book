import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactAvatar from './ContactAvatar.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    firstName: 'Max',
    lastName: 'Mustermann',
    ...overrides,
  };
  return mount(ContactAvatar, { props });
};

describe('When ContactAvatar is mounted,', () => {
  describe('and a first- and lastname is provided.', () => {
    it('Then it should render the correct initials.', () => {
      const wrapper = renderComponent();

      const initials = wrapper.find('p');
      expect(initials.text()).toBe('MM');
    });
  });

  describe('and no size property is provided.', () => {
    it('Then the component should have teh small-avatar class', async () => {
      const wrapper = renderComponent();

      const divElement = wrapper.find('div');

      expect(divElement.classes('small-avatar')).toBe(true);
    });
  });

  describe('and no size property small is provided.', () => {
    it('Then the component should have teh small-avatar class', async () => {
      const wrapper = renderComponent({ size: 'small' });

      const divElement = wrapper.find('div');

      expect(divElement.classes('small-avatar')).toBe(true);
    });
  });

  describe('and no size property large is provided.', () => {
    it('Then the component should have teh small-avatar class', async () => {
      const wrapper = renderComponent({ size: 'large' });

      const divElement = wrapper.find('div');

      expect(divElement.classes('large-avatar')).toBe(true);
    });
  });
});
