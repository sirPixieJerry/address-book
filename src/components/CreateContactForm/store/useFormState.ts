import { defineStore } from 'pinia';
import { ref, type UnwrapRef } from 'vue';
import type { ErrorType, FormStateBase, RegisteredRuleType } from './types';

export type FormStateType<T> = {
  name: string;
  defaultValues: T;
  formValues: T;
  errors: ErrorType[];
  rules: RegisteredRuleType[];
};

export class FormStateClass<T> {
  name: string;
  defaultValues: UnwrapRef<T>;
  formValues: UnwrapRef<T>;
  errors: ErrorType[] = [];
  rules: RegisteredRuleType[] = [];

  constructor(name: string, defaultValues: T) {
    this.name = name;
    this.defaultValues = JSON.parse(JSON.stringify(defaultValues));
    this.formValues = JSON.parse(JSON.stringify(defaultValues));
  }
}

export const useFormState = <T extends FormStateBase>() => {
  return defineStore('formState', () => {
    const formState = ref<FormStateType<T>[]>([]);

    const setForm = (name: string, defaultValues: T) => {
      if (formState.value.some((item) => item.name === name)) return;
      const formStateInstance = new FormStateClass<T>(name, defaultValues);
      formState.value.push(formStateInstance);
    };

    const getForm = (name: string) => {
      return formState.value.find((item) => item.name === name);
    };

    return {
      formState,
      setForm,
      getForm,
    };
  })();
};
