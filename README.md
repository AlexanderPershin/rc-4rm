# rc-4rm

Customizable react forms with build-in validation and state managment

### Installation

```
yarn add rc-4rm
```

or

```
npm install rc-4rm
```

### Usage

```js
import { SignForm } from "rc-4rm";
...
const handleSubmit = (data) => {
    console.log("handleSubmit, data", data);
    // Send data to server here with AJAX request
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
...
return (
    <div className="App">
        <h1>Sign in</h1>
        <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
            <SignForm handleSubmit={handleSubmit} clearAfter={true} />
        </div>
    </div>
);
```

### API

#### `SignForm`

| prop            | type                                                          | description                                                                          |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| handleSubmit    | (data) => void                                                | callback function triggered on `onSubmit`, sends `data` object `{ email, password }` |
| className       | string                                                        | class added to bootstrap form classes                                                |
| clearAfter      | boolean                                                       | should form fields be set to empty string after promise resolved                     |
| isConfirmPass   | boolean                                                       | confirm password input for signing up                                                |
| isCheck         | boolean                                                       | check me out checkbox                                                                |
| labels          | {"email": "Enter email", ...}                                 | object with labels for inputs                                                        |
| info            | {"email": "Should be valid email", ...}                       | object with information for inputs                                                   |
| successFeedback | {"email": "Email is valid", ...}                              | object with success feedback for inputs validation                                   |
| errorFeedback   | {"email": "Email is invalid", ...}                            | object with error feedback for inputs validation                                     |
| validators      | {"email": (value: string) => /\S+@\S+\.\S+/.test(value), ...} | object with validator functions for each field                                       |

<details>
<summary><code>SignForm</code> Extended example</summary>

```js
<SignForm
    handleSubmit={handleSignIn}
    clearAfter={false}
    isConfirmPass={true}
    isCheck={true}
    validators={{
        email: (value: string) => /\S+@\S+\.\S+/.test(value),
        password: (value: string) => value.length > 6,
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
```

</details>

#### `CustomForm`, currently supported only the following field types: text, email, password

| prop          | type                                                                                                                                                                      | description                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| handleSubmit  | (data) => void                                                                                                                                                            | callback function triggered on `onSubmit`, sends `data` object `{ email, password }` |
| className     | string                                                                                                                                                                    | class added to bootstrap form classes                                                |
| clearAfter    | boolean                                                                                                                                                                   | should form fields be set to empty string after promise resolved                     |
| fields        | Array of CustomFormField objects { id: number; type: string; name: string; label: string; validator: (value: any) => boolean; placeholder?: string; required?: boolean; } | should form fields be set to empty string after promise resolved                     |
| requiredLabel | string                                                                                                                                                                    | String near field label signifying that field is required. Default is "\*"           |

### `CustomForm` usage

```js
<CustomForm
    handleSubmit={handleSubmit}
    fields={CUSTOM_FORM_FIELDS_DATA}
    clearAfter={true}
    className="w-50"
    requiredLabel=" (Required!)"
/>
```

## LICENSE [MIT](https://github.com/AlexanderPershin/rc-4rm/blob/master/LICENCE.md)

Copyright (c) 2022 Alexander Pershin
