export interface Prompt {
    key: string;
    title: string;
    description?: string;
    thumbnail?: string;
    model?: string;
    i18n: {
        [key: string]: {
            prompts: string[];
        };
    };
}
