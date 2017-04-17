import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as morgan from "morgan";
import * as chalk from "chalk";
import * as os from "os";

// load db before other imports, so models can be loaded into sequelize
import { default as startDb, sequelize} from "./db/start";
import seedDb from "./db/seed";

let expressSession = require("express-session");
let SequelizeStore = require("connect-session-sequelize")(expressSession.Store);

import routes from "./routes/";
import * as passport from "passport";
let cookieParser = require("cookie-parser");

import DevAuthStrategy from "./auth/dev/passportStrategy";
import serializeUser from "./auth/serializeUser";
import deserializeUser from "./auth/deserializeUser";

import { distPath, port, baseUrl, dllLibPath } from "../config";

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
  }

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
  passport.use(DevAuthStrategy);

  app.get("/login", (req, res) => {
    return res.status(403).send("unauthorized: please login first");
  });

  app.use(`${baseUrl}`, express.static(`${__dirname}/public`));
  app.use(`${baseUrl}`, express.static(`${distPath}`));
  app.use(`${baseUrl}js/`, express.static(`${dllLibPath}`));

  app.use(
    `${baseUrl}`,
    [].concat(process.env.NODE_ENV !== "production" ? [passport.authenticate("development", {})] : []),
    routes
  );

  let server = app.listen(port, "0.0.0.0", () => {
    let url = `http://${os.hostname()}:${server.address().port}${baseUrl}`;
    console.log(`Server listening at ${chalk.green(url)}`);
  });
};

serve();
