import * as path from "path";
import * as webpack from "webpack";
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let SpritesmithPlugin = require("webpack-spritesmith");

import { isDev, distPath, port, baseUrl, tmpPath } from "./config";

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
  cache: isDev,
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    path: path.resolve(distPath),
    publicPath: isDev ? `http://${process.env.HOSTNAME}:${port}${baseUrl}/` : `${baseUrl}`,
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
        {
          test: /\.scss$/,
          use: [
            {
              loader: isDev ? "style-loader" : ExtractTextPlugin.extract({ loader: "css-loader" }),
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "resolve-url-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./images/[name].[hash].[ext]",
              },
            },
          ],
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
      chunks: ["js/app"],
      minChunks: ({ userRequest }) =>
        typeof userRequest === "string" && [
          /node_modules/
        ].some(regex => regex.test(userRequest))
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "client/sprites/"),
        glob: "**/*.png",
      },
      target: {
        image: path.resolve(`${tmpPath}/spritesmith-generated/sprites.png`),
        css: path.resolve(`${tmpPath}/spritesmith-generated/sprites.scss`),
      },
      apiOptions: {
        cssImageRef: "sprites.png",
      },
    }),
  ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: isDev,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: "css/app.css",
      disable: false,
      allChunks: true,
    }),
  ]),
  resolve: {
    alias: {},
    extensions: [ ".js", ".jsx", ".json", ".ts", ".tsx" ],
    modules: [
      "node_modules",
      `${tmpPath}/spritesmith-generated`,
    ],
  },
  performance: {
    hints: false
  },
};

export default webpackConfig;
