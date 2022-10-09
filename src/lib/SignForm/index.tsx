import classNames from "classnames";
import React, { FC, useState, useEffect } from "react";
import checkForEmpty from "../../utils/checkForEmpty";
import { emailValidator, passwordValidator } from "../../utils/validators";

interface SignInProps {
    handleSubmit: (data: any) => void;
    clearAfter: boolean;
}

const SignIn: FC<SignInProps> = ({ handleSubmit, clearAfter = false }) => {
    const INIT_DATA = {
        email: "",
        password: "",
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

    const submitAsync = async (data: any) => {
        setLoading(true);
        await handleSubmit(data);
        setLoading(false);
        if (clearAfter) setFormData(INIT_DATA);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const anyEmpty = checkForEmpty(formData);

        if (errors?.length || anyEmpty) {
            console.log(
                `errors.length ${errors.length}; empty fields ${anyEmpty}`
            );

            return;
        } else {
            setErrors([]);
        }

        submitAsync(formData);
    };

    const checkIfDisableSubmit = () => {
        const anyEmpty = checkForEmpty(formData);
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
        <form onSubmit={onFormSubmit}>
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

export default SignIn;
