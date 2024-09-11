import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormSection from './FormSection.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    legend: 'label',
    ...overrides,
  };
  return mount(FormSection, { props });
};

describe('When FormSection is mounted,', () => {
  describe('and a legend prop is provided.', () => {
    it('Then it should render legend as a label.', () => {
      const wrapper = renderComponent();

      const legendLabel = wrapper.find('legend').text();

      expect(legendLabel).toBe('label');
    });
  });
});
