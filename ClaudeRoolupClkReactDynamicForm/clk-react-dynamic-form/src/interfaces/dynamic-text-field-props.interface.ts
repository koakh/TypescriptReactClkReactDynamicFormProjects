import { TextFieldColor, TextFieldVariant } from "../types";

export interface DynamicTextFieldProps {
  fullWidth?: boolean;
  variant?: TextFieldVariant;
  color?: TextFieldColor;
  focused?: boolean;
  [key: string]: any;
}
