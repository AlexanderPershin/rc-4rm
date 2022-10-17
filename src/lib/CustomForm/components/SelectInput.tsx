import React, { FC } from "react";
import cn from "classnames";
import Select from "react-select";
import s from "./style.module.sass";

interface SelectInputProps {
    item: CustomFormItem;
    formData: any;
    handleFormField: (e: any, item: CustomFormItem) => void;
    getValidationClasses: (fieldName: string) => string;
    requiredLabel?: string;
}

const SelectInput: FC<SelectInputProps> = ({
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
            <Select
                className={cn(s.Select, {
                    [s.Invalid]: getValidationClasses(item.name).includes(
                        "is-invalid"
                    ),
                    [s.Valid]: getValidationClasses(item.name).includes(
                        "is-valid"
                    ),
                })}
                id={item.name}
                name={item.name}
                aria-describedby={`${item.name}Help`}
                value={formData[item.name]}
                isMulti={item.multiple}
                placeholder={item.placeholder || item.label}
                aria-label={item.label}
                isSearchable={true}
                onChange={(val: any) =>
                    handleFormField({ target: { value: val } }, item)
                }
                options={item.options}
            />
        </div>
    );
};

export default SelectInput;
