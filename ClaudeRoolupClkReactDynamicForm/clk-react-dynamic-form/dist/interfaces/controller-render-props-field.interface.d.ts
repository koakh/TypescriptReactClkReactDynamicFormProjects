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
