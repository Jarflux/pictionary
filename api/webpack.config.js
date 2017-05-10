module.exports = {
  entry: './src/_app.ts',
  output: {
    filename: 'dist/app.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  devServer: { 'hide-modules': true }
};
