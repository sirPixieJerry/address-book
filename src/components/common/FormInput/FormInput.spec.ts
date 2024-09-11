import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type vi as viMock,
} from 'vitest';
import { mount } from '@vue/test-utils';
import FormInput from './FormInput.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useFormContext } from '@/components/CreateContactForm';

vi.mock('@/components/CreateContactForm/store/useFormContext', () => ({
  useFormContext: vi.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (overrides?: any) => {
  const props = {
    label: 'label',
    name: 'email',
    modelValue: 'email',
    ...overrides,
  };
  return mount(FormInput, { props });
};

describe('FormInput Component', () => {
  // @ts-ignore
  let mockSetRules: vi.Mock;
  // @ts-ignore
  let mockGetErrors: vi.Mock;

  beforeEach(() => {
    setActivePinia(createPinia());

    mockSetRules = vi.fn();
    mockGetErrors = vi.fn().mockReturnValue([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormContext as any).mockReturnValue({
      setRules: mockSetRules,
      getErrors: mockGetErrors,
    });
  });

  describe('when the FormInput is rendered with a label prop', () => {
    it('should display the label text', () => {
      const wrapper = renderComponent({ label: 'test-label' });
      expect(wrapper.text()).toContain('test-label');
    });
  });

  describe('when the FormInput is rendered with a name prop', () => {
    it('should set the name as the for attribute of the label and id attribute of the input', () => {
      const wrapper = renderComponent({ name: 'test-name' });

      const label = wrapper.find('label');
      expect(label.attributes('for')).toBe('test-name');

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('test-name');
    });
  });

  describe('when no type prop is provided', () => {
    it('should set the type attribute of the input to "text"', () => {
      const wrapper = renderComponent();
      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('text');
    });
  });

  describe('when a type prop is provided', () => {
    it.each([['text'], ['password'], ['email']])(
      'should set the type attribute of the input to "%s"',
      (type) => {
        const wrapper = renderComponent({ type });
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe(type);
      }
    );
  });

  describe('when rules prop is provided', () => {
    it('should call setRules with the provided rules', () => {
      const rules = { required: { value: true, message: 'Field is required' } };
      renderComponent({ name: 'username', rules });

      expect(mockSetRules).toHaveBeenCalledWith('username', rules);
    });

    it('should display the error message when there is an error', async () => {
      mockGetErrors.mockReturnValue([
        { field: 'email', message: 'Invalid email' },
      ]);

      const wrapper = renderComponent({ name: 'username' });
      await wrapper.vm.$nextTick();

      const helperText = wrapper.findComponent({ name: 'FormHelperText' });
      expect(helperText.exists()).toBe(true);
      expect(helperText.props('text')).toBe('Invalid email');
    });

    it('should not display the FormHelperText component when there is no error', async () => {
      mockGetErrors.mockReturnValue([]);

      const wrapper = renderComponent({ name: 'username' });
      await wrapper.vm.$nextTick();

      const helperText = wrapper.findComponent({ name: 'FormHelperText' });
      expect(helperText.exists()).toBe(false);
    });
  });
});
