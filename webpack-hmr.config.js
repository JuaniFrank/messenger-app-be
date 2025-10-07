const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  mode: 'development',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: 'server.js',
      autoRestart: true,
      // 👇 esto hace que reinicie cada vez que webpack recompila
      restartable: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  watch: true, // 👈 importante para detectar cambios
};
