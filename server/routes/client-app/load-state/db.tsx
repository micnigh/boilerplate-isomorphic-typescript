import * as moment from "moment";
import { sequelize } from "../../../db/start";

export let loadStateFromDb = async function (user: any) {
  let initialState = {
    entities: {},
  };

  let transaction = await sequelize.transaction();

  try {
    // load state from db

  } catch (e) {
    await transaction.rollback();
    console.error(e.stack || e);
  }

  await transaction.commit();

  return initialState;
};
