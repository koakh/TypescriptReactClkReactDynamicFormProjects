# NOTES

- [TypeScript React Package with react-hook-form and MUI 5](https://claude.ai/chat/9db6d8f4-faad-496e-b307-73b99f62e1a0)


```shell
$ cd $ my-react-form-package
$ npm link
$ npm run build
```

In your test project, run:

```shell
$ cd my-app
# in your CRA app directory, first install the required peer dependencies if not already installed:
$ npm install @mui/material @emotion/react @emotion/styled react-hook-form
$ npm install ../my-react-form-package
```

Now you can use the component in your CRA app:

App.tsx

```shell
import React from 'react';
import { MyForm } from 'my-react-form-package';

function App() {
  return (
    <div className="App">
      <h1>My Form Test</h1>
      <MyForm />
    </div>
  );
}

export default App;
```

Uncaught runtime errors:
ERROR
dispatcher is null


npm cache clean --force
rm -rf node_modules
npm install




FUCK THE TRICK IS USING YALC, seems that the problem is in LINK and npm i ../package :(