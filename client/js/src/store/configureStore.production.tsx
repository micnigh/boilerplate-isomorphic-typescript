import { createStore, applyMiddleware, compose } from "redux";
import * as Redux from "redux";
let thunk = require("redux-thunk").default;
let promise: Redux.Middleware = require("redux-promise");
import { browserHistory } from "react-router";
let { routerMiddleware } = require("react-router-redux");

import rootReducer from "../reducers/";

declare let window: any;

let configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, routerMiddleware(browserHistory)),
    )
  );
};

export default configureStore;
