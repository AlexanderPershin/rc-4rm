export {};

declare global {
    interface CustomFormItem {
        id: number;
        type: string;
        name: string;
        label: string;
        validator?: (value: any) => boolean;
        placeholder?: string;
        required?: boolean;
        multiple?: boolean; // Select input only
        options?: Array<{ value: string; label: string }>;
    }

    type InputType =
        | "text"
        | "email"
        | "password"
        | "color"
        | "select"
        | "checkbox";

    type InputTextType = "text" | "email" | "password" | "color";
}
