import React from "react";
import SignForm from "./lib/SignForm";
import CustomForm from "./lib/CustomForm";
import CUSTOM_FORM_FIELDS_DATA from "./data/custom_form_data";

const SHOW_SIGN_FORM = true;
const SHOW_CUSTOM_FORM = false;

function App() {
    const handleSubmit = (data: any) => {
        console.log("Form submit: data", data);
        return new Promise(function (resolve) {
            setTimeout(resolve, 2000);
        });
    };

    return (
        <div className="App container">
            <h1 className="text-center">
                React rc-4rm (Forms for react) library
            </h1>
            <div className="row">
                {SHOW_CUSTOM_FORM ? (
                    <div className="container-fluid d-flex flex-column gap-4 justify-content-center align-items-center">
                        <h2 className="mt-5">CustomForm component</h2>
                        <CustomForm
                            handleSubmit={handleSubmit}
                            fields={CUSTOM_FORM_FIELDS_DATA}
                            // clearAfter={true}
                            className="w-50"
                            requiredLabel=" *"
                        />
                    </div>
                ) : null}
                {SHOW_SIGN_FORM ? (
                    <div className="container-fluid d-flex flex-column gap-4 justify-content-center align-items-center">
                        <h2 className="mt-5">SignForm component</h2>
                        <SignForm
                            className="w-50"
                            handleSubmit={handleSubmit}
                            clearAfter={false}
                            isConfirmPass={true}
                            isCheck={true}
                            validators={{
                                email: (value: string) =>
                                    /\S+@\S+\.\S+/.test(value),
                                // password: (value: string) => value.length > 6,
                                isCheckOut: (value: boolean) => value,
                            }}
                            labels={{
                                email: "Enter your email",
                                password: "Create a password",
                                password2: "Repeat password",
                                isCheckOut: "Remember me",
                            }}
                            info={{
                                email: "We'll never share your email with anyone else",
                                password:
                                    "Should contain letters, uppercase letters, numbers and symbols",
                                password2: "Enter your password again",
                                isCheckOut:
                                    "Increase authentication validity time",
                            }}
                            successFeedback={{
                                email: "Email is valid",
                                password: "Password is valid",
                                password2: "Passwords match",
                            }}
                            errorFeedback={{
                                email: "Email is invalid",
                                password: "Password is invalid",
                                password2: "Passwords don't match",
                                isCheckOut: "You must agree",
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
