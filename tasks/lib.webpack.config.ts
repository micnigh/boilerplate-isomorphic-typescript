import * as path from "path";
import * as webpack from "webpack";

let CompressionPlugin = require("compression-webpack-plugin");
let VisualizerPlugin = require("webpack-visualizer-plugin");

import { distPath, port, baseUrl, tmpPath, dllLibPath, dllLibFileName, dllLibManifestPath } from "../config";

let webpackConfig: webpack.Configuration = {
  entry: {
    "libs": [
      "./client/js/src/libs",
    ],
  },
  devtool: "source-map",
  cache: false,
  output: {
    filename: `${dllLibFileName}`,
    chunkFilename: "[chunkhash].js",
    path: path.resolve(`${dllLibPath}`),
    publicPath: `${baseUrl}`,
    library: `[name]`,
  },
  module: {
    rules:
      [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader" },
            { loader: "ts-loader", options: { transpileOnly: true }},
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader" }
          ],
        },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: `${dllLibManifestPath}`,
      name: `[name]`,
    }),
    new VisualizerPlugin({
      filename: `./lib-webpack-bundle-statistics.html`,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
    }),
    new CompressionPlugin({
      test: /\.(js|html|css)(\.map)?$/,
    }),
  ],
  resolve: {
    alias: {},
    extensions: [ ".js", ".jsx", ".json", ".ts", ".tsx" ],
  },
  performance: {
    hints: false
  },
};

export default webpackConfig;
