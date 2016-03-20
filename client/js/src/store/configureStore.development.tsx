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
declare let module: any;

let configureStore = (initialState) => {
  let store = createStore(
    rootReducer,
    initialState,
    compose(
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
