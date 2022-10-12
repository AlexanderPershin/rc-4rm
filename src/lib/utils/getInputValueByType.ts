const getInputValueByType = (inputType: string) => {
    switch (inputType) {
        case "text":
            return "";
        case "password":
            return "";
        case "email":
            return "";
        case "checkbox":
            return false;
        default:
            return "";
    }
};

export default getInputValueByType;
