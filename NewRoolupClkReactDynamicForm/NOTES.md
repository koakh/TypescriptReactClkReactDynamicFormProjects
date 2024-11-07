# NOTES

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

Uncaught runtime errors:
ERROR
dispatcher is null


npm cache clean --force
rm -rf node_modules
npm install




FUCK THE TRICK IS USING YALC, seems that the problem is in LINK and npm i ../package :(







# In your package directory
yalc publish

# In your CRA app directory
yalc add clk-react-dynamic-form
Package clk-react-dynamic-form@1.0.0 added ==> /home/c3/@Package/@ClaudeClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/clk-react-dynamic-form
npm install
npm run start




and everytime watch detect some change is package you must do
npm run build && yalc publish && yalc push

WARN: in case when package don't apply to consumer app use in consumer-app

npm cache clean --force
rm -rf node_modules
yalc add clk-react-dynamic-form && npm i && npm run start

THE REAL AND FINAL TRICK is 

`clear && npm run build && yalc publish && yalc push` in package or `npm run build:publish:push`

and `yalc add clk-react-dynamic-form && npm i && npm run start` in consumer-app or `npm run dev`


FINAL FINAL
in the end is just
$ npm run build:publish:push
and refresh in browser TESTED



<Button variant="text"

className='form-button'

TODO:
style={{ display: 'block', marginTop: 10 }}
with
sx={{ mt: 2 }}

buttons HORIZONTAL align right, or one left and the other rigth


com o npm run watch

sempre q se muda algo no clk-react-dynamic-form
tem q se fazer
yalc push



o TRUQUE no frontend e fazer, senao nao funciona
yalc add my-react-form-package

Package my-react-form-package@1.0.0 added ==> /home/c3/@Package/@ClaudeClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/my-react-form-package
npm run start




prevent WARN #1

(!) Plugin typescript: @rollup/plugin-typescript TS2305: Module '"react-hook-form"' has no exported member 'UseFormWatch'.
src/lib/dynamic-form.tsx: (4:91)

4 import { Control, Controller, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

to fix add all to clk-react-dynamic-form/src/react-hook-form.d.ts



// TODO: AM

npm WARN EBADENGINE   package: '@testing-library/dom@10.4.0',
npm WARN EBADENGINE   required: { node: '>=18' },
npm WARN EBADENGINE   current: { node: 'v16.15.0', npm: '8.5.5' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'react-hook-form@7.53.1',
npm WARN EBADENGINE   required: { node: '>=18.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.15.0', npm: '8.5.5' }
npm WARN EBADENGINE }