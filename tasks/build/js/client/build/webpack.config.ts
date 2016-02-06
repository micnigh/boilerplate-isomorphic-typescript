import { GulpConfig, JSBuildConfig, JSLibConfig } from "../../../../../gulpfile.config.types";
import _ from "lodash";
import path from "path";
import webpack from "webpack";

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
      noParse: [],
      preLoaders: [{
        test: /\.js$/,
        loader: "source-map-loader",
      }],
    },
    plugins: [
      new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true }),
    ],
    resolve: {
      alias: {},
      extensions: [ "", ".js", ".jsx" ]
    },
    devServer: {
      contentBase: "server/public/",
      hot: true,
      inline: true,
    },
  };

  webpackConfig.entry[path.basename(entry, path.extname(entry))] = [`./${entry}`];

  config.js.libs
    .map(l => l.includes)
    .reduce((a, b) => a.concat(b))
    .forEach(lib => {
      webpackConfig.externals[lib.name] = lib.global || _.camelCase(lib.name);
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
