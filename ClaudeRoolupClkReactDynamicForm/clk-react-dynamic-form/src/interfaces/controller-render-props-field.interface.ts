// required to prevent
// src/index.ts → dist/index.js, dist/index.esm.js...
// (!) Plugin typescript: @rollup/plugin-typescript TS7031: Binding element 'field' implicitly has an 'any' type.
// src/lib/dynamic-form.tsx: (451:22)

// 451           render={({ field }) => (
//                          ~~~~~

// (!) Plugin replace: @rollup/plugin-replace: 'preventAssignment' currently defaults to false. It is recommended to set this option to `true`, as the next major version will default this option to `true`.
// created dist/index.js, dist/index.esm.js in 8.9s

import { FieldError, FieldValues, ChangeHandler, BlurHandler, FormState } from 'react-hook-form';

interface ControllerRenderProps<TFieldValues extends FieldValues = FieldValues> {
  field: {
    onChange: ChangeHandler;
    onBlur: BlurHandler;
    name: string;
    value: unknown;
    ref: React.Ref<HTMLInputElement>;
  };
  fieldState: {
    invalid: boolean;
    isTouched: boolean;
    isDirty: boolean;
    error?: FieldError;
  };
  formState: FormState<TFieldValues>;
}

export { ControllerRenderProps };