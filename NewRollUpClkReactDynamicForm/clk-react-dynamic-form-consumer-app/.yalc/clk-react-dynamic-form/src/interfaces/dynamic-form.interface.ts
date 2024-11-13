// match interfaces
// c3edu.online:/home/c3/ReactClkMicroPalFormToolsPoc/src/lib/dynamic-form.interface.ts
// c3edu.online:/home/c3/c3-backend/src/modules/micropal/tools/interfaces/dynamic-form.interface.ts

export interface ValidationRules {
  [key: string]: any;
}

export interface ValidationRule {
  [key: string]: Function | string;
}

export interface DynamicForm {
  elements: DynamicFormElement[];
  actions: { [key: string]: any };
  properties: { [key: string]: any };
  i18n: { [key: string]: any };
  prompts: { [key: string]: any };
}

export interface DynamicFormElementValidationRules {
  required?: boolean | string;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: string | { value: string; message: string };
  validate?: ValidationRules;
}

export interface DynamicFormElement {
  type: string;
  key: string;
  label: string;
  placeHolder?: string;
  helperText?: string;
  defaultValue: string | boolean | number | readonly string[] | undefined;
  options?: string | string[];
  visible?: string;
  attributes?: string;
  attributesFormControl?: string;
  validationRules?: DynamicFormElementValidationRules;
}