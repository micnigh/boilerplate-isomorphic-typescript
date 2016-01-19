"use strict";
import { GulpConfig, JSBuildConfig, JSLibConfig } from "gulpfile.types.config";
import * as _ from "lodash";
import * as path from "path";
import * as webpack from "webpack";

let WebpackNotifierPlugin = require("webpack-notifier");

export default function generateConfig (config: GulpConfig, lib: JSLibConfig, entry: string) {
  let webpackConfig: webpack.Configuration = {
    entry: {},
    output: {
      path: lib.dest,
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
      extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx" ]
    },
    devServer: {
      contentBase: "server/public/",
      hot: true,
      inline: true,
    },
  };

  let libEntry = config.js.libs
    .map(l => l.requires)
    .reduce((a, b) => a.concat(b), []);
  webpackConfig.entry[path.basename(lib.destFileName, path.extname(lib.destFileName))] = libEntry.concat([`./${entry}`]);

  let providePluginOptions = {};
  libEntry.forEach(entry => {
    providePluginOptions[`window.${_.camelCase(entry)}`] = entry;
  });

  if (config.isDev) {
    webpackConfig.debug = true;
    webpackConfig.cache = true;
    webpackConfig.devtool = "inline-source-map";

    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.ProvidePlugin(providePluginOptions),
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
