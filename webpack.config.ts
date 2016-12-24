import * as path from "path";
import * as webpack from "webpack";
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let SpritesmithPlugin = require("webpack-spritesmith");
let CompressionPlugin = require("compression-webpack-plugin");

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
          test: /\.css$/,
          include: [ path.join(__dirname, "client/js/") ],
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.scss$/,
          include: [ path.join(__dirname, "client/js/") ],
          use: [
            { loader: "style-loader" },
            { loader: "css-loader", options: { modules: true, importLoaders: true, sourceMap: true }},
            { loader: "sass-loader", options: { sourceMap: true }}
          ],
        },
        {
          test: /app\.scss$/,
          include: [ path.join(__dirname, "client/css/") ],
          use: isDev ? [
            { loader: "style-loader" },
            { loader: "css-loader", options: { sourceMap: true }},
            { loader: "sass-loader", options: { sourceMap: true }}
          ] : [
            { loader: ExtractTextPlugin.extract({ loader: "raw-loader" })},
            { loader: "css-loader", options: { sourceMap: true }},
            { loader: "sass-loader", options: { sourceMap: true }},
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
        image: path.resolve(`client/css/src/app/shared/sprites.png`),
        css: path.resolve(`client/css/src/app/shared/sprites.scss`),
      },
      apiOptions: {
        cssImageRef: "app/shared/sprites.png",
      },
    }),
  ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new ExtractTextPlugin({
      filename: "css/app.css",
      disable: false,
      allChunks: true,
    }),
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
