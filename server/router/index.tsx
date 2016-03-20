import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import chalk from "chalk";
import config from "../../gulpfile.config";
import path from "path";

import { Provider } from "react-redux";

let htmlTemplate = require("../templates/index.html");

export let router = express.Router({ mergeParams: true });

router.get(`${config.baseUrl}*`, (req, res, next) => {
  let store = require("../../client/js/src/store/").default;
  let routes = require("../../client/js/src/routes/").default;
  if (config.isDev) {
    // always use latest version of module each request
    clearModuleCacheForSharedModules();
  }

  match({
    routes,
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      try {
        res.status(200).send(htmlTemplate({
          isDev: config.isDev,
          content: renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          ),
          relPathToBaseUrl: relPathToBaseUrl(req.url),
        }));
      } catch (e) {
        console.log(chalk.red(e.stack));
        next();
      }
    } else {
      res.status(404).send("Not found");
    }
  });
});

let relPathToBaseUrl = function (path) {
  let result = path;
  result = result.replace(config.baseUrl, "/"); // remove baseUrl
  result = result.replace(/^.*?:\/\//, "", ""); // remove protocol
  result = "../".repeat(result.match(/\//g).length - 1); // each subdir = "../"
  return result;
};

let clearModuleCacheForSharedModules = function () {
  let escape = require("regexp.escape");
  let regExpString = "^" + escape(path.resolve(`${process.cwd()}/client/js/src/`));
  let regExpTester = new RegExp(regExpString);
  let modulesToDelete = [];
  for (let k in require.cache) {
    if (regExpTester.test(k)) {
      modulesToDelete.push(k);
      delete require.cache[k];
    }
  }
  modulesToDelete.forEach(m => delete require.cache[m]);
  console.log(chalk.yellow(`Cleared module cache with RegExp - deleted ${modulesToDelete.length} modules`));
};

export default router;
