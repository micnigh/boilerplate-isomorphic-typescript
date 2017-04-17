import * as path from "path";
import * as webpack from "webpack";
let CompressionPlugin = require("compression-webpack-plugin");
let VisualizerPlugin = require("webpack-visualizer-plugin");

import { isDev, distPath, port, baseUrl, tmpPath, dllLibManifestPath } from "./config";

let webpackConfig: webpack.Configuration = {
  entry: {
    "js/app": (isDev ? [
      "webpack-hot-middleware/client",
      "react-hot-loader/patch",
    ] : []).concat([
      "./client/js/src/entry",
    ]),
  },
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  cache: isDev,
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    path: path.resolve(distPath),
    publicPath: isDev ? `http://${process.env.HOSTNAME}:${port}${baseUrl}` : `${baseUrl}`,
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
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            { loader: "file-loader", options: { name: "./images/[name].[hash].[ext]" }},
          ],
        },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.DllReferencePlugin({
      manifest: require(`./${dllLibManifestPath}`),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "js/lib",
      chunks: ["js/app"],
      minChunks: ({ userRequest }) =>
        typeof userRequest === "string" && [
          /node_modules/
        ].some(regex => regex.test(userRequest))
    }),
    new VisualizerPlugin({
      filename: `./js/app-webpack-bundle-statistics.html`,
    }),
  ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: isDev,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new CompressionPlugin({
      test: /\.(js|html|css)(\.map)?$/,
    }),
  ]),
  resolve: {
    alias: {},
    extensions: [ ".js", ".jsx", ".json", ".ts", ".tsx" ],
  },
  performance: {
    hints: false
  },
};

export default webpackConfig;
