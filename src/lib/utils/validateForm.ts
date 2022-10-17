import checkCustomForEmpty from "./checkCustomForEmpty";

const validateForm = (formData: any, fields: CustomFormItem[]) => {
    try {
        const emptyRequiredArr = checkCustomForEmpty(formData, fields);

        const invalidFieldsArr = Object.entries(formData)
            .map((item: any) => {
                const fieldItem = fields.find(
                    (itm: CustomFormItem) => itm.name === item[0]
                );

                if (!fieldItem) return null;

                const isValid: boolean = fieldItem?.validator
                    ? fieldItem.validator(item[1])
                    : true;

                if (fieldItem?.required && !isValid) return fieldItem.name;
            })
            .filter((item) => item);
        console.log("invalidFieldsArr", invalidFieldsArr);

        const newErrors = Array.from(
            new Set([...emptyRequiredArr, ...invalidFieldsArr])
        );
        return newErrors;
    } catch (error) {
        console.log("error in validateForm: error", error);

        return [];
    }
};

export default validateForm;
