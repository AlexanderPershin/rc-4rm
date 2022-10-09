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

| prop         | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| handleSubmit | callback function triggered on `onSubmit`, sends `data` object `{ email, password }` |
| clearAfter   | should form fields be set to empty string after promise resolved                     |

## LICENSE [MIT](LICENSE)

Copyright (c) 2022 Alexander Pershin
