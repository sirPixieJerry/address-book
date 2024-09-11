import type { ErrorType, FormStateBase, RuleOptionsType } from './types';
import { useFormState } from './useFormState';

export const useFormContext = <T extends FormStateBase>(formName: string) => {
  const { getForm } = useFormState<T>();

  // 🚩figure out how to prevent repeated null checks for form

  const clearErrors = (name?: string | string[]) => {
    const form = getForm(formName);
    if (!form) return;

    const clearErrorsByField = (field: string) => {
      return form.errors.filter((item) => item.field !== field);
    };

    switch (true) {
      case typeof name === 'string':
        form.errors = clearErrorsByField(name);
        break;
      case Array.isArray(name):
        name.forEach((field) => {
          form.errors = clearErrorsByField(field);
        });
        break;
      default:
        form.errors.splice(0, form.errors.length);
        break;
    }
  };

  const setError = (field: string, message: string): void => {
    const form = getForm(formName);
    form?.errors.push({ field, message });
  };

  const getErrors = (field: string): ErrorType[] => {
    const form = getForm(formName);
    if (!form) return [];
    return [...form.errors].filter((item) => item.field === field);
  };

  const validateForm = (): void => {
    const form = getForm(formName);
    clearErrors();
    form?.rules.forEach(({ field, rules }) => {
      if (!form.formValues) return;
      if (!(typeof form.formValues[field] === 'string')) {
        throw new Error(`Value of ${field} is not a string.`);
      }

      const value = form.formValues[field];

      switch (true) {
        case !!rules?.required?.value && !value:
          setError(field, rules.required.message);
          break;
        case !!rules?.validate && !rules.validate.callback(value):
          setError(field, rules.validate.message);
          break;
        default:
          break;
      }
    });
  };

  const setRules = (field: string, rules: RuleOptionsType): void => {
    const form = getForm(formName);
    const formRules = form?.rules;
    if (formRules?.some((item) => item.field === field)) return;
    const ruleObject: { field: string; rules: RuleOptionsType } = {
      field,
      rules,
    };
    form?.rules.push(ruleObject);
  };

  const addItem = (field: string, item: { [key: string]: string }): void => {
    const form = getForm(formName);
    const arrayField = form?.formValues[field];
    if (!Array.isArray(arrayField)) {
      throw new Error(`Value of ${field} is not an array.`);
    }
    arrayField.push(item);
  };

  const removeItem = (field: string) => {
    const form = getForm(formName);
    const arrayField = form?.formValues[field];
    if (!Array.isArray(arrayField)) {
      throw new Error(`Value of ${field} is not an array.`);
    }
    if (arrayField.length > 1) {
      arrayField.pop();
    }
  };

  const reset = (field?: string | string[]) => {
    const form = getForm(formName);
    if (!form) return;

    const resetValueByField = (field: string) => {
      // 🚩fix TS error and ask Ben
      form.formValues[field] = form.defaultValues[field];
    };

    switch (true) {
      case typeof field === 'string':
        resetValueByField(field);
        break;
      case Array.isArray(field):
        field.forEach((field) => resetValueByField(field));
        break;
      default:
        form.formValues = JSON.parse(JSON.stringify(form.defaultValues));
        break;
    }
  };

  return {
    addItem,
    clearErrors,
    getErrors,
    getForm,
    removeItem,
    reset,
    setError,
    setRules,
    validateForm,
  };
};
