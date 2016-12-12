import * as path from "path";
import * as webpack from "webpack";

import { isDev, distPath, port, baseUrl } from "./config";

let webpackConfig: webpack.Configuration = {
  entry: {
    app: (isDev ? [
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
    publicPath: isDev ? `http://${process.env.HOSTNAME}:${port}${baseUrl}js/` : `${baseUrl}`,
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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "lib",
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
