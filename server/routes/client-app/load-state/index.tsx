import { isDev } from "../../../../config";

import { loadStateFromDb } from "./db";
import { loadStateFromFile } from "./file";

let initialState = undefined;

export let loadState = async (user: any) => {
  try {
    if (isDev || process.env.NODE_ENV === "staging") {
      let { connectedToDB } = require("../../../db/start");
      if (connectedToDB) {
        console.log(`DB Started - creating state from DB`);
        initialState = await loadStateFromDb(user);
      } else {
        let { stateFile } = require("../../../db/seed");
        console.log(`DB Not Started - creating state from file ${stateFile}`);
        initialState = await loadStateFromFile(user);
      }
    } else {
      // staging/production
      if (process.env.NODE_ENV === "staging") {
        // disable db in staging until stable
        initialState = await loadStateFromFile(user);
        // initialState = loadStateFromDb(user);
      } else {
        initialState = await loadStateFromDb(user);
      }
    }
  } catch (e) {
    console.error("Failed to load initial state");
    console.error(e.stack || e);
  }
  return initialState;
};

export default loadState;
