"use strict";
import { GulpConfig, JSBuildConfig, JSLibConfig } from "gulpfile.types.config";
import * as path from "path";
import * as webpack from "webpack";

let WebpackNotifierPlugin = require("webpack-notifier");

export default function generateConfig (config: GulpConfig, build: JSBuildConfig, entry: string) {
  let webpackConfig: webpack.Configuration = {
    entry: {},
    output: {
      path: build.dest,
      filename: "[name].js",
      chunkFilename: "[chunkhash].js"
    },
    externals: {},
    module: {
      loaders: [
        {
          test: /\.ts(x?)$/,
          exclude: [
            /node_modules/,
          ],
          loaders: [
            "babel-loader?presets[]=es2015&presets[]=react&cacheDirectory",
            "ts-loader?transpileOnly=true",
          ],
        }
      ],
    },
    plugins: [
      new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true }),
    ],
    resolve: {
      alias: {},
      extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
    },
    devServer: {
      contentBase: "server/public/",
      hot: true,
      inline: true,
    },
  };

  webpackConfig.entry[path.basename(entry, path.extname(entry))] = [`./${entry}`];

  config.js.libs
    .map(l => l.requires)
    .reduce((a, b) => a.concat(b))
    .forEach((lib: string) => {
      webpackConfig.externals[lib] = lib;
    });

  if (config.isDev) {
    webpackConfig.debug = true;
    webpackConfig.cache = true;
    webpackConfig.devtool = "inline-source-map";
    webpackConfig.plugins = webpackConfig.plugins.concat([
      // TODO: add webpack hot loader middleware
    ]);
  } else {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ]);
  }

  return webpackConfig;
};
