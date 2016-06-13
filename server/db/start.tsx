import Sequelize from "sequelize";
let dotenv = require("dotenv").config({path: `./server/db/${process.env.NODE_ENV}.env`});
import chalk from "chalk";
import config from "../../gulpfile.config";

let {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = dotenv;

export let sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  benchmark: false,
});

export let connectedToDB = false;

let User = require("./models/user").default;

export default async () => {
  try {
    try { await sequelize.authenticate(); connectedToDB = true; } catch (e) { /* do nothing */ console.log("database unavailable") }
    await sequelize.sync();
  } catch (e) {
    console.error(chalk.red(e.stack || e));
  }
};
