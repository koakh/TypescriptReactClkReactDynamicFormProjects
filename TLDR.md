# TLDR

- [TLDR](#tldr)
  - [Dual Repo Notes](#dual-repo-notes)
  - [Requirements](#requirements)
  - [Clone Projects](#clone-projects)
  - [open Vscode at](#open-vscode-at)
  - [Dev Environment](#dev-environment)
    - [Start Dev Env](#start-dev-env)
    - [Debug](#debug)
      - [Add Breakpoints](#add-breakpoints)
  - [Always use git scripts to work with dual projects git](#always-use-git-scripts-to-work-with-dual-projects-git)
  - [Build and use package with c3-frontend consumer](#build-and-use-package-with-c3-frontend-consumer)
    - [c3-frontend](#c3-frontend)
    - [now in Package clk-react-dynamic-form](#now-in-package-clk-react-dynamic-form)
  - [Fix cache mistery /now this is not need, this problems are solved with `yalc link`](#fix-cache-mistery-now-this-is-not-need-this-problems-are-solved-with-yalc-link)
  - [launch Debugger](#launch-debugger)
    - [Debug Consumer App](#debug-consumer-app)
    - [Debug package](#debug-package)
  - [Problems](#problems)
    - [old Node 16 Dependency Error](#old-node-16-dependency-error)
      - [Gemini](#gemini)
      - [Problem](#problem)
      - [Solution](#solution)
        - [0. Enter Path](#0-enter-path)
        - [1. The "Clean Slate" Preparation](#1-the-clean-slate-preparation)
        - [2. Bump Core Dependencies](#2-bump-core-dependencies)
        - [3. Update the browserslist](#3-update-the-browserslist)
        - [4. Handle Webpack 5 "Node Polyfills" (Important)](#4-handle-webpack-5-node-polyfills-important)
        - [5. Fix the Entry Point (React 18 Change)](#5-fix-the-entry-point-react-18-change)
        - [6. Final Test Run](#6-final-test-run)
  - [Check Map Files](#check-map-files)
    - [Update `tsconfig.json`](#update-tsconfigjson)
    - [Update `rollup.config.mjs`](#update-rollupconfigmjs)

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

## Dev Environment

### Start Dev Env

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

### Debug

#### Add Breakpoints

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

![image](attachments/2026-01-16-15-05-11.png)

![image](attachments/2026-01-16-15-06-19.png)

all done debug works in **consumer app** and in **package**

## Always use git scripts to work with dual projects git

- Commit/Push All:`pnpm git:sync "feature: added forms"`
- Pull All: `pnpm git:pull`
- Checkout Branch (All): `pnpm git:checkout main`
- Sync Only Child: `pnpm git:sync "fix: child component" child`
- Sync Only Root: `pnpm git:sync "chore: update root" root`

## Build and use package with c3-frontend consumer

### c3-frontend

```shell
$ git clone https://bitbucket.org/criticallinksteam/c3-frontend
$ cd c3-frontend
$ git checkout develop
$ npm i --legacy-peer-deps
```

now in frontend

```shell
# yalc add clk-react-dynamic-form@1.0.11
# now always use link, this is the trick

# if we use add we need to remove it first, aftre we have publish it in clk-react-dynamic-form with `"build:publish:push"` script
$ yalc remove clk-react-dynamic-form

# now link it
# yalc link clk-react-dynamic-form@1.0.11
$ yalc link clk-react-dynamic-form
Package clk-react-dynamic-form@1.0.11 linked ==> /tmp/c3-frontend/node_modules/clk-react-dynamic-form
```

great news: `yalc link` doesn't change `"clk-react-dynamic-form": "^1.0.11"` in `package.json`

Use `yalc link` instead of `yalc add`

There is a subtle difference:

- `yalc add` copies files and changes package.json.
- `yalc link` creates a symlink.

> Often, development servers track symlinks more aggressively. Try this in your consumer app

`yalc link` makes all the magic it even works with hotreload, now whwn I change something in package I just need to

optionaly add to `config-overrides.js`

```js
const webpack = require('webpack');

// require env here
module.exports = function override(config, env) {

  ...

  // clk-react-dynamic-form
  if (env === 'development') {
    // disable "managedPaths" for your package
    // this tells Webpack: "Don't assume node_modules/clk-react-dynamic-form is immutable"
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/])(?!clk-react-dynamic-form)/
      ],
    };

    // ensure the cache is invalidated if the .yalc folder changes
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
        // invalidate cache if yalc.lock changes
        yalc: ['./yalc.lock'] 
      },
    };
  }
}
```

now run `start:debug` script

```shell
$ npm run start:debug
```

launch debugger with `F5` top open window

> to debug the package always ue the `clk-react-dynamic-form-consumer-app`

### now in Package clk-react-dynamic-form

cgane some visible thing to prove that c3-frontend will get changes from package

- `NewRollUpClkReactDynamicForm/clk-react-dynamic-form/src/components/DynamicFormComponent.tsx`

for ex change

```tsx
{getI18nValue(i18nFn, tool?.form?.i18n?.buttons?.reset, 'Reset')}
```

to

```tsx
{/* {getI18nValue(i18nFn, tool?.form?.i18n?.buttons?.reset, 'Reset')} */}
CHANGED
```

```shell
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form
$ pnpm build:publish:push

src/index.ts → dist/index.esm.js...
created dist/index.esm.js in 4.6s
clk-react-dynamic-form@1.0.11 published in store.
clk-react-dynamic-form@1.0.11 published in store.
Pushing clk-react-dynamic-form@1.0.11 in /home/c3/c3-frontend
Package clk-react-dynamic-form@1.0.11 linked ==> /home/c3/c3-frontend/node_modules/clk-react-dynamic-form
```

> we see here c3-frontend project after we add it and re-build it with `pnpm build:publish:push`, ex `/home/c3/c3-frontend/node_modules/clk-react-dynamic-form`

and without touch anything I see the buttons change with hotreload

sometimes we need a refresh, hot reload will not work, but is good for me the way it works
but when it works, it always works, like we can make as many changes as we like in package and it will always reload and show changes

That is fantastic news! Switching from `yalc add` to `yalc link` is the "secret sauce" for hot reloading because it creates a symbolic link that the Webpack file watcher can follow directly.

## Fix cache mistery /now this is not need, this problems are solved with `yalc link`

It sounds like you are experiencing the classic "Yalc cache/build" mystery. Since your build:publish:push script is running correctly and even reports that it pushed to /home/c3-frontend, the issue is likely not in the connection, but in how the consumer app (c3-frontend) is resolving or caching the files.

Here are the most likely reasons why you aren't seeing your changes and how to fix them:

1. The `yalc push` vs. `node_modules` Cache

Even though `yalc push` updates the files in `node_modules`, Webpack (via `react-app-rewired`) often caches build results in a `.cache` folder.

The Fix: Stop the consumer app and clear the cache before restarting:

```shell
# In c3-frontend
$ rm -rf node_modules/.cache
$ npm run start:debug
```

now we don't have any cache problems

or

The Fix: Try forcing yalc to use a physical copy instead of a link:

Bash

```shell
# In c3-frontend
$ yalc add --pure clk-react-dynamic-form
```

> The `--pure` flag ensures it doesn't touch your package.json, just the local files





```
# split #1
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form
$ npm run build:publish:push
# and consumer app will detect the changes, recompile and refresh browser with changes

# split #2
$ cd NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app
$ npm run dev:cleanup
```


> sometimes after packages was rebuild, let consumer app rebuild and browser refresh alone and it works



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

### old Node 16 Dependency Error

```shell
Error: error:0308010C:digital envelope routines::unsupported
```

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

## Check Map Files

```shell
$ find . -name *.map

no files found
```

The reason your `.map` files are missing in **Project #2** is that **Rollup** and **TypeScript** operate independently regarding **sourcemaps**. Even if your code compiles, you must **explicitly tell both** the **TypeScript plugin** (to generate maps for definitions) and the **Rollup output** (to generate maps for the bundles).

### Update `tsconfig.json`

To get the `.d.ts.map` files (declaration maps) you see in **Project #1**, you must add `declarationMap: true` and `sourceMap: true`

in `NewRollUpClkReactDynamicForm/clk-react-dynamic-form/tsconfig.json`

```json
{
  "compilerOptions": {
    "declarationMap": true, // <--- Add this for .d.ts.map files
    "sourceMap": true, // <--- Add this for .js.map files
  }
}
```

now after build we have `.map` files

```shell
$ find NewRollUpClkReactDynamicForm/clk-react-dynamic-form -name *.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/index.js.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/index.esm.js.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/dynamic-form.interface.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/dynamic-text-field-props.interface.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/index.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/tool.interface.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/controller-render-props-field.interface.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/interfaces/prompt.interface.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/components/DynamicFormComponent.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/components/MyForm.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/enums/dynamic-form.enum.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/enums/index.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/types/dynamic-form.type.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/types/index.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/lib/dynamic-form.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/utils/main.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/utils/index.d.ts.map
NewRollUpClkReactDynamicForm/clk-react-dynamic-form/dist/index.d.ts.map
```

### Update `rollup.config.mjs`

To get the `index.js.map` and `index.esm.js.map` files, you must add `sourcemap: true` to each output object.

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

declarationMap: This generates the link between your `.d.ts` files and your `.ts` source code.
Without it, VS Code can't "Go to Definition" into your library's actual source code.

`sourcemap: true` (in output): This tells Rollup to take the mapping data provided by the TypeScript plugin and write it to the physical .map files in the dist folder.