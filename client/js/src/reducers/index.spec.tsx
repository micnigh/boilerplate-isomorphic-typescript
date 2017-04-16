import reducer from "./";
import * as deepFreeze from "deep-freeze";

import { merge } from "lodash";

describe("root reducer", function () {
  it("return initial state", function () {
    let initState = reducer(undefined, {});
    expect(initState).not.toBeUndefined();
  });
});
