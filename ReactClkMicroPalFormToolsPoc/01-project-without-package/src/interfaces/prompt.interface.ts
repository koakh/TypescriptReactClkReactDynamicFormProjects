// match interfaces
// c3edu.online:/home/c3/ReactClkMicroPalFormToolsPoc/src/interfaces/prompt.interface.ts
// c3edu.online:/home/c3/c3-backend/src/modules/micropal/tools/interfaces/prompt.interface.ts

export interface Prompt {
  key: string;
  title: string;
  description?: string;
  thumbnail?: string;
  model?: string;
  i18n: { [key: string]: { prompts: string[] } },
}
