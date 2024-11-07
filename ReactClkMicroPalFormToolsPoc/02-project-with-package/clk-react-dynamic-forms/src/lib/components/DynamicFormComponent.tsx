import { Alert, FormControl, FormHelperText } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateElement, getI18nValue } from '../dynamic-form';
import { DynamicForm, DynamicFormElement, Tool } from '../interfaces';
import { createFunctionFromString } from '../utils/main';

interface Props {
  tool: Tool;
  i18nFn: (input: string, startWith?: string) => string,
};

const DynamicFormComponent: React.FC<Props> = ({ tool, i18nFn }: Props): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // watcher
  const watcher = useRef<{ [key: string]: any }>({});
  // state for field-specific and global errors
  const [globalErrors, setGlobalErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<null | string>(null);

  // inner function
  function renderFormElements(dynamicForm: DynamicForm): React.ReactNode {
    return dynamicForm.elements.map((e: DynamicFormElement) => {
      // console.log(`key, ${e.key}, type: ${e.type}, visible: ${e.visible}`);
      // watch all fields, inject defaultValue
      watcher.current[e.key] = watch(String(e.key), e.defaultValue);
      // console.log(`watcher: [${JSON.stringify(watcher.current, undefined, 2)}]`);

      let showElement = true;
      if (e.visible) {
        const isVisible = createFunctionFromString(e.visible);
        if (isVisible) {
          showElement = isVisible(watcher.current);
        }
        // console.log(`isVisible: ${isVisible}`);
      }

      return showElement && (
        <div key={e.key}>
          {generateElement(e, register, errors, control, watch, setValue, i18nFn)}
        </div>
      );
    });
  };

  // OPT #1
  // const onSubmit = (data: any, e: any) => {
  //   console.log(data, e);
  // }
  // const onError = (errors: any, e: any) => {
  //   console.log(errors, e);
  // }

  // validate form before submission
  const validateForm = (data: any) => {
    const newErrors: { [key: string]: string } = {};

    // postValidate
    if (tool.form?.actions['submit'] && tool.form?.actions['submit']['validateForm']) {
      const postValidate = createFunctionFromString(tool.form?.actions['submit']['validateForm']);
      if (postValidate) {
        // this will internally throw error
        postValidate(data, newErrors, setGlobalErrors);
      }
    }

    setGlobalErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // post-validation function (simulating async validation)
  const postValidate = (data: any) => {
    try {
      // postValidate
      if (tool.form?.actions['submit'] && tool.form?.actions['submit']['postValidate']) {
        const validateForm = createFunctionFromString(tool.form?.actions['submit']['postValidate']);
        if (validateForm) {
          // this will internally throw error
          validateForm(data);
        }
      }
      // if reach here we have a valid postValidate
      return true;
    } catch (error: any) {
      setGlobalError(error.message);
      return false;
    }
  };

  // OPT #2
  const onSubmit = (data: any, e: any, tool: Tool) => {
    // reset after form submit
    e.target.reset();
    // console.log(`onSubmit data: ${JSON.stringify(data)}`);
    let payload = data;

    // clear previous errors
    setGlobalError(null);
    setGlobalErrors({});

    // preValidate: validate form
    const isValidForm = validateForm(data);
    if (!isValidForm) {
      return;
    }

    // perform post-validation
    try {
      const postValidationResult = postValidate(data);
      if (!postValidationResult) {
        return;
      }

      // if all validations pass, submit form
      // console.log('Form submitted:', data);

      // perform actual submission logic here
      // getPayload
      if (tool.form?.actions['submit'] && tool.form?.actions['submit']['getPayload']) {
        // console.log(`tool.form?.actions['submit']['getPayload']: [${tool.form?.actions['submit']['getPayload']}]`);
        const getPayload = createFunctionFromString(tool.form?.actions['submit']['getPayload']);
        if (getPayload) {
          // override default payload
          payload = getPayload(data);
          // console.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`);
        }
      }
      console.log(`onSubmit payload: [${JSON.stringify(payload, undefined, 2)}]`);
    } catch (error) {
      setGlobalError('Submission failed');
    }
  };

  return (
    <FormControl fullWidth>
      <form
        onSubmit={handleSubmit((data, e) => onSubmit(data, e, tool))}
      // onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* renderFormElements */}
        {tool?.form && renderFormElements(tool.form/*, initialValues, register, errors*/)}

        {/* submit button */}
        <button
          className='form-button'
          type="submit"
        >
          {getI18nValue(i18nFn, tool?.form?.properties?.buttons?.labels?.submit, 'Submit form')}
        </button>

        {/*
        <button
          className='form-button'
          style={{ display: 'block', marginTop: 10 }}
          type="reset"
        >
          Standard Reset Field Values
        </button>
        */}

        <button
          className='form-button'
          style={{ display: 'block', marginTop: 10 }}
          type="reset"
          // onClick={reset as MouseEventHandler<HTMLButtonElement>}
          onClick={() => {
            // setValue('subject', 'other');
            // console.log(`tool.form?.elements: [${JSON.stringify(tool.form?.elements, undefined, 2)}]`);
            console.log(`${JSON.stringify(tool.form?.elements?.find(e => e.key === 'subject')?.defaultValue, undefined, 2)}`);
            // reset({
            //   subject: tool.form?.elements?.find(e => e.key === 'subject')?.defaultValue,
            //   subjectOther: tool.form?.elements?.find(e => e.key === 'subjectOther')?.defaultValue,
            // });            
            reset();
          }}

        >
          {getI18nValue(i18nFn, tool?.form?.properties?.buttons?.labels?.reset, 'Custom Reset Field Values & Errors')}
        </button>

        {/* globalErrors display */}
        {globalErrors && Object.keys(globalErrors).length > 0 && (
          <Alert severity="error" icon={false} style={{ marginTop: 10, marginBottom: 10, padding: 0 }}>
            <ul style={{ margin: 0, paddingLeft: '1.75em' }}>{Object.keys(globalErrors).map((e: string) => <li key={e}>{globalErrors[e]}</li>)}</ul>
          </Alert>
        )}
        {/* globalError display */}
        {globalError && (
          <Alert severity="error" icon={false} style={{ marginTop: 10, marginBottom: 10, padding: 0 }}>
            <ul style={{ margin: 0, paddingLeft: '1.75em' }}><li>{globalError}</li></ul>
          </Alert>
        )}
        {/* show global form properties helperText */}
        {tool?.form?.properties?.helperText && <FormHelperText style={{ marginTop: 20, marginLeft: 0, marginRight: 0 }}>{tool.form.properties.helperText}</FormHelperText>}
      </form >
    </FormControl>
  );
};

export default DynamicFormComponent;