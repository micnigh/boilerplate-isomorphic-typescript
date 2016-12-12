import * as path from "path";
import * as webpack from "webpack";
let ExtractTextPlugin = require("extract-text-webpack-plugin");

import { isDev, distPath, port, baseUrl } from "./config";

let webpackConfig: webpack.Configuration = {
  entry: {
    "js/app": (isDev ? [
      "webpack-hot-middleware/client",
      "react-hot-loader/patch",
    ] : []).concat([
      "./client/js/src/app",
    ]),
  },
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  debug: isDev,
  cache: isDev,
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    path: path.resolve(distPath),
    publicPath: isDev ? `http://${process.env.HOSTNAME}:${port}${baseUrl}/` : `${baseUrl}`,
  },
  module: {
    loaders:
      [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: "babel-loader!ts-loader?transpileOnly=true",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
        },
        {
          test: /\.scss$/,
          loaders: isDev ?
            ["style-loader", "css-loader?sourceMap=true", "sass-loader?sourceMap=true"] :
            [ExtractTextPlugin.extract(), "css-loader?sourceMap=true", "sass-loader?sourceMap=true"]
        }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "js/lib",
      minChunks: (module, count) => isExternal(module, count),
    }),
  ].concat(isDev ? [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("css/app.css"),
  ]),
  resolve: {
    alias: {},
    extensions: [ "", ".js", ".jsx", ".json", ".ts", ".tsx" ]
  },
};

let isExternal = (module, count) => {
  let { userRequest } = module;

  if (typeof userRequest !== "string") {
    return false;
  }

  return userRequest.indexOf("node_modules") >= 0;
};

export default webpackConfig;
