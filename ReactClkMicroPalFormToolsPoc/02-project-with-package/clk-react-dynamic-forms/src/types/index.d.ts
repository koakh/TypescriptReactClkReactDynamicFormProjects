declare module 'clk-react-dynamic-forms' {
  import { ReactNode } from 'react';

  export interface ToolProps {
    // Define your props here
    children?: ReactNode;
  }

  export interface DynamicFormComponentProps {
    // Define your props here
  }

  export const Tool: React.FC<ToolProps>;
  export const DynamicFormComponent: React.FC<DynamicFormComponentProps>;
}
