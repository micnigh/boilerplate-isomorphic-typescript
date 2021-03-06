import * as Redux from "redux";
import configureStore from "./configureStore";

export let store: Redux.Store<any> = undefined;

export let initStore = (initialState) => {
  store = configureStore(initialState);
  return store;
};

export default store;
