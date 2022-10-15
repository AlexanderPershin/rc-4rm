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
    }
}
