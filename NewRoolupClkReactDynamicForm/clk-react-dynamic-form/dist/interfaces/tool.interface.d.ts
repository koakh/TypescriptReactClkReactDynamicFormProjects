import { DynamicForm } from "./dynamic-form.interface";
import { Prompt } from "./prompt.interface";
export interface Tool extends Prompt {
    form?: DynamicForm;
}
