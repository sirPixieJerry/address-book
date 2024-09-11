import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { FormStateClass, useFormState } from './useFormState';
import type { FormStateBase } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedFormState = <T>(name: string, defaultValues: T) =>
  new FormStateClass<T>(name, defaultValues);

const setFormState = <T extends FormStateBase>(
  name: string,
  defaultValues: T
) => {
  const store = useFormState<T>();
  const { setForm } = store;
  setForm(name, defaultValues);
  return store;
};

describe('useFormState', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with empty array formState', () => {
    const store = useFormState();
    expect(store.formState).toStrictEqual([]);
  });

  it('should set formState with default values', () => {
    const defaultValues = { name: 'John Doe', age: '30' };
    const exampleStore = setFormState<{ name: string; age: string }>(
      'exampleForm',
      defaultValues
    );

    expect(exampleStore.formState).toEqual([
      expectedFormState('exampleForm', defaultValues),
    ]);
  });

  it('should set formState with default values for two forms', () => {
    type FooType = { name: string; age: string };
    const fooValues = { name: 'John Doe', age: '30' };
    setFormState<FooType>('fooForm', fooValues);

    type BarType = { username: string; password: string };
    const barValues = { username: 'John', password: 'bar2024!' };
    setFormState<BarType>('barForm', barValues);

    const store = useFormState();

    expect(store.formState).toEqual([
      expectedFormState('fooForm', fooValues),
      expectedFormState('barForm', barValues),
    ]);
  });
});
