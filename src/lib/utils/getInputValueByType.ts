const getInputValueByType = (item: CustomFormItem) => {
    const inputType = item.type;
    switch (inputType) {
        case "text":
            return "";
        case "password":
            return "";
        case "email":
            return "";
        case "checkbox":
            return false;
        case "select":
            if (item.multiple) return [];
            return "";
        default:
            return "";
    }
};

export default getInputValueByType;
