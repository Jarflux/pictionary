var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/service/GameService.spec.ts'
    ],
    exclude: [],
    preprocessors: {
      'src/service/GameService.spec.ts': ['webpack'],
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.ts', '.tsx']
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
        ]
      },
      stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
