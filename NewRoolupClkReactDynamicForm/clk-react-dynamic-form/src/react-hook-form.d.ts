// prevent WARN
// (!) Plugin typescript: @rollup/plugin-typescript TS2305: Module '"react-hook-form"' has no exported member 'FieldErrors'.
// src/lib/dynamic-form.tsx: (4:31)
// 4 import { Control, Controller, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
//
// This is related to a type mismatch between the types exported by the react-hook-form package and the types used in your code.
//
// require in tsconfig.ts
// "include": [ "react-hook-form.d.ts" ],
//
// This approach of adding a type declaration file is a common way to handle cases where 
// the types exported by a dependency don't match the types used in your code.
// By providing the correct type definitions, you can ensure that your package's
// TypeScript compilation works as expected.
declare module 'react-hook-form' {
  import { FieldError, FieldValues, UseFormRegister, SubmitHandler, Control, Controller } from 'react-hook-form';

  export {
    BlurHandler, 
    ChangeHandler, 
    Control,
    Controller,
    FieldError,
    FieldErrors,
    FieldValues,
    FormState,
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
  };
}