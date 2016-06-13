import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import chalk from "chalk";
import config from "../../../gulpfile.config";
import path from "path";
let escape = require("regexp.escape");

import { Provider } from "react-redux";
let htmlTemplate = require("./templates/index.html");
import { loadState } from "./load-state/";

export let router = express.Router({ mergeParams: true });

router.get(`${config.baseUrl}*`, async (req, res, next) => {
  try {
    let initialState = undefined;
    let { user } = req;
    user = user ? user : {
      displayName: "Guest",
      role: "GUEST",
    };
    console.log(chalk.bgBlue(`clientApp user`), JSON.stringify(user, null, 2));
    if (process.env.NODE_ENV !== "production") {
      clearNodeModuleCache();
    }
    initialState = await loadState(user);

    let { initStore } = require("../../../client/js/src/store/");
    let store = initStore(initialState);
    let routes = require("../../../client/js/src/routes/").default;

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
            inlineJS: `
              window.initialState = ${JSON.stringify(initialState)}
            `,
            content: renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            ),
            relPathToBaseUrl: relPathToBaseUrl(req.url),
          }));
        } catch (e) {
          console.log(chalk.red(e.stack));
          res.status(200).send(htmlTemplate({
            isDev: config.isDev,
            inlineJS: `
              window.initialState = ${JSON.stringify(initialState)}
            `,
            content: ``,
            relPathToBaseUrl: relPathToBaseUrl(req.url),
          }));
        }
      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (e) {
    console.error(chalk.red(e.stack || e));
  }
});

let relPathToBaseUrl = function (path) {
  let result = path;
  result = result.replace(config.baseUrl, "/"); // remove baseUrl
  result = result.replace(/^.*?:\/\//, "", ""); // remove protocol
  result = "../".repeat(result.match(/\//g).length - 1); // each subdir = "../"
  return result;
};

/**
 * Clears modules from node cache, so calling require will rebuild module
 */
let clearNodeModuleCache = function (options: {
  /** relative include paths from project dir */
  includePaths?: string[],
  /** relative exclude paths from project dir */
  excludePaths?: string[]
} = {
  includePaths: [],
  excludePaths: [],
}) {
  options = Object.assign({
    includePaths: [],
    excludePaths: [],
  }, options);
  let { includePaths, excludePaths } = options;
  excludePaths.push("node_modules");
  let regExpIncludePaths = includePaths.map(p => new RegExp("^" + escape(path.resolve(`${process.cwd()}/${p}`))));
  let regExpExcludePaths = excludePaths.map(p => new RegExp("^" + escape(path.resolve(`${process.cwd()}/${p}`))));
  let modulesToDelete = [];
  for (let k in require.cache) {
    if (regExpIncludePaths.length > 0) {
      if (
        regExpIncludePaths.some(r => r.test(k)) &&
        !regExpExcludePaths.some(r => r.test(k))
      ) {
        modulesToDelete.push(k);
      }
    } else {
      if (
        !regExpExcludePaths.some(r => r.test(k))
      ) {
        modulesToDelete.push(k);
      }
    }
  }
  console.log(modulesToDelete);
  modulesToDelete.forEach(m => delete require.cache[m]);
  console.log(chalk.yellow(`Cleared module cache with RegExp - deleted ${modulesToDelete.length} modules`));
};

export default router;
