import * as React from "react";
import * as express from "express";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import * as styleSheet from "styled-components/lib/models/StyleSheet";

import * as chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
let escape = require("regexp.escape");

import { isDev, tmpPath, distPath, port, baseUrl, dllLibFileName } from "../../../config";

import { Provider } from "react-redux";
import { initStore } from "../../../client/js/src/store/";
import App from "../../../client/js/src/app";

export let router = express.Router({ mergeParams: true });

router.use(async (req, res) => {
  try {

    let initialState = {};
    let store = initStore(initialState);

    let { user } = req;
    user = user ? user : {
      displayName: "Guest",
      role: "GUEST",
    };
    console.log(chalk.bgBlue(`clientApp user`), JSON.stringify(user, null, 2));

    let context: any = {};
    let appHtml = ReactDOMServer.renderToString(
      <StaticRouter
        location={req.url.replace(/^\//, baseUrl)}
        context={context}
      >
        <Provider store={store}>
          <App/>
        </Provider>
      </StaticRouter>
    );
    const styles = styleSheet.rules().map(rule => rule.cssText).join("\n");

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.status(200).send(`
        <!doctype html>
        <html class="no-js" lang="">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Boilerplate Isomorphic Typescript</title>
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <link rel="apple-touch-icon" href="${relPathToBaseUrl(req.url)}favicon.png">
                <link rel="icon"
                      type="image/png"
                      href="${relPathToBaseUrl(req.url)}favicon.png">
                <style>${styles}</style>
            </head>
            <body>
                <div id="content">${appHtml}</div>
                <script type="text/javascript">
                //<![CDATA[
                  window.initialState = ${JSON.stringify(initialState)}
                //]]>
                </script>
                <script src="${relPathToBaseUrl(req.url)}js/${dllLibFileName}"></script>
                <script src="${relPathToBaseUrl(req.url)}js/lib.js"></script>
                <script src="${relPathToBaseUrl(req.url)}js/app.js"></script>
            </body>
        </html>
      `);
    }
  } catch (e) {
    console.error(chalk.red(e.stack || e));
  }
});

let relPathToBaseUrl = function (path) {
  let result = path;
  result = result.replace(baseUrl, "/"); // remove baseUrl
  result = result.replace(/^.*?:\/\//, "", ""); // remove protocol
  result = "../".repeat(result.match(/\//g).length - 1); // each subdir = "../"
  return result;
};

export default router;
