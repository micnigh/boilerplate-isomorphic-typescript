import chalk from "chalk";
import util from "util";
import { Strategy } from "passport";
import uuid from "uuid";

export function DevelopmentStrategy(options: any = {}) {
  Strategy.call(this);
  this.name = "development";
};

util.inherits(DevelopmentStrategy, Strategy);

DevelopmentStrategy.prototype.authenticate = async function (req, options = {}) {
  if (!req.user || (req.query && req.query.role)) {
    let { role } = req.query;
    role = role ? role.toUpperCase() : "GUEST";
    let sessionUser = {
      id: 1,
      guid: uuid.v4(),
      name: role.toLowerCase(),
      displayName: role.toLowerCase(),
      role,
    };
    console.log(chalk.bgBlue("Dev Strategy: Logging in as user"), JSON.stringify(sessionUser, null, 2));
    this.success(sessionUser, {});
  } else {
    this.pass();
  }
};

export let developmentStrategy = new DevelopmentStrategy({});

export default developmentStrategy;
