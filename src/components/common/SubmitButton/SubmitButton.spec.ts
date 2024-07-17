import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import SubmitButton from './SubmitButton.vue';

const renderComponent = (overrides?: any) => {
  const props = {
    label: 'label',
    ...overrides,
  };
  return mount(SubmitButton, { props: props });
};

describe('When the SubmitButton is ', () => {
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
      const wrapper = renderComponent({ disabled: 'true' });
      expect(wrapper.attributes('disabled')).toBe('');
    });
  });

  describe('and a disabled prop "false" is provided.', () => {
    it('Then it should not disable the button.', () => {
      const wrapper = renderComponent();
      expect(wrapper.attributes('disabled')).toBe(undefined);
    });
  });
});
