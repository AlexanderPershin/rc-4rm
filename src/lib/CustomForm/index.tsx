import React, { FC, useState, useEffect } from "react";
import cn from "classnames";
import s from "./style.module.sass";
import mapFieldsToData from "../utils/mapFieldsToData";
import checkForEmpty from "../utils/checkForEmpty";
import checkCustomForEmpty from "../utils/checkCustomForEmpty";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import validateForm from "../utils/validateForm";

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
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        item: CustomFormItem
    ) => {
        const fieldName = item.name || e.target.name;
        if (!touchedFields.includes(fieldName))
            setTouchedFields([...touchedFields, fieldName]);
        let value: any = e.target.value;
        if (
            item.type === "text" ||
            item.type === "email" ||
            item.type === "password" ||
            item.type === "select"
        )
            value = e.target.value;
        // if (item.type === "select") {
        //     const target = e.currentTarget as HTMLSelectElement;
        //     // @ts-ignore
        //     value = target.selectedOptions.map((itm: any) => itm.value);
        // }

        const newFormData = { ...formData, [fieldName]: value };
        validateField(item, value);
        setFormData(newFormData);
    };

    useEffect(() => {
        console.log("formData", formData);
    }, [formData]);

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    useEffect(() => {
        console.log("touchedFields", touchedFields);
    }, [touchedFields]);

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

        const newErrors: string[] = validateForm(formData, fields);
        if (newErrors?.length) {
            try {
                // Set all fields to touched
                setTouchedFields(
                    fields.map((item: CustomFormItem) => item.name)
                );

                console.log("newErrors", newErrors);
                setErrors(newErrors);

                // Focus on first invalid field
                const firstInvalid: any = document.getElementsByName(
                    newErrors[0]
                )[0];

                firstInvalid?.focus();
                return;
            } catch (error) {
                console.log("error handleing empty fields onFormSubmit", error);
            }
        }

        submitAsync(formData);
    };

    const renderFormFields = (fieldsArray: CustomFormItem[]): JSX.Element[] => {
        return fieldsArray.map((item: CustomFormItem) => {
            switch (item.type) {
                case "text" || "password" || "email":
                    return (
                        <TextInput
                            key={item.id}
                            item={item}
                            formData={formData}
                            handleFormField={handleFormField}
                            getValidationClasses={getValidationClasses}
                            requiredLabel={requiredLabel}
                        />
                    );
                case "select":
                    return (
                        <SelectInput
                            key={item.id}
                            item={item}
                            formData={formData}
                            handleFormField={handleFormField}
                            getValidationClasses={getValidationClasses}
                            requiredLabel={requiredLabel}
                        />
                    );
                default:
                    return (
                        <TextInput
                            key={item.id}
                            item={item}
                            formData={formData}
                            handleFormField={handleFormField}
                            getValidationClasses={getValidationClasses}
                            requiredLabel={requiredLabel}
                        />
                    );
            }
        });
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
