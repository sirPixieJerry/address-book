import { expect } from 'vitest';
import { useFormContext } from '../useFormContext';
import type { RuleOptionsType } from '../types';
import type { MockFormType } from '../useFormContext.spec';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addRuleToForm = (
  mockFormName: string,
  field: string,
  rules: RuleOptionsType
): void => {
  const { setRules } = useFormContext<MockFormType>(mockFormName);
  setRules(field, rules);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRulesByField = (mockFormName: string, field: string): any => {
  const { getForm } = useFormContext<MockFormType>(mockFormName);
  const store = getForm(mockFormName);
  return store?.rules.find((item) => item.field === field);
};

export const assertFieldRules = (
  mockFormName: string,
  fieldName: string,
  rules: RuleOptionsType
) => {
  addRuleToForm(mockFormName, fieldName, rules);
  const field = getRulesByField(mockFormName, fieldName);
  expect(field?.rules).toStrictEqual(rules);
};
