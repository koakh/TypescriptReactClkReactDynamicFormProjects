import React from 'react';
import { Tool } from '../interfaces';
interface Props {
    tool: Tool;
    i18nFn: (input: string, startWith?: string) => string;
    onSubmitHandle: (payload: any) => any;
    onCloseHandle?: () => void;
}
export declare const DynamicFormComponent: React.FC<Props>;
export {};
