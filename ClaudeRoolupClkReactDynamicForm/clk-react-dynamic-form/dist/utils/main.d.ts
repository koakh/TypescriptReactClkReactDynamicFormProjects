import { ValidationRules } from "../interfaces/dynamic-form.interface";
/**
 * create js function from functionString
 * @param fnString
 * @returns null or anonymous function
 */
export declare const createFunctionFromString: (fnString: string) => Function | null;
/**
 * parse validation rules in format `[{"key": "(value) => return false}, errorMessage: 'message'"}, {}, ...]`
 * @param jsonRules
 * @returns ValidationRules object
 */
export declare const parseValidationRules: (jsonRules: ValidationRules) => ValidationRules;
