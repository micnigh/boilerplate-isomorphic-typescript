import { GulpConfig, JSBuildConfig, JSLibConfig } from "../../../../../gulpfile.config.types";
import _ from "lodash";
import path from "path";
import webpack from "webpack";

let WebpackNotifierPlugin = require("webpack-notifier");

export default function generateConfig (config: GulpConfig, build: JSBuildConfig, entry: string) {
  let webpackConfig: webpack.Configuration = {
    entry: {},
    output: {
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
    plugins: [],
    resolve: {
      alias: {},
      extensions: [ "", ".js", ".jsx" ]
    },
  };

  let bootstrapEntries = typeof build.bootstrap !== "undefined" ? build.bootstrap.map(b => `./${b}`) : [];
  webpackConfig.entry[path.basename(entry, path.extname(entry))] = []
    .concat(bootstrapEntries)
    .concat([`./${entry}`]);

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

    let browserSyncInstances = typeof build.browsersync !== "undefined" ? build.browsersync : [];
    let browserSyncSnippets = browserSyncInstances.map(i => {
      let browserSyncConfig = config.watch.browsersync.find(b => b.instance === i);
      return `http://localhost:${browserSyncConfig.port}/browser-sync/browser-sync-client.js`;
    });
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      "process.env.BROWSER_SYNC_SNIPPETS": JSON.stringify(browserSyncSnippets),
    }));

  } else {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ]);
  }

  return webpackConfig;
};
