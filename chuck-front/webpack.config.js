"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = {
  static: path.resolve("dist"),
  hot: true,
  host: process.env.host || "chuck-facts.local",
  port: process.env.PORT || 3001,
  historyApiFallback: true,
  proxy: [
    { context: ["/api/**"],
      target: 'http://chuck-facts.local:3000/',
      changeOrigin: true,
      secure: false
    }
  ]
};

const webpackConfig = (env, argv) => {
  const config = {
    entry: {
      app: path.resolve("./src/app.js")
    },
    output: {
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].chunk.js",
      path: (argv.mode === 'development') ? path.join(__dirname, "dist") : path.join(__dirname, "dist"),
      publicPath: (argv.mode === 'development') ? undefined : '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.html$/,
          loader: "html-loader",
          exclude: path.resolve("./src/index.html")
        },
        {
          test: /\.css$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }]
        },
        {
          test: /\.less$/,
          use: [
            (argv.mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(png|woff(2)?|eot|ttf|otf|svg|pdf|ico)(\?[a-z0-9=\.]+)?$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve("./src/index.html")
      }),

      new webpack.optimize.SplitChunksPlugin({
        name: "common",
        filename: "common.js",
        minChunks: (module) => {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),

      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].chunk.css"
      })
    ]
  };

  if (argv.mode === 'development') {
    config.devServer = devServer;
    config.optimization = {
      moduleIds: 'named'
    };
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (argv.mode === 'production') {
    config.devtool = "source-map";
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      }
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    );
  }

  return config;
};

module.exports = webpackConfig;
