import React, { FC, useState, useEffect } from "react";
import cn from "classnames";
import s from "./style.module.sass";
import mapFieldsToData from "../utils/mapFieldsToData";
import checkForEmpty from "../utils/checkForEmpty";
import checkCustomForEmpty from "../utils/checkCustomForEmpty";

interface CustomFormProps {
    fields: CustomFormItem[];
    handleSubmit: (data: any) => void;
    clearAfter?: boolean;
    className?: string;
    requiredLabel?: string;
}

const CustomForm: FC<CustomFormProps> = ({
    fields,
    handleSubmit,
    clearAfter = false,
    className,
    requiredLabel = "*",
}) => {
    const [formData, setFormData] = useState<any>(mapFieldsToData(fields));
    const [isLoading, setLoading] = useState<boolean>(false);
    const [touchedFields, setTouchedFields] = useState<string[]>([]);

    type FormDataType = typeof formData;
    type FormDataTypes = keyof typeof formData;

    const [errors, setErrors] = useState<string[]>([]);

    const addToErrors = (fieldName: string) => {
        const inErrors = errors.includes(fieldName);
        if (inErrors) return;
        const newErrors = [...errors, fieldName];
        setErrors(newErrors);
    };

    const removeFromErrors = (fieldName: FormDataTypes) => {
        const newErrors = errors.filter((item) => item !== fieldName);
        setErrors(newErrors);
    };

    const validateField = (item: CustomFormItem, value: any) => {
        // if (!value && !item.validator) {
        //     removeFromErrors(item.name);
        //     return;
        // }
        const isValid = item?.validator ? item.validator(value) : true;
        if (isValid) {
            removeFromErrors(item.name);
            return;
        }
        if (!isValid) {
            addToErrors(item.name);
            return;
        }
    };

    const handleFormField = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: CustomFormItem
    ) => {
        const fieldName = e.target.name;
        if (!touchedFields.includes(fieldName))
            setTouchedFields([...touchedFields, fieldName]);
        const value = e.target.value;
        const newFormData = { ...formData, [fieldName]: value };
        validateField(item, value);
        setFormData(newFormData);
    };

    // useEffect(() => {
    //     console.log("formData", formData);
    // }, [formData]);

    // useEffect(() => {
    //     console.log("errors", errors);
    // }, [errors]);

    // useEffect(() => {
    //     console.log("touchedFields", touchedFields);
    // }, [touchedFields]);

    const getValidationClasses = (fieldName: string) => {
        const isValid = !errors.includes(fieldName);
        if (!touchedFields.includes(fieldName)) return "";
        return isValid ? "is-valid" : "is-invalid";
    };

    const submitAsync = async (data: any) => {
        setLoading(true);
        await handleSubmit(data);
        setLoading(false);
        if (clearAfter) setFormData(mapFieldsToData(fields));
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emptyFields = checkCustomForEmpty(formData, fields);
        if (emptyFields?.length) {
            try {
                const emptyFieldsNames = emptyFields.map(
                    (item: CustomFormItem) => item.name
                );
                setTouchedFields(emptyFieldsNames);
                setErrors(emptyFieldsNames);
                const firstEmpty: any = document.getElementsByName(
                    emptyFields[0].name
                )[0];

                firstEmpty?.focus();
            } catch (error) {
                console.log("error handleing empty fields onFormSubmit", error);
            }
        }

        if (errors?.length || emptyFields?.length) {
            // console.log(
            //     `errors.length ${errors.length}; empty fields ${emptyFields?.length}`
            // );

            return;
        } else {
            setErrors([]);
        }

        submitAsync(formData);
    };

    const renderFormFields = (fieldsArray: CustomFormItem[]): JSX.Element[] => {
        return fieldsArray.map((item: CustomFormItem) => (
            <div key={item.id} className="mb-3">
                <label htmlFor="email" className="form-label">
                    {item.label}
                    {item?.required ? requiredLabel : ""}
                </label>
                <input
                    type={item.type}
                    className={cn(
                        "form-control",
                        getValidationClasses(item.name)
                    )}
                    id={item.id.toString()}
                    name={item.name}
                    aria-describedby={`${item.name}Help`}
                    value={formData[item.name]}
                    onChange={(e) => handleFormField(e, item)}
                    placeholder={item.placeholder || item.label}
                />
            </div>
        ));
    };

    return formData && fields ? (
        <form className={cn(s.CustomForm, className)} onSubmit={onFormSubmit}>
            {renderFormFields(fields)}
            {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                    <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Loading...
                </button>
            ) : (
                <button
                    type="submit"
                    className="btn btn-primary"
                    // disabled={checkIfDisableSubmit()}
                >
                    Submit
                </button>
            )}
        </form>
    ) : (
        <span>Loading...</span>
    );
};

export default CustomForm;
