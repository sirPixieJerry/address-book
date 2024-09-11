import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconButton from './IconButton.vue';
import { IconClose } from '../../icons';
import { markRaw } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    icon: markRaw(IconClose),
    ...overrides,
  };
  return mount(IconButton, { props });
};

describe('When IconButton is rendered,', () => {
  describe('and a icon prop is provided.', () => {
    it('Then it should display the correct icon.', () => {
      const wrapper = renderComponent();

      const icon = wrapper.findComponent(IconClose);
      expect(icon.exists()).toBe(true);
    });
  });
});
