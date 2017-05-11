const path = require('path');
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const BabiliPlugin = require("babili-webpack-plugin");

const babiliOptions = [];
const productEnv = ["production", "prd", "prod"];

module.exports = function (env) {
  const webpackPlugins = (productEnv.indexOf(env) > -1) ? [
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: false
      }),
      new BabiliPlugin(babiliOptions)
    ] : [];

  return {
    entry: './src/_app.ts',
    output: {
      libraryTarget: 'commonjs',
      filename: 'dist/app.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader'
            }
          ]
        }
      ],
      loaders: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },
    plugins: webpackPlugins,
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map'
  }
};
