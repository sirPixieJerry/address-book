import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useFormContext } from './useFormContext';
import { createPinia, setActivePinia } from 'pinia';
import { useFormState } from './useFormState';
import {
  addRule,
  addRuleToForm,
  assertFieldRules,
  initializeForm,
} from './testing-tools';

const mockFormName = 'mockForm';
const requiredRule = {
  required: { value: true, message: 'Email is required' },
};
const validateRule = {
  validate: {
    callback: (value: string) => value.includes('@'),
    message: 'Invalid email',
  },
};
const item = { foo: '', bar: '' };

type ArrayFieldType = {
  foo: string;
  bar: string;
};

export type MockFormType = {
  name: string;
  email: string;
  arrayField: ArrayFieldType[];
};

const mockFormValues = {
  name: '',
  email: '',
  arrayField: [item],
};

describe('useFormContext', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const { setForm } = useFormState<MockFormType>();
    setForm(mockFormName, mockFormValues);
  });

  describe('addRule', () => {
    it('should register a required rule', () => {
      const fieldName = 'email';
      assertFieldRules(mockFormName, fieldName, { ...requiredRule });
    });

    it('should register a validation rule', () => {
      const fieldName = 'email';
      assertFieldRules(mockFormName, fieldName, { ...validateRule });
    });

    it('should register multiple rules', () => {
      const fieldName = 'email';
      assertFieldRules(mockFormName, fieldName, {
        ...requiredRule,
        ...validateRule,
      });
    });

    it('should not register rules twice', () => {
      const fieldName = 'email';
      addRuleToForm(mockFormName, fieldName, { ...requiredRule });
      addRuleToForm(mockFormName, fieldName, { ...requiredRule });
      const { getForm } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      expect(store?.rules[0]).toStrictEqual({
        field: fieldName,
        rules: { ...requiredRule },
      });
    });
  });

  describe('setError', () => {
    it('should set an error object with error message', () => {
      const fieldName = 'email';
      const message = 'Email is required';
      const { getForm, setError } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      setError(fieldName, message);

      expect(store?.errors).toStrictEqual([{ field: fieldName, message }]);
    });
  });

  describe('validateForm', () => {
    it('should clear errors before validating fields', () => {
      const fieldName = 'email';
      const error = { field: fieldName, message: 'Email is required' };
      const { store, validateForm } = initializeForm(mockFormName);

      store?.errors.push(error);
      expect(store?.errors).toStrictEqual([error]);

      validateForm();
      expect(store?.errors).toStrictEqual([]);
    });

    it('should handle required rule and set appropriate error', () => {
      const fieldName = 'email';
      const rule = { field: fieldName, rules: { ...requiredRule } };
      const { store, validateForm } = initializeForm(mockFormName);

      addRule(store, rule);

      validateForm();
      expect(store?.errors).toStrictEqual([
        { field: fieldName, message: requiredRule.required.message },
      ]);
    });

    it('should handle validate rule and set appropriate error', () => {
      const fieldName = 'email';
      const rule = { field: fieldName, rules: { ...validateRule } };
      const { store, validateForm } = initializeForm(mockFormName);

      addRule(store, rule);

      validateForm();
      expect(store?.errors).toStrictEqual([
        { field: fieldName, message: validateRule.validate.message },
      ]);
    });

    it('should throw an error if fieldValue is not a string', () => {
      const fieldName = 'arrayField';
      const rule = { field: fieldName, rules: { ...validateRule } };
      const { store, validateForm } = initializeForm(mockFormName);

      if (!store) return;

      addRule(store, rule);

      expect(() => validateForm()).toThrow(
        `Value of ${fieldName} is not a string.`
      );
    });
  });

  describe('getErrors', () => {
    it('should return errors of selected field', () => {
      const errorEmailRequired = {
        field: 'email',
        message: 'Email is required',
      };
      const errorEmailInvalid = { field: 'email', message: 'Invalid email' };
      const { getForm, getErrors } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      store.errors = [errorEmailRequired, errorEmailInvalid];

      const errors = getErrors('email');
      expect(errors).toStrictEqual([errorEmailRequired, errorEmailInvalid]);
    });
  });

  describe('addItem', () => {
    it('should add an item to the given field', () => {
      const { getForm, addItem } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      addItem('arrayField', item);

      const array = store.formValues.arrayField;
      expect(array).toStrictEqual([item, item]);
    });

    it('should throw an error if the given field is no array', () => {
      const fieldName = 'name';
      const { getForm, addItem } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      expect(() => addItem(fieldName, item)).toThrow(
        `Value of ${fieldName} is not an array.`
      );
    });
  });

  describe('removeItem', () => {
    it('should add an item to the given field', () => {
      const { getForm, removeItem } =
        useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      removeItem('arrayField');

      const array = store.formValues.arrayField;
      expect(array).toStrictEqual([item]);
    });

    it('should throw an error if the given field is no array', () => {
      const fieldName = 'name';
      const { getForm, removeItem } =
        useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      expect(() => removeItem(fieldName)).toThrow(
        `Value of ${fieldName} is not an array.`
      );
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      const { getForm } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      store.formValues.name = 'John Doe';
      store.formValues.email = 'john.doe@example.com';
    });

    afterEach(() => {
      const { getForm } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      store.formValues.name = '';
      store.formValues.email = '';
    });

    it('should clear a field value by given field name', () => {
      const fieldName = 'name';
      const { getForm, reset } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      reset(fieldName);

      expect(store.formValues).toStrictEqual({
        name: '',
        email: 'john.doe@example.com',
        arrayField: [item],
      });
    });

    it('should clear a field value by given array of field names', () => {
      const fieldNames = ['name', 'email'];
      const { getForm, reset } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      reset(fieldNames);

      expect(store.formValues).toStrictEqual({
        name: '',
        email: '',
        arrayField: [item],
      });
    });

    it('should clear all field values by given undefined', () => {
      const { getForm, reset } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      reset();

      expect(store.formValues).toStrictEqual({
        name: '',
        email: '',
        arrayField: [item],
      });
    });
  });

  describe('clearErrors', () => {
    beforeEach(() => {
      const { getForm } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      store.errors = [
        { field: 'name', message: 'Username needed' },
        { field: 'email', message: 'Invalid email' },
      ];
    });

    afterEach(() => {
      const { getForm } = useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;

      store.errors = [];
    });

    it('should clear a field errors by given field name', () => {
      const fieldName = 'name';
      const { getForm, clearErrors } =
        useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      clearErrors(fieldName);

      expect(store.errors).toStrictEqual([
        { field: 'email', message: 'Invalid email' },
      ]);
    });

    it('should clear a field errors by given array of field names', () => {
      const fieldNames = ['name', 'email'];
      const { getForm, clearErrors } =
        useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      clearErrors(fieldNames);

      expect(store.errors).toStrictEqual([]);
    });

    it('should clear all field errors by given undefined', () => {
      const { getForm, clearErrors } =
        useFormContext<MockFormType>(mockFormName);
      const store = getForm(mockFormName);

      if (!store) return;
      clearErrors();

      expect(store.errors).toStrictEqual([]);
    });
  });
});
