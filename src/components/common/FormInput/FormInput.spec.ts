import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import FormInput from './FormInput.vue';

const renderComponent = (overrides?: any) => {
  const props = {
    label: 'label',
    name: 'name',
    ...overrides,
  };
  return mount(FormInput, { props: props });
};

describe('When the FormInput is rendered,', () => {
  describe('and a label prop is provided.', () => {
    it('Then it should display the label text.', () => {
      const wrapper = renderComponent({ label: 'test-label' });
      expect(wrapper.text()).toContain('test-label');
    });
  });

  describe('and a name prop is provided.', () => {
    it('Then it should set the name as the for attribute of the label and id attribute of the input.', () => {
      const wrapper = renderComponent({ name: 'test-name' });

      const label = wrapper.find('label');
      expect(label.attributes('for')).toBe('test-name');

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('test-name');
    });
  });

  describe('and no type prop is provided.', () => {
    it('Then it should set the type attribute of the input to "text".', () => {
      const wrapper = renderComponent();

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('text');
    });
  });

  describe('and a type prop "text" is provided.', () => {
    it('Then it should set the type attribute of the input to "text".', () => {
      const wrapper = renderComponent({ type: 'text' });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('text');
    });
  });

  describe('and a type prop "password" is provided.', () => {
    it('Then it should set the type attribute of the input to "password".', () => {
      const wrapper = renderComponent({ type: 'password' });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('password');
    });
  });

  describe('and a type prop "email" is provided.', () => {
    it('Then it should set the type attribute of the input to "email".', () => {
      const wrapper = renderComponent({ type: 'email' });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('email');
    });
  });

  describe('and no required prop is provided.', () => {
    it('Then it should set the required attribute of the input to "false".', () => {
      const wrapper = renderComponent();

      const input = wrapper.find('input');
      expect(input.attributes('required')).toBe(undefined);
    });
  });

  describe('and no required prop is provided.', () => {
    it('Then it should set the required attribute of the input to "false".', () => {
      const wrapper = renderComponent({ required: true });

      const input = wrapper.find('input');
      expect(input.attributes('required')).toBe('');
    });
  });
});
