import { GulpConfig, JSBuildConfig } from "../../../../../gulpfile.config.types";
import path from "path";
import webpack from "webpack";

export default function generateConfig (config: GulpConfig, build: JSBuildConfig, entry: string, dest: string, port: number) {
  let webpackConfig: webpack.Configuration = {
    entry: {},
    output: {
      filename: "[name].js",
      chunkFilename: "[chunkhash].js",
      path: path.resolve(dest),
      publicPath: build.hmr ? `http://${process.env.HOSTNAME}:${port}${config.baseUrl}js/` : `${config.baseUrl}`,
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

  if (config.isDev && build.hmr) {
    // use `.es6` files and transpile with babel
    webpackConfig.module.preLoaders = [{
        test: /(\.es6|\.js)$/,
        loader: "source-map-loader",
      },
      {
      test: /\.es6$/,
      loader: "babel",
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: [
          "es2015",
          "react-hmre",
        ],
        plugins: [
          "syntax-async-functions",
          "transform-regenerator",
        ],
      },
    }];
    webpackConfig.resolve.extensions = [ "", ".es6", ".js" ];
  }
  let bootstrapEntries = typeof build.bootstrap !== "undefined" ? build.bootstrap.map(b => `./${b}`) : [];
  webpackConfig.entry[path.basename(entry, path.extname(entry))] = []
    .concat(bootstrapEntries)
    .concat([`./${entry}`])
    .map(e => path.resolve(e))
    .concat(config.isDev && build.hmr ? [
      `webpack-hot-middleware/client?path=http://${process.env.HOSTNAME}:${port}/__webpack_hmr`,
    ] : []);

  config.js.libs
    .forEach(lib => {
      let manifestRelativePath = path.relative(`${__dirname}`, `${process.cwd()}/${lib.dest}${lib.taskName}.manifest.json`);
      let manifest = require(manifestRelativePath);
      webpackConfig.plugins = webpackConfig.plugins.concat([
        new (webpack as any).DllReferencePlugin({
          context: "",
          manifest,
        }),
      ]);
    });

  let browserSyncInstances = typeof build.browsersync !== "undefined" ? build.browsersync : [];
  let browserSyncSnippets = browserSyncInstances.map(i => {
    let browserSyncConfig = config.watch.browsersync.find(b => b.instance === i);
    return {
        port: browserSyncConfig.port,
        path: `/browser-sync/browser-sync-client.js`,
    };
  });

  if (typeof build.webpack !== "undefined" && typeof build.webpack.plugins !== "undefined") {
    webpackConfig.plugins = webpackConfig.plugins.concat(build.webpack.plugins);
  }

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(config.isDev ? "development" : "production"),
    "process.env.JS_ENV": JSON.stringify("browser"),
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
      })
    ].concat(build.hmr ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : []));
  } else {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin(),
    ]);
  }



  return webpackConfig;
};
