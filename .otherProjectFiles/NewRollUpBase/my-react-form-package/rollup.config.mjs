import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true, // Keep this here
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    }
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
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true, // Hint for the plugin
      inlineSources: true,
      compilerOptions: {
        sourceMap: true, // Direct instruction to the compiler
      }
    }),
    resolve(),
    commonjs(),
  ]
}