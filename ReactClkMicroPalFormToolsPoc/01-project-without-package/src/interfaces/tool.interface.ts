// match interfaces
// c3edu.online:/home/c3/ReactClkMicroPalFormToolsPoc/src/interfaces/tool.interface.ts
// c3edu.online:/home/c3/c3-backend/src/modules/micropal/tools/interfaces/tool.interface.ts

import { DynamicForm } from "../lib/interfaces/dynamic-form.interface";
import { Prompt } from "./prompt.interface";

export interface Tool extends Prompt {
  form?: DynamicForm;
}