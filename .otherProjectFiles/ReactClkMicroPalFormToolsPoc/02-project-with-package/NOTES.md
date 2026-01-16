# NOTES

## clk-react-dynamic-forms

### Problems

#### Module './dynamic-form' was resolved to ../dynamic-form.tsx', but '--jsx' is not set.ts(6142)

```shell
Module './dynamic-form' was resolved to '/home/c3/ReactClkMicroPalFormToolsPoc/02-project-with-package/clk-react-dynamic-forms/src/lib/dynamic-form.tsx', but '--jsx' is not set.ts(6142)
```

- [Cannot use JSX unless the '--jsx' flag is provided](https://stackoverflow.com/questions/50432556/cannot-use-jsx-unless-the-jsx-flag-is-provided)
  - [https://stackoverflow.com/a/64946881](https://stackoverflow.com/a/64946881)

fix adding:

- `tsconfig.json`

```json
{
  "include": ["src"], /* Include only the src directory */
  "compilerOptions": {
    "jsx": "react"
  }
}
```

#### Warning when develop with Dev

it will not clean up dist `dir`, and create some issues, specially when we export files, refactor components etc, use with caution

```json
  "scripts": {
    "dev": "rimraf dist && tsc -w",
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "build": "tsc"
  },
```

#### Can't import the TSX Component in consumer App

- [Exporting React TypeScript Components in a Library](https://claude.ai/chat/fb489eda-5c9a-4cbb-a349-8d8616695d2a)

```shell
ERROR
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

change `clk-react-dynamic-forms/src/index.ts`

```ts
// export * from './lib/components/DynamicFormComponent';
export { default as DynamicFormComponent } from './lib/components/DynamicFormComponent';
export { default as Component } from './lib/components/Component';
export * from './lib/interfaces';
```

we add a simple component `Component` to test, without `react-form-hook` and other problematic dependencies

- `clk-react-dynamic-forms/src/lib/components/Component.tsx`

```ts
import React from "react";

const Component: React.FC = () => {
  return (<div>Component</div>);
};

export default Component;
```

modify `clk-react-dynamic-forms/package.json` to

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",  
  "files": [
    "dist"
  ],
  "devDependencies": {
    "rimraf": "^6.0.1",
    "typescript": "^5.1.6"
  },
  "peerDependencies": {
    "@mui/material": "^6.1.6",
    "@types/react-dom": "^18.2.7",
    "@types/react": "^18.2.21",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-hook-form": "^7.53.1",
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
  }  
}
```

change `tsconfig.json` to

```json
{
  // include only the src directory
  "include": [
    "src"
  ],
  // exclude
  "exclude": [
    "node_modules",
    "dist"
  ],
  "compilerOptions": {
    // set the javascript language version for emitted javascript and include compatible library declarations.
    "target": "es2016",
    // specify what module code is generated
    "module": "commonjs",
    // generate .d.ts files from typescript and javascript files in your project
    "declaration": true,
    "outDir": "dist",
    // emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility
    "esModuleInterop": true,
    // ensure that casing is correct in imports
    "forceConsistentCasingInFileNames": true,
    // Enable all strict type-checking options
    "strict": true,
    // skip type checking all .d.ts files
    "skipLibCheck": true,
    "sourceMap": true,
    "allowJs": false,
    "moduleResolution": "node",
    "declarationDir": "dist",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    // fix '--jsx' is not set.ts(6142)
    "jsx": "react",
  }
}
```

```shell
$ pnpm build
```

now test it in `App.tsx`

```tsx
{tool && <Component />}
```

will work

```tsx
{tool && <DynamicFormComponent tool={tool} i18nFn={i18nFn} />}
```

```shell
$ pnpm start
Compiled successfully!

You can now view clk-react-dynamic-forms in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.122.243:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.
```

but when open browser page, will fail with problem of

```shell
Uncaught runtime errors: ERROR
dispatcher is null
```

#### Configure Rollup for your library and see if that resolves the "dispatcher is null" error

install the required Rollup plugins:

```shell
$ pnpm install --save-dev \
  @rollup/plugin-typescript \
  @rollup/plugin-commonjs \
  @rollup/plugin-node-resolve \
  rollup \
  rollup-plugin-peer-deps-external \
  tslib
```

Update your `package.json` scripts to use Rollup for building your library:

```json
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

Create a `rollup.config.mjs` file in the root of your project with the following configuration:

```mjs
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist'
    })
  ],
  external: ['react', 'react-dom', 'react-hook-form', 'tslib']
};
```

Update your `tsconfig.json` to include the following options:

```json
{
  // include only the src directory
  "include": [
    "src"
  ],
  // exclude
  "exclude": [
    "node_modules",
    "dist"
  ],
  "compilerOptions": {
    // set the javascript language version for emitted javascript and include compatible library declarations.
    "target": "es2016",
    // specify what module code is generated
    "module": "esnext",
    // generate .d.ts files from typescript and javascript files in your project
    "declaration": true,
    "outDir": "dist",
    // emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility
    "esModuleInterop": true,
    // ensure that casing is correct in imports
    "forceConsistentCasingInFileNames": true,
    // Enable all strict type-checking options
    "strict": true,
    // skip type checking all .d.ts files
    "skipLibCheck": true,
    "sourceMap": true,
    "allowJs": false,
    "moduleResolution": "node",
    "declarationDir": "dist",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    // fix '--jsx' is not set.ts(6142)
    "jsx": "react",
  }
}
```

Update your `package.json` to include the correct entry points:

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
}
```

Run the build script:

```shell
$ pnpm build
```

#### Even after Configure Rollup we still have the annoying error "dispatcher is null" error



