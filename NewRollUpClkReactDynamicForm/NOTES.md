# NOTES

projects are in:
- `gram:~/Development/@Koakh/node-modules/@koakh/typescript-react-clk-react-dynamic-form-projects`
- `c3:~/TypescriptReactClkReactDynamicFormProjects`

- [TypeScript React Package with react-hook-form and MUI 5](https://claude.ai/chat/9db6d8f4-faad-496e-b307-73b99f62e1a0)

```shell
$ cd $ clk-react-dynamic-form
$ npm link
$ npm run build
```

In your test project, run:

```shell
$ cd clk-react-dynamic-form-consumer-app
# in your CRA app directory, first install the required peer dependencies if not already installed:
$ npm install @mui/material @emotion/react @emotion/styled react-hook-form
# NOTE: this will fire the error `dispatcher is null`
$ npm install ../clk-react-dynamic-form
```

Now you can use the component in your CRA app:

App.tsx

```shell
import React from 'react';
import { MyForm } from 'clk-react-dynamic-form';

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

## in case of force update use

```shell
$ npm cache clean --force
$ rm -rf node_modules
$ npm install
```

THE REAL AND FINAL TRICK is 

`clear && npm run build && yalc publish && yalc push` in package or `npm run build:publish:push`

and `npm cache clean --force || true && npm rm clk-react-dynamic-form-consumer || true && yalc add clk-react-dynamic-form  || true && npm i && npm run start` in consumer-app or `dev:cleanup`

FINAL FINAL
in the end is just
$ npm run build:publish:push
and consumer app will detect the changes, recompile and refresh browser with changes