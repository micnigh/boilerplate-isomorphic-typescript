import * as express from "express";
import * as webpack from "webpack";
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");

export let router = express.Router({ mergeParams: true });

let webpackConfig = require("../../../../webpack.config.ts").default as webpack.Configuration;

let compiler = webpack(webpackConfig);

router.use(webpackDevMiddleware(compiler, {
  publicPath: "/js/",
}));

router.use(webpackHotMiddleware(compiler));

export default router;
