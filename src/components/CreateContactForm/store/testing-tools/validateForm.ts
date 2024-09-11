import { expect } from 'vitest';
import { useFormContext } from '../useFormContext';
import type { MockFormType } from '../useFormContext.spec';

export const initializeForm = (mockFormName: string) => {
  const { getForm, validateForm } = useFormContext<MockFormType>(mockFormName);
  const store = getForm(mockFormName);
  return { store, validateForm };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addRule = (store: any, rule: any) => {
  store?.rules.push(rule);
  expect(store?.rules).toStrictEqual([rule]);
};
