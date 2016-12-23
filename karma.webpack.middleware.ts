import * as express from "express";
import * as webpack from "webpack";
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
import { merge } from "lodash";

import * as yargs from "yargs";
let { poll } = yargs.argv;

let router = express.Router({ mergeParams: true });

let webpackConfig = merge({}, require("./karma.webpack.config.ts").default) as webpack.Configuration;

let karmaEmitter = null;

let compiler = webpack(webpackConfig);
compiler.plugin("done", (stats) => {
  if (karmaEmitter) {
    karmaEmitter.refreshFiles();
  }
});

router.use(webpackDevMiddleware(compiler, {
  publicPath: "/",
  watchOptions: {
    poll,
  },
  stats: "minimal",
}));

router.use(webpackHotMiddleware(compiler));

export let createMiddleware = function (emitter) {
  karmaEmitter = emitter;
  return router;
};

export default {
  "middleware:webpackMiddleware": ["factory", createMiddleware],
};
