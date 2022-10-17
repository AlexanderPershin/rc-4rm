import React, { FC } from "react";
import cn from "classnames";

interface TextInputProps {
    item: CustomFormItem;
    formData: any;
    handleFormField: (e: any, item: CustomFormItem) => void;
    getValidationClasses: (fieldName: string) => string;
    requiredLabel?: string;
}

const TextInput: FC<TextInputProps> = ({
    item,
    formData,
    handleFormField,
    getValidationClasses,
    requiredLabel,
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={item.name} className="form-label">
                {item.label}
                {item?.required ? requiredLabel : ""}
            </label>
            <input
                type={item.type}
                className={cn("form-control", getValidationClasses(item.name))}
                id={item.name}
                name={item.name}
                aria-describedby={`${item.name}Help`}
                value={formData[item.name]}
                onChange={(e) => handleFormField(e, item)}
                placeholder={item.placeholder || item.label}
            />
        </div>
    );
};

export default TextInput;
