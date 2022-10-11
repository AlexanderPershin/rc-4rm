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

### Usage (currently only sign in form added, planned more)

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

| prop            | type                                    | Description                                                                          |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------ |
| handleSubmit    | (data) => void                          | callback function triggered on `onSubmit`, sends `data` object `{ email, password }` |
| clearAfter      | boolean                                 | should form fields be set to empty string after promise resolved                     |
| isConfirmPass   | boolean                                 | confirm password input for signing up                                                |
| isCheck         | boolean                                 | check me out checkbox                                                                |
| labels          | {"email": "Enter email", ...}           | object with labels for inputs                                                        |
| info            | {"email": "Should be valid email", ...} | object with information for inputs                                                   |
| successFeedback | {"email": "Email is valid", ...}        | object with success feedback for inputs validation                                   |
| errorFeedback   | {"email": "Email is invalid", ...}      | object with error feedback for inputs validation                                     |

## LICENSE [MIT](LICENSE)

Copyright (c) 2022 Alexander Pershin
