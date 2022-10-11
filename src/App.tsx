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
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
