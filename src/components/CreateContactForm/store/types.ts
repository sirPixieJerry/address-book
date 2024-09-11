export type RuleType = {
  value: boolean;
  message: string;
};

export type ValidationCallbackType = (value: string) => boolean;

export type ValidationRuleType = {
  callback: ValidationCallbackType;
  message: string;
};

export type RuleOptionsType = {
  required?: RuleType;
  validate?: ValidationRuleType;
};

export type RegisteredRuleType = {
  field: string;
  rules: RuleOptionsType;
};

export type ErrorType = {
  field: string;
  message: string;
};

export type FormStateBase = {
  [key: string]: string | Array<{ [key: string]: string }>;
};
