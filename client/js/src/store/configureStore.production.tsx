import { createStore, applyMiddleware, compose } from "redux";
import * as Redux from "redux";
let thunk = require("redux-thunk").default;
let promise: Redux.Middleware = require("redux-promise");

import rootReducer from "../reducers/";

declare let window: any;

let configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise),
    )
  );
};

export default configureStore;
