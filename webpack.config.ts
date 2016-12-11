import * as path from "path";
import * as webpack from "webpack";

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
let isDev = process.env.NODE_ENV === "development";
let tmpPath = `.tmp/${process.env.NODE_ENV}`;
let distPath = `${tmpPath}/dist`;

let port = 3000;

let baseUrl = isDev ?
  process.env.BASE_URL || "/" :
  process.env.BASE_URL || "/";

let webpackConfig: webpack.Configuration = {
  entry: {
    app: [
      "./client/js/src/app",
    ],
  },
  devtool: isDev ? "inline-cheap-module-eval-source-map" : "source-map",
  debug: isDev,
  cache: isDev,
  output: {
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    path: path.resolve(distPath),
    publicPath: isDev ? `http://${process.env.HOSTNAME}:${port}${baseUrl}js/` : `${baseUrl}`,
  },
  module: {
    loaders:
      [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader?useCache=true&useBabel=true&transpileOnly=true&useTranspileModule=true",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
        },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      "process.env.JS_ENV": JSON.stringify("browser"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "lib",
      minChunks: (module) => isExternal(module),
    }),
  ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
  ]),
  resolve: {
    alias: {},
    extensions: [ "", ".js", ".jsx", ".json", ".ts", ".tsx" ]
  },
};

let isExternal = (module) => {
  let userRequest = module.userRequest;

  if (typeof userRequest !== "string") {
    return false;
  }

  return userRequest.indexOf("bower_components") >= 0 ||
         userRequest.indexOf("node_modules") >= 0 ||
         userRequest.indexOf("libraries") >= 0;
};

export default webpackConfig;
