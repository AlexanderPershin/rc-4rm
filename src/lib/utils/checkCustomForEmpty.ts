const checkCustomForEmpty = (
    obj: any,
    fields: CustomFormItem[]
): CustomFormItem[] | any[] => {
    /* checks if any of `required` fields are empty */
    try {
        return Object.entries(obj)
            .map((item: any) => {
                const fieldItem = fields.find(
                    (itm: CustomFormItem) => itm.name === item[0]
                );

                if (fieldItem?.required && !item[1]) return fieldItem.name;
                return null;
            })
            .filter((item) => item);
    } catch (error) {
        console.log("error in checkCustomForEmpty: error", error);

        return [];
    }
};

export default checkCustomForEmpty;
