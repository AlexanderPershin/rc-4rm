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
}

const CustomForm: FC<CustomFormProps> = ({
    fields,
    handleSubmit,
    clearAfter = false,
    className,
}) => {
    const [formData, setFormData] = useState<any>(mapFieldsToData(fields));
    const [isLoading, setLoading] = useState<boolean>(false);

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
        if (!value) {
            removeFromErrors(item.name);
            return;
        }
        // @ts-ignore
        const isValid = item.validator(value);
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
        console.log("handleFormField: name", e.target.name);

        const fieldName = e.target.name;
        const value = e.target.value;
        const newFormData = { ...formData, [fieldName]: value };
        validateField(item, value);
        setFormData(newFormData);
    };

    // useEffect(() => {
    //     console.log("formData", formData);
    // }, [formData]);

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    const getValidationClasses = (fieldName: string) => {
        // if (!formData[fieldName as FormDataTypes]) return "";
        // const isValid: boolean = (!errors.includes(fieldName) &&
        //     formData[fieldName as FormDataTypes]) as boolean;
        // TODO: Check feedback and is-valid for empty
        // Optionally add touchedFields object state
        const isValid = !errors.includes(fieldName);
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

        // TODO: check here fields with required: true
        const emptyFields = checkCustomForEmpty(formData, fields);
        console.log("emptyFields", emptyFields);
        if (emptyFields?.length) {
            emptyFields.forEach((item: CustomFormItem) => {
                console.log(`adding ${item.name} to errors`);

                addToErrors(item.name);
            });
        }

        if (errors?.length || emptyFields?.length) {
            console.log(
                `errors.length ${errors.length}; empty fields ${emptyFields?.length}`
            );

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
