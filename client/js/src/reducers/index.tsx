let { routerReducer } = require("react-router-redux");
import { combineReducers } from "redux";
import { merge, get, set } from "lodash";

let routing = routerReducer;

import entities from "./entities/";

let App = combineReducers({
  entities,
  routing,
});

export default App;
