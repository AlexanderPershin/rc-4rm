import classNames from "classnames";
import React, { FC, useState, useEffect } from "react";
import checkForEmpty from "../utils/checkForEmpty";
import { emailValidator, passwordValidator } from "../utils/validators";
import cn from "classnames";
import s from "./style.module.sass";

interface SignProps {
    handleSubmit: (data: any) => void;
    clearAfter: boolean;
    className?: string;
    isCheck?: boolean;
    isConfirmPass?: boolean;
    labels?: {
        email?: string;
        password?: string;
        password2?: string;
        isCheckOut?: string;
    };
    info?: {
        email?: string;
        password?: string;
        password2?: string;
        isCheckOut?: string;
    };
    successFeedback?: {
        email?: string;
        password?: string;
        password2?: string;
        isCheckOut?: string;
    };
    errorFeedback?: {
        email?: string;
        password?: string;
        password2?: string;
        isCheckOut?: string;
    };
    validators?: {
        email?: (value: string) => boolean;
        password?: (value: string) => boolean;
        password2?: (value: string) => boolean;
        isCheckOut?: (value: boolean) => boolean;
    };
}

const SignForm: FC<SignProps> = ({
    handleSubmit,
    clearAfter = false,
    className,
    isCheck,
    isConfirmPass,
    labels,
    info,
    successFeedback,
    errorFeedback,
    validators,
}) => {
    const INIT_DATA = {
        email: "",
        password: "",
        password2: "",
        isCheckOut: false,
    };

    const [formData, setFormData] = useState(INIT_DATA);

    const [isLoading, setLoading] = useState<boolean>(false);

    type FormDataTypes = keyof typeof formData;

    const [errors, setErrors] = useState<string[]>([]);

    const addToErrors = (fieldName: FormDataTypes) => {
        const inErrors = errors.includes(fieldName);
        if (inErrors) return;
        const newErrors = [...errors, fieldName];
        setErrors(newErrors);
    };

    const removeFromErrors = (fieldName: FormDataTypes) => {
        const newErrors = errors.filter((item) => item !== fieldName);
        setErrors(newErrors);
    };

    const defaultFormValidators: any = {
        email: emailValidator,
        password: passwordValidator,
        password2: (value: string) => value === formData.password,
        isCheckOut: (value: boolean) => true,
    };

    const formValidators: any = {
        ...defaultFormValidators,
        ...validators,
    };

    const validateField = <T extends keyof FormData>(
        fieldName: T,
        value: FormData[T]
    ) => {
        if (!value) {
            removeFromErrors(fieldName as FormDataTypes);
            return;
        }
        const isValid = formValidators[fieldName as FormDataTypes](value);
        if (isValid) {
            removeFromErrors(fieldName as FormDataTypes);
            return;
        }
        if (!isValid) {
            addToErrors(fieldName as FormDataTypes);
            return;
        }
    };

    const validateCheckboxField = <T extends keyof FormData>(
        fieldName: T,
        value: FormData[T]
    ) => {
        console.log("validating checkbox field");

        const isValid = formValidators[fieldName as FormDataTypes](value);
        console.log("isValid", isValid);

        if (isValid) {
            removeFromErrors(fieldName as FormDataTypes);
            return isValid;
        }
        if (!isValid) {
            addToErrors(fieldName as FormDataTypes);
            return isValid;
        }
    };

    const handleFormField = <T extends keyof FormData>(
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fieldName = e.target.name as T;
        const value = e.target.value as any;
        const newFormData = { ...formData, [fieldName]: value };
        validateField(fieldName, value);
        setFormData(newFormData);
    };

    const handleCheckboxField = <T extends keyof FormData>(
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fieldName = e.target.name as T;
        const prevValue: boolean = formData[fieldName as "isCheckOut"];
        const newFormData = { ...formData, [fieldName]: !prevValue };
        validateCheckboxField(fieldName, !prevValue as any);
        setFormData(newFormData);
    };

    const submitAsync = async (data: any) => {
        setLoading(true);
        await handleSubmit(data);
        setLoading(false);
        if (clearAfter) setFormData(INIT_DATA);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData: {
            email: string;
            password: string;
            isCheckout?: boolean;
        } = {
            email: formData.email,
            password: formData.password,
        };

        const anyEmpty = checkForEmpty(submitData);

        const isCheckValid: boolean = validateCheckboxField(
            "isCheckOut" as any,
            formData.isCheckOut
        );
        if (!isCheckValid) {
            addToErrors("isCheckOut");
            return;
        }

        if (isCheck) submitData.isCheckout = formData.isCheckOut;

        if (errors?.length || anyEmpty) {
            console.log(
                `errors.length ${errors.length}; empty fields ${anyEmpty}`
            );

            return;
        } else {
            setErrors([]);
        }

        submitAsync(submitData);
    };

    const checkIfDisableSubmit = () => {
        const submitData: {
            email: string;
            password: string;
            password2?: string;
        } = {
            email: formData.email,
            password: formData.password,
        };
        if (isConfirmPass) submitData.password2 = formData.password2;
        const anyEmpty = checkForEmpty(submitData);
        if (errors.length || anyEmpty) return true;
        return false;
    };

    const getValidationClasses = (
        fieldName: FormDataTypes,
        isCheckbox?: boolean
    ) => {
        if (!formData[fieldName as FormDataTypes] && !isCheckbox) return "";
        let isValid: boolean = false;
        if (!isCheckbox) {
            isValid = (!errors.includes(fieldName) &&
                formData[fieldName as FormDataTypes]) as boolean;
        } else {
            if (validators?.[fieldName]) {
                isValid = !errors.includes(fieldName);
                if (!isValid) return "is-invalid";
                return "";
            } else {
                return "";
            }
        }
        return isValid ? "is-valid" : "is-invalid";
    };

    const renderLabel = (fieldName: FormDataTypes, defaultValue: string) => {
        if (labels?.[fieldName]) return labels[fieldName];
        return defaultValue;
    };

    const renderInfo = (fieldName: FormDataTypes) => {
        if (info?.[fieldName])
            return (
                <div id={`${fieldName}Help`} className="form-text">
                    {info[fieldName]}
                </div>
            );
        return null;
    };

    const renderSuccessFeedback = (
        fieldName: FormDataTypes,
        defaultValue: string
    ) => {
        return (
            <div className="valid-feedback">
                {successFeedback?.[fieldName]
                    ? successFeedback[fieldName]
                    : defaultValue}
            </div>
        );
    };

    const renderErrorFeedback = (
        fieldName: FormDataTypes,
        defaultValue: string
    ) => {
        return (
            <div className="invalid-feedback">
                {errorFeedback?.[fieldName]
                    ? errorFeedback[fieldName]
                    : defaultValue}
            </div>
        );
    };

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    return (
        <form onSubmit={onFormSubmit} className={cn(s.SignForm, className)}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    {renderLabel("email", "Email")}
                </label>
                <input
                    type="text"
                    className={classNames(
                        "form-control",
                        getValidationClasses("email")
                    )}
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    value={formData.email}
                    onChange={handleFormField}
                    placeholder="Your email"
                />
                {formData.email ? (
                    <>
                        {renderSuccessFeedback("email", "Looks good")}
                        {renderErrorFeedback("email", "Not an email")}
                    </>
                ) : (
                    renderInfo("email")
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    {renderLabel("password", "Password")}
                </label>
                <input
                    type="password"
                    className={classNames(
                        "form-control",
                        getValidationClasses("password")
                    )}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormField}
                    placeholder="Enter password"
                />
                {formData.password ? (
                    <>
                        {renderSuccessFeedback("password", "Looks good")}
                        {renderErrorFeedback("password", "Password is invalid")}
                    </>
                ) : (
                    renderInfo("password")
                )}
            </div>

            {isConfirmPass ? (
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">
                        {renderLabel("password2", "Confirm password")}
                    </label>
                    <input
                        type="password"
                        className={classNames(
                            "form-control",
                            getValidationClasses("password2")
                        )}
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleFormField}
                        placeholder="Repeat password"
                    />
                    {formData.password ? (
                        <>
                            {renderSuccessFeedback("password2", "Confirmed")}
                            {renderErrorFeedback(
                                "password2",
                                "Passwords don't match"
                            )}
                        </>
                    ) : null}
                    {renderInfo("password2")}
                </div>
            ) : null}

            {isCheck ? (
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className={cn(
                            "form-check-input",
                            getValidationClasses("isCheckOut", true)
                        )}
                        id="isCheckOut"
                        name="isCheckOut"
                        onChange={handleCheckboxField}
                    />
                    <label className="form-check-label" htmlFor="isCheckOut">
                        {renderLabel("isCheckOut", "Check me out")}
                    </label>
                    <>
                        {renderSuccessFeedback("isCheckOut", "Looks good")}
                        {renderErrorFeedback("isCheckOut", "You must agree")}
                    </>
                    {!formData.isCheckOut ? renderInfo("isCheckOut") : null}
                </div>
            ) : null}

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
                    disabled={checkIfDisableSubmit()}
                >
                    Submit
                </button>
            )}
        </form>
    );
};

export default SignForm;
