import * as Redux from "redux";
import * as moment from "moment";
import { minBy, random } from "lodash";
import * as faker from "faker";
import * as uuid from "uuid";

let entities = {};

export let generateState = () => {
  entities = {};
  return {
    entities,
  };
};

export default generateState;
