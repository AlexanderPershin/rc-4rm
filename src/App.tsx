import React from "react";
import SignForm from "./lib/SignForm";

function App() {
    const handleSignIn = (data: any) => {
        console.log("Sign in: data", data);
        return new Promise(function (resolve) {
            setTimeout(resolve, 2000);
        });
    };

    return (
        <div className="App container">
            <h1>React rc-4rm (Forms for react) library</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <SignForm
                        handleSubmit={handleSignIn}
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
                            isCheckOut: "Increase authentication validity time",
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
            </div>
        </div>
    );
}

export default App;
