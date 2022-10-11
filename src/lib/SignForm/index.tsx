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
}

const SignForm: FC<SignProps> = ({
    handleSubmit,
    clearAfter = false,
    className,
    isCheck,
    isConfirmPass,
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

    const addToErrors = (fieldName: string) => {
        const inErrors = errors.includes(fieldName);
        if (inErrors) return;
        const newErrors = [...errors, fieldName];
        setErrors(newErrors);
    };

    const removeFromErrors = (fieldName: string) => {
        const newErrors = errors.filter((item) => item !== fieldName);
        setErrors(newErrors);
    };

    const formValidators = {
        email: emailValidator,
        password: passwordValidator,
        password2: (value: string) => value === formData.password,
        checkOut: () => true,
    };

    const validateField = (fieldName: string, value: string | any) => {
        if (!value) {
            removeFromErrors(fieldName);
            return;
        }
        const isValid =
            formValidators[fieldName as "email" | "password"](value);
        if (isValid) {
            removeFromErrors(fieldName);
            return;
        }
        if (!isValid) {
            addToErrors(fieldName);
            return;
        }
    };

    const handleFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const newFormData = { ...formData, [fieldName]: value };
        validateField(fieldName, value);
        setFormData(newFormData);
    };
    const handleCheckboxField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const prevValue: boolean = formData[fieldName as "isCheckOut"];
        const newFormData = { ...formData, [fieldName]: !prevValue };
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
        } = {
            email: formData.email,
            password: formData.password,
        };
        const anyEmpty = checkForEmpty(submitData);
        if (errors.length || anyEmpty) return true;
        return false;
    };

    const getValidationClasses = (fieldName: string) => {
        if (!formData[fieldName as FormDataTypes]) return "";
        const isValid =
            !errors.includes(fieldName) && formData[fieldName as FormDataTypes];
        return isValid ? "is-valid" : "is-invalid";
    };

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    return (
        <form onSubmit={onFormSubmit} className={cn(s.SignForm, className)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
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
                        <div className="valid-feedback">Looks good</div>
                        <div className="invalid-feedback">Email is invalid</div>
                    </>
                ) : (
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
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
                        <div className="valid-feedback">Looks good</div>
                        <div className="invalid-feedback">
                            Password is invalid
                        </div>
                    </>
                ) : (
                    <div id="emailHelp" className="form-text">
                        Should contain letters, uppercase letters, numbers and
                        symbols
                    </div>
                )}
            </div>

            {isConfirmPass ? (
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Confirm password
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
                            <div className="valid-feedback">Confirmed</div>
                            <div className="invalid-feedback">
                                Passwords don't match
                            </div>
                        </>
                    ) : null}
                </div>
            ) : null}

            {isCheck ? (
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isCheckOut"
                        name="isCheckOut"
                        onChange={handleCheckboxField}
                    />
                    <label className="form-check-label" htmlFor="isCheckOut">
                        Check me out
                    </label>
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
