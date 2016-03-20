import { GulpConfig, JSLibConfig } from "../../../../../gulpfile.config.types";
import webpack from "webpack";

export default function generateConfig (config: GulpConfig, build: JSLibConfig) {
  let webpackConfig: webpack.Configuration = {
    entry: {},
    output: {
      filename: "[name].js",
      chunkFilename: "[chunkhash].js",
      library: "[name]_[hash]",
      libraryTarget: "umd",
      path: build.dest,
    },
    externals: {},
    module: {
      noParse: [],
      preLoaders: [{
        test: /\.js$/,
        loader: "source-map-loader",
      }],
      loaders: [],
    },
    plugins: [],
    resolve: {
      alias: {},
      extensions: [ "", ".js", ".jsx" ]
    },
  };

  webpackConfig.entry[build.taskName] = build.includes;

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new (webpack as any).DllPlugin({
      path: `${build.dest}${build.taskName}.manifest.json`,
      name: "[name]_[hash]",
    }),
  ]);

  if (typeof build.webpack !== "undefined") {
    if (typeof build.webpack.module !== "undefined") {
      let loaders = build.webpack.module.loaders || [];
      webpackConfig.module.loaders = webpackConfig.module.loaders.concat(loaders);
      let noParse = build.webpack.module.noParse || [];
      webpackConfig.module.noParse = webpackConfig.module.noParse.concat(noParse);
    }
  }

  let browserSyncInstances = typeof build.browsersync !== "undefined" ? build.browsersync : [];
  let browserSyncSnippets = browserSyncInstances.map(i => {
    let browserSyncConfig = config.watch.browsersync.find(b => b.instance === i);
    return `http://localhost:${browserSyncConfig.port}/browser-sync/browser-sync-client.js`;
  });
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(config.isDev ? "development" : "production"),
  }));

  if (config.isDev) {
    webpackConfig.devtool = "inline-source-map";
  } else {
    webpackConfig.devtool = "source-map";
  }

  if (config.isDev) {
    webpackConfig.debug = true;
    webpackConfig.cache = true;
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.DefinePlugin({
        "process.env.BROWSER_SYNC_SNIPPETS": JSON.stringify(browserSyncSnippets),
      }),
    ]);
  } else {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin(),
    ]);
  }

  return webpackConfig;
};
