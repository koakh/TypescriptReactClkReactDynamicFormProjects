const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ClkReactDynamicForms',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    '@emotion/react': {
      commonjs: '@emotion/react',
      commonjs2: '@emotion/react',
      amd: 'EmotionReact',
      root: 'EmotionReact'
    },
    '@emotion/styled': {
      commonjs: '@emotion/styled',
      commonjs2: '@emotion/styled',
      amd: 'EmotionStyled',
      root: 'EmotionStyled'
    },
    '@mui/material': {
      commonjs: '@mui/material',
      commonjs2: '@mui/material',
      amd: 'MuiMaterial',
      root: 'MuiMaterial'
    },
    'react-hook-form': {
      commonjs: 'react-hook-form',
      commonjs2: 'react-hook-form',
      amd: 'ReactHookForm',
      root: 'ReactHookForm'
    },
  }
};