import "../../config";
import * as Sequelize from "sequelize";
import * as Dotenv from "dotenv";
import * as chalk from "chalk";

Dotenv.config({path: `./server/db/${process.env.NODE_ENV}.env`});

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

export let sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  benchmark: false,
});

export let connectedToDB = false;

let User = require("./models/user").default;

export const DATABASE_CONNECTION_ATTEMPTS = 60;
export const TIME_BETWEEN_CONNECTION_ATTEMPTS = 1000; // ms

let connectToDatabaseUntilSuccessful = async () => {

  connectedToDB = false;
  for (let i = 0; i < DATABASE_CONNECTION_ATTEMPTS; i++) {
    console.log(`connecting to database - attempt ${i + 1} of ${DATABASE_CONNECTION_ATTEMPTS}`);
    connectedToDB = await connectToDatabase();
    if (!connectedToDB) {
      await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(false), TIME_BETWEEN_CONNECTION_ATTEMPTS);
      });
    } else {
      break;
    }
  }

  if (connectedToDB) {
    console.log(`Successfully connected to database`);
  } else {
    console.log(`Failed connected to database after ${DATABASE_CONNECTION_ATTEMPTS} attempts`);
  }

  return connectedToDB;
};

let connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (e) {
    return false;
  }
};

export default async () => {
  try {
    await connectToDatabaseUntilSuccessful();
    await sequelize.sync();
  } catch (e) {
    console.error(chalk.red(e.stack || e));
  }
};
