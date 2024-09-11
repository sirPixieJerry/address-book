import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SubmitButton from './SubmitButton.vue';
import { IconSave } from '../../icons';
import { markRaw } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    label: 'label',
    ...overrides,
  };
  return mount(SubmitButton, { props });
};

describe('When the SubmitButton is rendered,', () => {
  describe('and a label prop is provided.', () => {
    it('Then it should display the correct label text.', () => {
      const wrapper = renderComponent({ label: 'test-label' });

      expect(wrapper.text()).toContain('test-label');
    });
  });

  describe('and a disabled prop is not provided.', () => {
    it('Then it should not disable the button.', () => {
      const wrapper = renderComponent();

      expect(wrapper.attributes('disabled')).toBe(undefined);
    });
  });

  describe('and a disabled prop "true" is provided.', () => {
    it('Then it should disable the button.', () => {
      const wrapper = renderComponent({ disabled: true });

      expect(wrapper.attributes('disabled')).toBe('');
    });
  });

  describe('and a disabled prop "false" is provided.', () => {
    it('Then it should not disable the button.', () => {
      const wrapper = renderComponent();

      expect(wrapper.attributes('disabled')).toBe(undefined);
    });
  });

  describe('and a icon prop is provided.', () => {
    it('Then it should render the icon.', () => {
      const wrapper = renderComponent({ icon: markRaw(IconSave) });

      const icon = wrapper.findComponent(IconSave);

      expect(icon.exists()).toBe(true);
    });
  });
});
