import { emailValidator, passwordValidator } from "../lib/utils/validators";

const CUSTOM_FORM_FIELDS_DATA: CustomFormItem[] = [
    {
        id: 1,
        type: "text",
        name: "username",
        label: "Username",
        validator: (value: string) => value.length > 2,
        placeholder: "Fancy username",
        required: false,
    },
    {
        id: 2,
        type: "text",
        name: "email",
        label: "Email",
        validator: emailValidator,
        placeholder: "Your email",
        required: true,
    },
    {
        id: 3,
        type: "password",
        name: "password",
        label: "Enter password",
        validator: passwordValidator,
        required: true,
    },
    {
        id: 4,
        type: "select",
        name: "languages",
        label: "Your languages",
        validator: (value: any[]) => value.length > 1,
        required: true,
        multiple: true,
        options: [
            {
                value: "en",
                label: "English",
            },
            {
                value: "fr",
                label: "French",
            },
            {
                value: "es",
                label: "Spanish",
            },
        ],
    },
];

export default CUSTOM_FORM_FIELDS_DATA;
