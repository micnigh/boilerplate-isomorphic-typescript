import * as mkdirp from "mkdirp";
import * as chalk from "chalk";
import * as fs from "fs";
import * as moment from "moment";
import * as uuid from "uuid";
import { sequelize } from "./start";

import User from "./models/user";

import { tmpPath } from "../../config";

export let initialState: any = undefined;

let stateDir = `${tmpPath}/state/`;
mkdirp.sync(stateDir);
export let stateFile = `${stateDir}${moment().endOf("day").format("YYYY-MM-DD")}.json`;
export let generatedNewState = false;

try {
  fs.statSync(stateFile);
  // state file exists - load it
  initialState = JSON.parse(fs.readFileSync(stateFile).toString());
} catch (e) {
  // no state exists - create it
  initialState = require("../../client/js/src/store/sample/").default;
  fs.writeFileSync(stateFile, JSON.stringify(initialState, null, 2));
  generatedNewState = true;
}

export let shouldSeedDb = () => generatedNewState;

export let generateNewState = () => {
  return require("../../client/js/src/store/sample/default").default();
};

export default async () => {
  if (!shouldSeedDb()) return;

  console.time("SEED DB");

  let forceSyncTables = process.env.NODE_ENV === "development" ? true : false;

  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    await sequelize.sync({ force: forceSyncTables });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {raw: true});
    if (process.env.NODE_ENV !== "production") {
      // add seed data here
    }
  } catch (e) {
    console.error(chalk.red(e.stack || e));
  }

  console.timeEnd("SEED DB");
};
