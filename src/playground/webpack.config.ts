import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import { version as buildVersion } from './package.json';
import path from 'path';
import exampleIndex from '../../docs/examples/index.json';

module.exports = {
  entry: {
    "main": './src/index.tsx',
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: ['file-loader']
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'vscode': require.resolve('@codingame/monaco-languageclient/lib/vscode-compatibility')
    },
    fallback: {
      'crypto': false,
      'os': false,
      'path': false,
      'net': false,
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // copy across the Blazor code for the compiler
        { from: '../Bicep.Wasm/bin/Release/net6.0/wwwroot/_framework', to: './_framework/' },
        // copy all the examples so that they can be loaded by the frontend
        ...exampleIndex.map(({ filePath }) => ({ from: `../../docs/examples/${filePath}`, to: `./examples/${filePath}`})),
      ],
    }),
    new HtmlWebpackPlugin({
      title: `Bicep Playground ${buildVersion}`,
      favicon: `./src/favicon.ico`,
      template: `./src/index.html`,
    }),
    new MonacoWebpackPlugin({
      languages: ['json']
    }),
  ],
  optimization: {
    // to avoid minimizing files under _framework (Blazor JS files), just turn off minification entirely.
    minimize: false,
  }
};
