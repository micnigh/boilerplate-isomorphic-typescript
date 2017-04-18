import * as Redux from "redux";

let configureStore: {(initialState): Redux.Store<any>} = undefined;

if (process.env.NODE_ENV === "development") {
  configureStore = require("./configureStore.development").default;
} else {
  configureStore = require("./configureStore.production").default;
}

export default configureStore;
