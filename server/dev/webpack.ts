import express from "express";
import glob from "glob";
import { get } from "lodash";
let httpProxy = require("http-proxy");

import { JSBuildConfig } from "../../gulpfile.config.types";
import config from "../../gulpfile.config";

export let router = express.Router({ mergeParams: true });

let webpackConfigs: any[] = glob.sync(`${config.tmpPath}/webpackConfigs/*.json`).map(c => require(`${process.cwd()}/${c}`));
webpackConfigs.forEach(webpackConfigOption => {
  let { gulpfileConfigField, entry, dest, port, relativePath } = webpackConfigOption;
  let buildConfig: JSBuildConfig = get(config, gulpfileConfigField) as any;
  let proxy = httpProxy.createProxyServer();
  router.get(`${config.baseUrl}js/${relativePath}*`, (req, res) => {
    proxy.web(req, res, {
      target: `http://localhost:${port}`,
      ws: true,
    });
  });
});

export default router;
