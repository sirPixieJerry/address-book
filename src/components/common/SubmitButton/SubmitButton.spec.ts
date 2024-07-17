import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import SubmitButton from './SubmitButton.vue';

const renderComponet = (overrides?: any) => {
  const props = {
    label: 'test-label',
    ...overrides,
  };
  return mount(SubmitButton, { props: props });
};

describe('When the SubmitButton is ', () => {
  describe('and a label text is provided.', () => {
    it('Then it should display the correct label text.', () => {
      const wrapper = renderComponet();
      expect(wrapper.text()).toContain('test-label');
    });
  });
});
