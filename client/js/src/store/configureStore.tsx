import Redux from "redux";

let configureStore: {(initialState): Redux.Store} = undefined;

if (process.env.NODE_ENV === "development") {
  configureStore = require("./configureStore.development").default;
} else if (process.env.NODE_ENV === "test") {
  configureStore = require("./configureStore.test").default;
} else {
  configureStore = require("./configureStore.production").default;
}

export default configureStore;
