import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import chalk from "chalk";
import os from "os";

import config from "../gulpfile.config";
import * as api from "./api/";
import reactRouter from "./router/";

const BASE_URL = config.baseUrl;
const PORT = config.isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;

export let serve = async function () {
  let app = express()
    .use(bodyParser.urlencoded({
      extended: true,
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time ms"));

  app.use(BASE_URL, express.static(`${__dirname}/public`));
  app.use(BASE_URL, express.static(`${config.distPath}`));

  app.use("/api", api.router);

  if (config.isDev) {
    try { app.use(require("./dev/webpack").default); } catch (err) { console.error(err.stack || err); }
  }

  app.use(reactRouter);

  let server = app.listen(PORT, "0.0.0.0", () => {
    let url = "http://" + os.hostname() + ":" + server.address().port + "/";
    console.log(`Server listening at ${chalk.green(url)}`);
  });
};
serve();
