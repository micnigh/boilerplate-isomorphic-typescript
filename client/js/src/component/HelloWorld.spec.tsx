import * as HelloWorld from "./HelloWorld";

if (/PhantomJS/.test(navigator.userAgent)) {
  // no console output if in phantom - too noisy
  console.log = function () {};
}

describe("Says something", () => {
  it("default export is a string", () => {
    expect(typeof HelloWorld.default).toEqual("string");
  });
});
