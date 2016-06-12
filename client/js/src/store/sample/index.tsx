import sampleDefault from "./default";

let sampleState = undefined;

let defaultSampleState = () => sampleDefault();

if (process.env.JS_ENV === "browser") {
  let { initialState } = window as any;
  sampleState = initialState || defaultSampleState();
} else {
  sampleState = defaultSampleState();
}

export default sampleState;
