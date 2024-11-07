import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DynamicFormElementType } from './enums';
import { DynamicFormElement, ValidationRule, ValidationRules } from './interfaces/dynamic-form.interface';
import { parseValidationRules } from './utils/main';
import { DynamicTextFieldProps } from './interfaces';

/**
 * get react hook form validation object
 * @param e dynamic form element
 * @returns react hook form validation object
 */
export const getValidateObject = (e: DynamicFormElement): any => {
  // NOTE: we don't need this because we always work with array of ValidationRule objects, this will contain the required errorMessage 
  // if (typeof e.validationRules?.validate === 'string') {
  //   console.log(`key: ${e.key}, validation string: ${JSON.stringify(e.validationRules?.validate)}`);
  //   return createFunctionFromString(e.validationRules?.validate);
  // }
  let result: { [key: string]: Function | string } = {};
  if (e.validationRules?.validate && Array.isArray(e.validationRules?.validate)) {
    const validationRules = parseValidationRules(e.validationRules?.validate);
    // console.log(`key: ${e.key}, validation array: ${JSON.stringify(e.validationRules?.validate)}`);
    validationRules.forEach((v: ValidationRule) => {
      const keys = Object.keys(v);
      const validationFunctionKey = keys[0];
      const validationFunction = v[keys[0]];
      const errorMessageValue = v[keys[1]];
      if (validationFunctionKey && errorMessageValue) {
        // assign validation to result
        result[validationFunctionKey] = validationFunction;
      }
    })
  }
  return result;
};

/**
 * get react element nodes from errorMessages and validation for validate
 * @param e 
 * @param errors 
 * @returns rendered ReactNode
 */
export const getValidateErrorMessages = (e: DynamicFormElement, i18nFn: (input: string, startWith?: string) => string): ValidationRules => {
  let result: ValidationRules = {};
  if (Array.isArray(e.validationRules?.validate)) {
    e.validationRules?.validate.forEach((v: ValidationRule) => {
      const keys = Object.keys(v);
      const validationFunctionKey = keys[0];
      const errorMessageValue = v[keys[1]];
      if (validationFunctionKey && errorMessageValue && typeof errorMessageValue === 'string') {
        result[validationFunctionKey] = getI18nValue(i18nFn, errorMessageValue);
      }
    })
  }
  return result;
};

/**
 * generate error element error message
 * @param e 
 * @param errors 
 * @returns 
 */
const generateElementErrorMessage = (e: DynamicFormElement, errors: FieldErrors<FieldValues>, i18nFn: (input: string, startWith?: string) => string) => {
  const validateErrorMessages = getValidateErrorMessages(e, i18nFn);
  const errorType = errors[e.key]?.type;
  let errorMessage;
  // non validate errorMessages
  if (errors[e.key]?.message && typeof errors[e.key]?.message === 'string') {
    // errorMessage = getI18nValue(i18nFn, errors[e.key]?.message);
    errorMessage = getI18nValue(i18nFn, errors[e.key]?.message as string);
  }
  // validate errorMessages: override default unknown error from rhf 
  if (errorType && validateErrorMessages[errorType as string]) {
    errorMessage = validateErrorMessages[errorType as string];
  }
  return errorMessage;
}

/**
 * get react element nodes from errorMessages and validation, used in non MUI elements and to verify that MUI errorMessages are consistent with non MUI errorMessages
 * @param e 
 * @param errors 
 * @returns rendered ReactNode
 */
export const getValidateErrorNodes = (e: DynamicFormElement, errors: FieldErrors<FieldValues>): React.ReactNode => {
  if (Array.isArray(e.validationRules?.validate)) {
    let result: Array<React.ReactNode> = [];
    const validationRules = e.validationRules?.validate
      ? parseValidationRules(e.validationRules?.validate)
      : [];
    // console.log(`key: ${e.key}, validation array: ${JSON.stringify(e.validationRules?.validate)}`);
    validationRules.forEach((v: ValidationRule) => {
      const keys = Object.keys(v);
      const validationFunctionKey = keys[0];
      const errorMessageValue = v[keys[1]];
      if (validationFunctionKey && errorMessageValue) {
        // assign validation to result
        // result.push(<div className='form-error'>{e.key}</div>);
        if (errors[e.key] && (errors[e.key] as any).type === validationFunctionKey) {
          result.push(<p key={e.key} className='form-error'>{errorMessageValue as string}</p>);
        }
      }
    })
    return result;
  }
};

// parse string attributes into an object
const parseAttributeString = (attributeString: string): DynamicTextFieldProps => {
  const props: DynamicTextFieldProps = {};

  // Split the string by spaces and process each attribute
  attributeString.split(' ').forEach(attr => {
    if (attr.includes('=')) {
      // Handle key-value pairs (e.g., variant='standard')
      const [key, value] = attr.split('=');
      // Remove quotes from the value
      props[key] = value.replace(/['"]/g, '');
    } else if (attr) {
      // Handle boolean attributes (e.g., fullWidth, focused)
      props[attr] = true;
    }
  });
  return props;
};

// get shared validation form properties min, max, minLength, maxLength
const getNumberValidation = (validationRuleNumberProp: number | { value: number; message: string }) => {
  let result;
  if (typeof validationRuleNumberProp === 'number') {
    result = validationRuleNumberProp;
  }
  if (typeof validationRuleNumberProp === 'object') {
    result = { value: validationRuleNumberProp.value, message: validationRuleNumberProp.message };
  }
  return result;
}

// get shared validation form properties min, max, minLength, maxLength
const getPatternValidation = (e: DynamicFormElement) => {
  // get patternValidation
  let patternValidation;
  if (typeof e.validationRules?.pattern === 'string') {
    patternValidation = new RegExp(e.validationRules?.pattern, 'g');
  }
  if (typeof e.validationRules?.pattern === 'object' && e.validationRules?.pattern.value) {
    patternValidation = { value: new RegExp(e.validationRules.pattern.value, 'g'), message: e.validationRules.pattern.message };
  }
  return patternValidation;
}

export const getI18nValue = (i18nFn: (input: string, startWith?: string) => string, value: string, defaultValue = `invalid defaultValue`) => {
  return value ? i18nFn(value) : defaultValue
}

export const getI18nElementValues = (i18nFn: (input: string, startWith?: string) => string, e: DynamicFormElement) => {
  const result: Partial<Pick<DynamicFormElement, 'label' | 'placeHolder' | 'helperText' | 'defaultValue'>> = {};
  const i18nFields = ['label', 'placeHolder', 'helperText', 'defaultValue'] as const;

  i18nFields.forEach((f) => {
    const value = e[f];
    if (typeof value === 'string') {
      result[f] = getI18nValue(i18nFn, value);
    }
  });

  return result;
};

export const generateElement = (
  e: DynamicFormElement,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  control: Control<FieldValues, any>,
  watch: UseFormWatch<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  switch (e.type) {
    case DynamicFormElementType.SELECT:
      return generateInputSelect(e, register, errors, watch, i18nFn);
    case DynamicFormElementType.MULTI_SELECT:
      return generateInputMultiSelect(e, register, errors, watch, setValue, i18nFn);
    case DynamicFormElementType.RADIO:
      return generateInputRadio(e, errors, control, i18nFn);
    case DynamicFormElementType.CHECKBOX:
      return generateInputCheckBox(e, register, watch, i18nFn);
    default:
      return generateInputText(e, register, errors, i18nFn);
  }
}

// eslint-disable-next-line
const generateInputTextNonMUI = (e: DynamicFormElement, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>): React.ReactNode => {
  return (
    <div className='form-element'>
      <label htmlFor={e.type}>{e.type}:{e.label}</label>
      <input
        className={errors.lastName && 'input-element-error'}
        defaultValue={typeof e.defaultValue === 'string' ? e.defaultValue : ''}
        placeholder={e.placeHolder}
        // register element
        {...register(e.key, {
          validate: e.validationRules?.validate ? getValidateObject(e) : undefined,
        })}
      />
    </div>);
}

const generateInputText = (
  e: DynamicFormElement,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  // BOF: common element code
  // get errorMessages
  // TODO: i18n stuff
  const errorMessage = generateElementErrorMessage(e, errors, i18nFn);
  // get dynamicAttributes and dynamicAttributesFormControl
  const dynamicAttributes = e.attributes ? parseAttributeString(e.attributes) : undefined;
  const dynamicAttributesFormControl = e.attributesFormControl ? parseAttributeString(e.attributesFormControl) : undefined;
  // get patternValidation
  let patternValidation = getPatternValidation(e);

  // TODO: i18n stuff: put in all elements in 'common element code'
  const i18n = getI18nElementValues(i18nFn, e);
  // console.log(`i18nElementValues: [${JSON.stringify(i18n, undefined, 2)}]`);

  // EOF: common element code

  return (
    <div className='form-element'>
      <FormControl
        // inject dynamicAttributesFormControl
        {...dynamicAttributesFormControl}
      >
        <TextField
          id={e.key}
          type={e.type}
          // label={e.label}
          // placeholder={e.placeHolder}
          // defaultValue={e.defaultValue}
          // helperText={errorMessage || e.helperText}
          label={i18n['label']}
          placeholder={i18n['placeHolder']}
          defaultValue={i18n['defaultValue']}
          helperText={errorMessage || i18n['helperText']}
          error={errors[e.key] !== undefined}
          // register element
          {...register(e.key, {
            required: e.validationRules?.required,
            min: e.validationRules?.min ? getNumberValidation(e.validationRules?.min) : undefined,
            max: e.validationRules?.max ? getNumberValidation(e.validationRules?.max) : undefined,
            minLength: e.validationRules?.minLength ? getNumberValidation(e.validationRules?.minLength) : undefined,
            maxLength: e.validationRules?.maxLength ? getNumberValidation(e.validationRules?.maxLength) : undefined,
            pattern: patternValidation,
            validate: e.validationRules?.validate ? getValidateObject(e) : undefined,
          })}
          // inject dynamic properties
          {...dynamicAttributes}
        />
      </FormControl>
    </div>);
}

const generateInputSelect = (
  e: DynamicFormElement,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  // BOF: common element code
  // get errorMessages
  const errorMessage = generateElementErrorMessage(e, errors, i18nFn);
  // get dynamicAttributes and dynamicAttributesFormControl
  const dynamicAttributes = e.attributes ? parseAttributeString(e.attributes) : undefined;
  const dynamicAttributesFormControl = e.attributesFormControl ? parseAttributeString(e.attributesFormControl) : undefined;
  // get patternValidation
  let patternValidation = getPatternValidation(e);
  // EOF: common element code

  // get the current value of the select field
  const currentValue = watch(e.key) || e.defaultValue;

  return (
    <div className='form-element'>
      <FormControl
        // inject dynamicAttributesFormControl
        {...dynamicAttributesFormControl}
      >
        <InputLabel>{e.label}</InputLabel>
        <Select
          id={e.key}
          type={e.type}
          label={e.label}
          placeholder={e.placeHolder}
          defaultValue={e.defaultValue}
          error={errors[e.key] !== undefined}
          // register element
          {...register(e.key, {
            required: e.validationRules?.required,
            min: e.validationRules?.min ? getNumberValidation(e.validationRules?.min) : undefined,
            max: e.validationRules?.max ? getNumberValidation(e.validationRules?.max) : undefined,
            minLength: e.validationRules?.minLength ? getNumberValidation(e.validationRules?.minLength) : undefined,
            maxLength: e.validationRules?.maxLength ? getNumberValidation(e.validationRules?.maxLength) : undefined,
            pattern: patternValidation,
            validate: e.validationRules?.validate ? getValidateObject(e) : undefined,
          })}
          // inject dynamic properties
          {...dynamicAttributes}
          // required for reset form works
          value={currentValue}
        >
          {Array.isArray(e.options) && e.options?.map((e) => {
            let label = e;
            let value = e;
            // override defaults
            if (e.includes(':')) {
              value = e.split(':')[0];
              label = e.split(':')[1];
            }
            return <MenuItem key={value} value={value}>{label}</MenuItem>
          })}
        </Select>
        {errorMessage ? <Typography variant="caption" color="error">{errorMessage}</Typography> : <FormHelperText>{e.helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}

const generateInputMultiSelect = (
  e: DynamicFormElement,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  // BOF: common element code
  // get errorMessages
  const errorMessage = generateElementErrorMessage(e, errors, i18nFn);
  // get dynamicAttributes and dynamicAttributesFormControl
  const dynamicAttributes = e.attributes ? parseAttributeString(e.attributes) : undefined;
  const dynamicAttributesFormControl = e.attributesFormControl ? parseAttributeString(e.attributesFormControl) : undefined;
  // get patternValidation
  let patternValidation = getPatternValidation(e);
  // EOF: common element code

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // get the current value of the multiselect field
  const currentValue = watch(e.key) || e.defaultValue || [];

  return (
    <div>
      <FormControl
        sx={{ mb: 1/*, width: 300*/ }}
        // inject dynamic properties
        {...dynamicAttributesFormControl}
      >
        <InputLabel>{e.label}</InputLabel>
        <Select fullWidth
          multiple
          id={e.key}
          type={e.type}
          label={e.label}
          placeholder={e.placeHolder}
          // set the default value here
          defaultValue={e.defaultValue || []}
          error={errors[e.key] !== undefined}
          // register element
          {...register(e.key, {
            required: e.validationRules?.required,
            pattern: patternValidation,
            validate: e.validationRules?.validate ? getValidateObject(e) : undefined,
            // NOTE: set the initial value here, this is required, else when we change any other component will break in value
            value: e.defaultValue || [],
          })}
          // inject dynamic properties (injected on FormControl)
          {...dynamicAttributes}
          // required for reset form works
          value={currentValue}
          onChange={(event) => {
            const newValue = typeof event.target.value === 'string'
              ? event.target.value.split(',')
              : event.target.value;
            setValue(e.key, newValue);
          }}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => (
            typeof selected === 'string' ? selected.split(',').join(', ') : selected.join(', ')
          )}
          MenuProps={MenuProps}
        >
          {Array.isArray(e.options) && e.options?.map((name) => (
            <MenuItem key={name} value={name.split(':')[0]}>
              <Checkbox checked={currentValue.includes(name.split(':')[0])} />
              <ListItemText primary={name.split(':')[1]} />
            </MenuItem>
          ))}
        </Select>
        {errorMessage ? <Typography variant="caption" color="error">{errorMessage}</Typography> : <FormHelperText>{e.helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

const generateInputRadio = (
  e: DynamicFormElement,
  errors: FieldErrors<FieldValues>,
  control: Control<FieldValues, any>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  // BOF: common element code
  // get errorMessages
  const errorMessage = generateElementErrorMessage(e, errors, i18nFn);
  // get dynamicAttributes and dynamicAttributesFormControl
  const dynamicAttributes = e.attributes ? parseAttributeString(e.attributes) : undefined;
  const dynamicAttributesFormControl = e.attributesFormControl ? parseAttributeString(e.attributesFormControl) : undefined;
  // EOF: common element code

  // NOTE: this must be a react hook form controlled component because of the nature of MUI radio box

  return (
    <div className='form-element'>
      <FormControl
        // inject dynamicAttributesFormControl
        {...dynamicAttributesFormControl}
      >
        <FormLabel>{e.label}</FormLabel>
        <Controller
          name={e.key}
          defaultValue={e.defaultValue}
          // inject dynamic properties
          {...dynamicAttributes}
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}
            >
              {Array.isArray(e.options) && e.options?.map((e) => {
                let label = e;
                let value = e;
                // override defaults
                if (e.includes(':')) {
                  value = e.split(':')[0];
                  label = e.split(':')[1];
                }
                return <FormControlLabel key={value} label={label} value={value} control={<Radio />} />
              })}
            </RadioGroup>
          )}
        />
        {errorMessage ? <Typography variant="caption" color="error">{errorMessage}</Typography> : <FormHelperText>{e.helperText}</FormHelperText>}
      </FormControl>
    </div>);
}

const generateInputCheckBox = (
  e: DynamicFormElement,
  register: UseFormRegister<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  i18nFn: (input: string, startWith?: string) => string,
): React.ReactNode => {
  // BOF: common element code
  // get dynamicAttributes and dynamicAttributesFormControl
  const dynamicAttributes = e.attributes ? parseAttributeString(e.attributes) : undefined;
  const dynamicAttributesFormControl = e.attributesFormControl ? parseAttributeString(e.attributesFormControl) : undefined;
  // EOF: common element code

  // watch the current value
  const currentValue = watch(e.key);

  // get the registration props
  const { onChange, onBlur, name, ref } = register(e.key);

  return (
    <div className='form-element'>
      <FormControl {...dynamicAttributesFormControl}>
        <FormControlLabel
          control={
            <Checkbox
              id={e.key}
              checked={currentValue ?? e.defaultValue ?? false}
              onChange={(event) => {
                // Handle the checkbox change
                onChange(event);
              }}
              onBlur={onBlur}
              name={name}
              inputRef={ref}
              {...dynamicAttributes}
            />
          }
          label={e.label}
        />
        {e.helperText && <FormHelperText>{e.helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}