import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
let promise: Redux.Middleware = require("redux-promise");
import createLogger from "redux-logger";
import { browserHistory } from "react-router";
let { routerMiddleware } = require("react-router-redux");
import { merge } from "lodash";

import queryString from "../misc/querystring";
import rootReducer from "../reducers/";

declare let window: any;

let configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, createLogger(), routerMiddleware(browserHistory)),
      typeof window === "object" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : f => f
    ) as () => any
  );
};

export default configureStore;
