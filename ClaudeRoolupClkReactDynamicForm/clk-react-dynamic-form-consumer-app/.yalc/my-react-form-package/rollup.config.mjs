import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

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
    typescript()
  ]
}