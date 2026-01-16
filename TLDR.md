# TLDR

## Dual Repo Notes

warn this project is splitted in two distintict projects

- [TypescriptReactClkReactDynamicFormProjects](https://github.com/koakh/TypescriptReactClkReactDynamicFormProjects.git)

  this have all things, less `clk-react-dynamic-form`, we only expose `clk-react-dynamic-form` to critical-links repo, leaving all other things in privat project

- [clk-react-dynamic-form](https://bitbucket.org/criticallinksteam/clk-react-dynamic-form/src/main/)

  critical-links repo `clk-react-dynamic-form`

- /home/c3/TypescriptReactClkReactDynamicFormProjects/.git/config
  .git/config

- /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form/.git/config

## Requirements

```shell
$ node -v
v22.14.0
```

## Clone Projects

```shell
# clone main project TypescriptReactClkReactDynamicFormProjects
$ git clone https://github.com/koakh/TypescriptReactClkReactDynamicFormProjects.git
# enter path
$ cd TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm

# clone clk-react-dynamic-form clk package project
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/clk-react-dynamic-form.git
# back path
$ cd ..
$ tree -L 3
├── NewRollUpClkReactDynamicForm
│   ├── clk-react-dynamic-form
│   ├── clk-react-dynamic-form-consumer-app
```

## open Vscode at

- `/home/c3/TypescriptReactClkReactDynamicFormProjects`

## Start Dev Env

```shell
# enter project path
$ cd NewRollUpClkReactDynamicForm

# install packages in pnpm workspace
$ pnpm i
Scope: all 2 workspace projects
 WARN  1 deprecated subdependencies found: workbox-cacheable-response@6.6.0
Packages: +1297
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1298, reused 1293, downloaded 4, added 1297, done
Done in 24.7s

# term1
$ pnpm --filter clk-react-dynamic-form watch
rollup v3.29.4
bundles src/index.ts → dist/index.js, dist/index.esm.js...
created dist/index.js, dist/index.esm.js in 7s
[2026-01-16 12:40:43] waiting for changes...

# term2
$ pnpm --filter clk-react-dynamic-form-consumer-app start
Compiled successfully!

You can now view clk-react-dynamic-form-consumer-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.122.243:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.
```

TODO: how to use package in backend and how to publicsh it

## Add Breakpoints

add breakpoint here `e.target.reset();`

```ts
  // OPT #2
  const onSubmit = (data: any, e: any, tool: Tool) => {
    // reset after form submit
    e.target.reset();
    // required react hook form reset to
    reset();
    // console.log(`onSubmit data: ${JSON.stringify(data)}`);
    let payload = data;
```

or here `setGlobalError(null);`, this is the better place, after all renders are done, and form are ready to work

```tsx
          {/* reset button */}
          <Button variant='contained'
            type="reset"
            sx={tool?.form?.properties?.styles?.button}
            // onClick={reset as MouseEventHandler<HTMLButtonElement>}
            onClick={() => {
              // console.log(`tool.form?.elements: [${JSON.stringify(tool.form?.elements, undefined, 2)}]`);
              // console.log(`${JSON.stringify(tool.form?.elements?.find(e => e.key === 'subject')?.defaultValue, undefined, 2)}`);
              // clear previous errors
              setGlobalError(null);
              setGlobalErrors({});
              reset();
            }}
          >
            {getI18nValue(i18nFn, tool?.form?.i18n?.buttons?.reset, 'Reset')}
          </Button>
```

now launch the debugger with F5




```
# split #1
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form
$ npm run build:publish:push
# and consumer app will detect the changes, recompile and refresh browser with changes

# split #2
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
$ npm run dev:cleanup
```

> sometimes after packages was rebuil, let consumer app rebuild and broswer refresh alone and it works


![image](attachments/2026-01-16-15-05-11.png)

![image](attachments/2026-01-16-15-06-19.png)

all done debug works in consumer app and in package





## launch Debugger

launch debuger with F5 to debug consumer app at same time

package `clk-react-dynamic-form-consumer-app` debug, doesn't work with symbolic links, to do that we must move the directory ex

### Debug Consumer App

add a breakpoint to `setTool(data);` line

- `NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/src/App.tsx`

```ts
  useEffect(() => {
    let isMounted = true;
    fetch(apiEndpointGetToolId, { headers })
      .then((response) => response.json())
      .then((data: Tool) => {
        if (isMounted) {
          setTool(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
```

### Debug package










## Problems

### old Node 16 Dependency: Error: error:0308010C:digital envelope routines::unsupported

#### Gemini

- <https://gemini.google.com/app/7f9a18dbecb14e04>

The error you are seeing, ERR_OSSL_EVP_UNSUPPORTED, is a classic compatibility issue between Node.js v17+ and older versions of Webpack/react-scripts.

When you left this project a year ago, you were likely using Node.js v16 or older. Now you are running Node.js v22.14.0, which uses OpenSSL 3.0. OpenSSL 3.0 tightened security and no longer supports the "legacy" MD4 hashing algorithm that older Webpack versions (used by your react-scripts ^3.0.1) rely on.

#### Problem

```shell
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
$ npm run dev:cleanup
# outcome
Starting the development server...

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/util/createHash.js:90:53)
    at NormalModule._initBuildHash (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:401:16)
    at handleParseError (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:449:10)
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:481:5
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:342:12
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at runSyncOrAsync (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:130:11)
    at iterateNormalLoaders (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:232:2)
    at Array.<anonymous> (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
=============

WARNING: You are currently running a version of TypeScript which is not officially supported by typescript-estree.

You may find that it works just fine, or you may not.

SUPPORTED TYPESCRIPT VERSIONS: >=3.2.1 <3.5.0

YOUR TYPESCRIPT VERSION: 4.9.5

Please only submit bug reports when using the officially supported version.

=============
Browserslist: browsers data (caniuse-lite) is 15 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
(node:463684) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/react-scripts/scripts/start.js:19
  throw err;
  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/util/createHash.js:90:53)
    at NormalModule._initBuildHash (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:401:16)
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:433:10
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/webpack/lib/NormalModule.js:308:13
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:367:11
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:233:18
    at context.callback (/home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/c3/TypescriptReactClkReactDynamicFormProjects/NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/babel-loader/lib/index.js:51:103
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  opensslErrorStack: [
```

#### Solution

To run this project on Node 22 without the legacy flags, we need to **move from Webpack 4 (bundled in react-scripts 3) to Webpack 5 (bundled in react-scripts 5)**.

Here is the step-by-step guide to modernizing your consumer app.

##### 0. Enter Path

```shell
$ cd clk-react-dynamic-form-consumer-app
```

##### 1. The "Clean Slate" Preparation

Before bumping versions, wipe the old environment to prevent caching issues.

```shell
$ rm -rf node_modules package-lock.json
$ npm cache clean --force
```

##### 2. Bump Core Dependencies

We will move to react-scripts v5, which supports Node 22 and Webpack 5. We also need to align TypeScript and React types.

Run this command:

```shell
$ npm install react-scripts@5.0.1 react@18.3.1 react-dom@18.3.1 typescript@4.9.5 --save
$ npm install @types/react@18.3.12 @types/react-dom@18.3.1 @types/node@latest --save-dev
```

> Note: We are staying on TypeScript 4.9.5 for now because react-scripts has strict peer dependencies on TS < 5.0. This is the most stable path for a CRA-based project.

##### 3. Update the browserslist

Webpack 5 is stricter about browser targets. Update your `package.json` to ensure it doesn't try to polyfill dead browsers. Ensure your browserslist looks like this:

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

Then run:

```shell
$ npx update-browserslist-db@latest
```

##### 4. Handle Webpack 5 "Node Polyfills" (Important)

Webpack 5 (in react-scripts 5) stopped automatically polyfilling Node.js core modules (like crypto, path, stream).

- If your app or the `clk-react-dynamic-form` package uses these, you might see "Module not found" errors.

- Fix: If this happens, you will likely need to install `react-app-rewired` or` craco` to add them back, but let's try to run it without them first, as many modern MUI/React libraries no longer need them.

##### 5. Fix the Entry Point (React 18 Change)

React 18 changed how the app is mounted. Open src/index.tsx (or .js) and update it:

Old Code:

JavaScript

// src/index.tsx
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
New Code (React 18):

JavaScript

// src/index.tsx
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!); // The '!' is for TS
root.render(<App />);

##### 6. Final Test Run

Now try your cleanup and start command again:

```shell
$ npm run dev:cleanup
```

If you see "Module not found: Error: Can't resolve 'fs/path/crypto'..."
This is the only common "gotcha" when moving to react-scripts 5. If it happens, would you like me to provide the craco configuration to add those polyfills back?



















big gemini chat
https://gemini.google.com/app/17f215e12c199f53

Note: Make sure your VS Code "Folder" is opened at the root: /home/c3/TypescriptReactClkReactDynamicFormProjects


```shell
$ cd /home/c3/TypescriptReactClkReactDynamicFormProjects
# term1
$ pnpm --filter clk-react-dynamic-form watch
# term2
$ pnpm --filter clk-react-dynamic-form-consumer-app start
```



project #1

$ find . -name *.map
./dist/index.js.map
./dist/index.esm.js.map
./dist/interfaces/dynamic-form.interface.d.ts.map
./dist/interfaces/dynamic-text-field-props.interface.d.ts.map
./dist/interfaces/index.d.ts.map
./dist/interfaces/tool.interface.d.ts.map
./dist/interfaces/controller-render-props-field.interface.d.ts.map
./dist/interfaces/prompt.interface.d.ts.map
./dist/components/DynamicFormComponent.d.ts.map
./dist/components/MyForm.d.ts.map
./dist/enums/dynamic-form.enum.d.ts.map
./dist/enums/index.d.ts.map
./dist/types/dynamic-form.type.d.ts.map
./dist/types/index.d.ts.map
./dist/lib/dynamic-form.d.ts.map
./dist/utils/main.d.ts.map
./dist/utils/index.d.ts.map
./dist/index.d.ts.map

project #2

"build": "clear && rollup -c"

$ pnpm build
src/index.ts → dist/index.js, dist/index.esm.js...
created dist/index.js, dist/index.esm.js in 4.1s

$ find . -name *.map

no files found








The reason your .map files are missing in Project #2 is that Rollup and TypeScript operate independently regarding sourcemaps. Even if your code compiles, you must explicitly tell both the TypeScript plugin (to generate maps for definitions) and the Rollup output (to generate maps for the bundles).


1. Update tsconfig.json

To get the .d.ts.map files (declaration maps) you see in Project #1, you must add declarationMap: true and sourceMap: true.

add 

```json
{
  "compilerOptions": {
    "declarationMap": true, // <--- Add this for .d.ts.map files
    "sourceMap": true, // <--- Add this for .js.map files
  }
}
```

ok now we have .map files

```
$ find . -name *.map
./dist/interfaces/dynamic-form.interface.d.ts.map
./dist/interfaces/dynamic-text-field-props.interface.d.ts.map
./dist/interfaces/index.d.ts.map
./dist/interfaces/tool.interface.d.ts.map
./dist/interfaces/controller-render-props-field.interface.d.ts.map
./dist/interfaces/prompt.interface.d.ts.map
./dist/components/DynamicFormComponent.d.ts.map
./dist/components/MyForm.d.ts.map
./dist/enums/dynamic-form.enum.d.ts.map
./dist/enums/index.d.ts.map
./dist/types/dynamic-form.type.d.ts.map
./dist/types/index.d.ts.map
./dist/lib/dynamic-form.d.ts.map
./dist/utils/main.d.ts.map
./dist/utils/index.d.ts.map
./dist/index.d.ts.map
```

but breakpoints doesn't work


2. Update rollup.config.mjs

To get the index.js.map and index.esm.js.map files, you must add sourcemap: true to each output object.

add this

```mjs
export default {
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true, // <--- Add this
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true, // <--- Add this
    },
  ],
  plugins: [
    typescript({
      sourceMap: true, // <--- Add this
      declaration: true, // <--- Add this
      declarationMap: true, // <--- Add this
    }),
  ]
}
```


Why they disappeared:
declarationMap: This generates the link between your .d.ts files and your .ts source code. Without it, VS Code can't "Go to Definition" into your library's actual source code.

sourcemap: true (in output): This tells Rollup to take the mapping data provided by the TypeScript plugin and write it to the physical .map files in the dist folder.








always pull/push both proejcts
