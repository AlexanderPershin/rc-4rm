import getInputValueByType from "./getInputValueByType";

const mapFieldsToData = (fields: CustomFormItem[]) => {
    const data: any = {};
    fields.forEach(
        (item: CustomFormItem) =>
            (data[item.name] = getInputValueByType(item.type))
    );
    return data;
};

export default mapFieldsToData;
