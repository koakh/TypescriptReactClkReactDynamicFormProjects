import React from 'react';
import { Control, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DynamicFormElement, ValidationRules } from '../interfaces/dynamic-form.interface';
/**
 * get react hook form validation object
 * @param e dynamic form element
 * @returns react hook form validation object
 */
export declare const getValidateObject: (e: DynamicFormElement) => any;
/**
 * get react element nodes from errorMessages and validation for validate
 * @param e
 * @param errors
 * @returns rendered ReactNode
 */
export declare const getValidateErrorMessages: (e: DynamicFormElement, i18nFn: (input: string, startWith?: string) => string) => ValidationRules;
/**
 * get react element nodes from errorMessages and validation, used in non MUI elements and to verify that MUI errorMessages are consistent with non MUI errorMessages
 * @param e
 * @param errors
 * @returns rendered ReactNode
 */
export declare const getValidateErrorNodes: (e: DynamicFormElement, errors: FieldErrors<FieldValues>) => React.ReactNode;
export declare const getI18nValue: (i18nFn: (input: string, startWith?: string) => string, value: string, defaultValue?: string) => string;
export declare const getI18nElementValues: (i18nFn: (input: string, startWith?: string) => string, e: DynamicFormElement) => Partial<Pick<DynamicFormElement, "label" | "placeHolder" | "helperText" | "defaultValue">>;
export declare const generateElement: (e: DynamicFormElement, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, control: Control<FieldValues, any>, watch: UseFormWatch<FieldValues>, setValue: UseFormSetValue<FieldValues>, i18nFn: (input: string, startWith?: string) => string) => React.ReactNode;
