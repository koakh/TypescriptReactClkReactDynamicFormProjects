import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: [
    'react',
    'react-dom',
    'react-hook-form',
    '@mui/material',
    '@emotion/react',
    '@emotion/styled'
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    // ignore the "use client" directive
    // bundles src/index.ts → dist/index.js, dist/index.esm.js...
    // (!) Module level directives cause errors when bundled, "use client" in "node_modules/@mui/utils/esm/useId/useId.js" was ignored.
    // node_modules/@mui/utils/esm/useId/useId.js (1:0)
    // 1: 'use client';
    // NOTE:  in the future, as React 18 and the Suspense for Server Components feature become more widely adopted, you may need to revisit this configuration to ensure compatibility.
    replace({
      'use client': '',
      delimiters: ['', ''],
      // prevent 
      // (!) Plugin replace: @rollup/plugin-replace: 'preventAssignment' currently defaults to false. It is recommended to set this option to `true`, as the next major version will default this option to `true`.
      preventAssignment: true // Set this option to true
    })
  ]
}