import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import FormHelperText from './FormHelperText.vue';

const renderComponent = (overrides?: any) => {
  const props = {
    text: 'text',
    ...overrides,
  };
  return mount(FormHelperText, { props: props });
};

describe('When the FormHelperText component is rendered,', () => {
  describe('and a text prop is provided.', () => {
    it('Then it should display the text.', () => {
      const wrapper = renderComponent({ text: 'I am important!' });
      expect(wrapper.text()).toContain('I am important!');
    });
  });
});
