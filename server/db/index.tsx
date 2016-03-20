let dotenv = require("dotenv");
dotenv.load({ path: `${__dirname}/development.env` });

// configure db here - eg sequilize, knex

export let seed = async function () {
  try {
    // seed the db here
  } catch (err) {
    console.log(err.stack || err);
  }
};

export let databaseReady = seed();
