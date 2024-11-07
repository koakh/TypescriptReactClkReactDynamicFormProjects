import React from 'react';
import { Tool } from '../interfaces';
interface Props {
    tool: Tool;
    i18nFn: (input: string, startWith?: string) => string;
}
export declare const Component: React.FC<Props>;
export {};
