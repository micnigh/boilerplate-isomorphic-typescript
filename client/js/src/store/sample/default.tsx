import Redux from "redux";
import moment from "moment";
import { minBy, random } from "lodash";
import faker from "faker";
import uuid from "node-uuid";

let entities = {};

export let generateState = () => {
  entities = {};
  return {
    entities,
  };
};

export default generateState;
