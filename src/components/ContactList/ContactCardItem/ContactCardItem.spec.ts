import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactCardItem from './ContactCardItem.vue';
import IconEmail from '../../icons/IconEmail.vue';
import { markRaw } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    icon: markRaw(IconEmail),
    index: 0,
    ...overrides,
  };
  const slots = {
    default: '<p class="slot-content">Hello World</p>',
  };
  return mount(ContactCardItem, { props, slots });
};

describe('When MyComponent is mounted,', () => {
  describe('and a icon is passed as a prop,', () => {
    describe('and the index 0 is passed as a prop.', () => {
      it('Then it renders the icon component.', () => {
        const wrapper = renderComponent();

        const iconWrapper = wrapper.find('.icon-wrapper');
        expect(iconWrapper.exists()).toBe(true);

        const iconComponent = iconWrapper.findComponent(IconEmail);
        expect(iconComponent.exists()).toBe(true);
      });
    });

    describe('and the index bigger than 0 is passed as a prop.', () => {
      it('Then it dos not render the icon component.', () => {
        const wrapper = renderComponent({ index: 1 });

        const iconWrapper = wrapper.find('.icon-wrapper');
        expect(iconWrapper.exists()).toBe(true);
        expect(iconWrapper.html()).not.toContain('aria-label="schließen"');
        expect(iconWrapper.findComponent(IconEmail).exists()).toBe(false);
      });
    });
  });

  describe('and the default slot contant is provided.', () => {
    it('Then it renders the default slot content correctly.', () => {
      const wrapper = renderComponent();

      const slotContent = wrapper.find('.slot-content');
      expect(slotContent.exists()).toBe(true);
      expect(slotContent.text()).toBe('Hello World');
    });
  });
});
