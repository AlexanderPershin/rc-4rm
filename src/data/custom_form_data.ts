import { emailValidator, passwordValidator } from "../lib/utils/validators";

const CUSTOM_FORM_FIELDS_DATA: CustomFormItem[] = [
    {
        id: 1,
        type: "text",
        name: "username",
        label: "Username",
        // validator: (value: string) => value.length > 2,
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
];

export default CUSTOM_FORM_FIELDS_DATA;
