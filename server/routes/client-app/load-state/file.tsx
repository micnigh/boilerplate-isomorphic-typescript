export let loadStateFromFile = async function (user: any) {
  let initialState = require("../../../db/seed").initialState;
  return initialState;
};

export default loadStateFromFile;
