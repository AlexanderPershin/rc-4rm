const checkCustomForEmpty = (
    obj: any,
    fields: CustomFormItem[]
): CustomFormItem[] | any[] => {
    try {
        return Object.entries(obj)
            .map((item: any) => {
                const fieldItem = fields.find(
                    (itm: CustomFormItem) => itm.name === item[0]
                );
                console.log("fieldItem", fieldItem);

                if (fieldItem?.required && !item[1]) return fieldItem;
                return;
            })
            .filter((item) => item);
    } catch (error) {
        console.log("error in checkCustomForEmpty: error", error);

        return [];
    }
};

export default checkCustomForEmpty;
