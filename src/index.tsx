import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global_styles/style.sass";
import SignForm from "./lib/SignForm";
import CustomForm from "./lib/CustomForm";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export { SignForm, CustomForm };
