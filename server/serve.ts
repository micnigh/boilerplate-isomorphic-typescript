import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import chalk from "chalk";
import os from "os";
import path from "path";
import fs from "fs";
import _ from "lodash";

import config from "../gulpfile.config";

const BASE_URL = config.baseUrl;
const PORT = config.isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;

let app = express()
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(bodyParser.json())
  .use(compression());

let server = app.listen(PORT, "0.0.0.0", () => {
  let url = "http://" + os.hostname() + ":" + server.address().port + "/";
  console.log(`Server listening at ${chalk.green(url)}`);
});

app.use(BASE_URL, express.static(`${__dirname}/public`));
app.use(BASE_URL, express.static(`${config.distPath}`));
