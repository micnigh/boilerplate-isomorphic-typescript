import * as express from "express";
import * as webpack from "webpack";
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
import { merge } from "lodash";

import * as yargs from "yargs";
let { poll } = yargs.argv;

import { baseUrl } from "../../../../config";

export let router = express.Router({ mergeParams: true });

let webpackConfig = merge({}, require("../../../../webpack.config.ts").default) as webpack.Configuration;

let compiler = webpack(webpackConfig);

router.use(webpackDevMiddleware(compiler, {
  publicPath: `/`,
  watchOptions: {
    poll,
  },
  stats: "minimal",
}));

router.use(webpackHotMiddleware(compiler));

export default router;
