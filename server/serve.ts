import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import chalk from "chalk";
import os from "os";

// load db before other imports, so models can be loaded into sequelize
import { default as startDb, sequelize} from "./db/start";
import seedDb from "./db/seed";

let expressSession = require("express-session");
let SequelizeStore = require("connect-session-sequelize")(expressSession.Store);

import config from "../gulpfile.config";
import routes from "./routes/";
import passport from "passport";
let cookieParser = require("cookie-parser");

import DevAuthStrategy from "./auth/dev/passportStrategy";
import serializeUser from "./auth/serializeUser";
import deserializeUser from "./auth/deserializeUser";

const BASE_URL = config.baseUrl;
const PORT = config.isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;

export let serve = async function () {

  let sequelizeStore = null;
  try {
    await startDb();
    await seedDb();
    sequelizeStore = new SequelizeStore({
      db: sequelize,
    });
    await sequelizeStore.sync();
  } catch (err) {
    console.error(err.stack || err);
  };

  let app = express()
    .use(bodyParser.urlencoded({
      extended: true,
    }))
    .use(cookieParser())
    .use(expressSession({
      secret: "secret",
      store: sequelizeStore,
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time ms"));

  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  app.use(BASE_URL, express.static(`${__dirname}/public`));
  app.use(BASE_URL, express.static(`${config.distPath}`));
  passport.use(DevAuthStrategy);

  app.get("/login", (req, res) => {
    return res.status(403).send("unauthorized: please login first");
  });

  app.use(
    [].concat(process.env.NODE_ENV !== "production" ? [passport.authenticate("development", {})] : []),
    routes
  );

  let server = app.listen(PORT, "0.0.0.0", () => {
    let url = "http://" + os.hostname() + ":" + server.address().port + "/";
    console.log(`Server listening at ${chalk.green(url)}`);
  });
};

serve();
