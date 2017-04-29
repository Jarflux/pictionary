const path = require('path');
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const BabiliPlugin = require("babili-webpack-plugin");


const babiliOptions = [];
const SRC_DIR = './src';
path.join(__dirname, 'src');
const OUT_DIR = path.join(__dirname, 'dist');
const productEnv = ["production", "prd", "prod"];


module.exports = function (env) {
  const webpackPlugins = (productEnv.indexOf(env) > -1) ? [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new BabiliPlugin(babiliOptions)
  ] : [];

  return {
    entry: {
      app: [SRC_DIR + '/_app.ts']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              //options: babelOptions
            },
            {
              loader: 'awesome-typescript-loader'
            }
          ]
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              //options: babelOptions
            }
          ]
        }
      ]
    },
    plugins: webpackPlugins,
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      libraryTarget: 'commonjs',
      path: OUT_DIR,
      filename: '[name].js'
    }
  }

}
