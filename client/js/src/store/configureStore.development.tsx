import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as Redux from "redux";
let promise: Redux.Middleware = require("redux-promise");
import * as createLogger from "redux-logger";
import { browserHistory } from "react-router";
let { routerMiddleware } = require("react-router-redux");
let thunk = require("redux-thunk").default;
import { merge } from "lodash";

import queryString from "../misc/querystring";
import rootReducer from "../reducers/";

declare let window: any;
declare let module: any;

let configureStore = (initialState) => {
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      // applyMiddleware(thunk, promise, createLogger(), routerMiddleware(browserHistory)),
      applyMiddleware(thunk, promise, createLogger(), routerMiddleware(browserHistory)),
      typeof window === "object" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : f => f
    ) as () => any
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
