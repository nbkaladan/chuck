const isDocker = require('is-docker')();

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      require("karma-coverage")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js': ['webpack']
    },

    webpack: {
      devtool: 'eval',
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$|\.jsx$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
            enforce: 'post',
            exclude: /node_modules|\.spec\.js$/,
          },
          { test: /\.html/, use: 'html-loader' },
          { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, type: 'asset/resource' },
          { test: /\.xlsx$/, use: 'file-loader' }
        ]
      }
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    webpackMiddleware: {
      noInfo: true,
      stats: "errors-only"
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
        // more permissions than Docker allows by default)
        flags: isDocker ? ['--no-sandbox'] : []
      },
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
      }
    },

    // if true, Karma runs tests once and exits
    singleRun: true,

    failOnEmptyTestSuite:false
  });
};
