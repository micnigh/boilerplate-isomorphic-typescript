import * as path from "path";
import * as webpack from "webpack";

import { isDev, baseUrl, tmpPath } from "./config";

let webpackConfig: webpack.Configuration = {
  entry: {
    "js/specs": [
      "webpack-hot-middleware/client?reload=true&quiet=true",
      "react-hot-loader/patch",
      "./karma.entry",
    ],
  },
  devtool: "inline-cheap-module-source-map",
  cache: true,
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    path: path.resolve(`${tmpPath}/karma/`),
    publicPath: `${baseUrl}`,
  },
  module: {
    rules:
      [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
          }],
        },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "js/lib",
      chunks: ["js/specs"],
      minChunks: ({ userRequest }) =>
        typeof userRequest === "string" && [
          /node_modules/
        ].some(regex => regex.test(userRequest))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
