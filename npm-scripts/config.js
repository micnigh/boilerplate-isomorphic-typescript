"use strict";

let glob = require("glob");

let tsFiles = []
  .concat([
    "gulpfile.ts",
  ])
  .concat(glob.sync("tasks/**/*.ts{,x}"));

let jsFiles = tsFiles.map(f => f.replace(/tsx?$/,"js"));

module.exports = {
  "commands": {
    "tsc": [
      "tsc",
      "--module", "commonjs",
      "--target", "es6",
      "--experimentalDecorators",
      "--moduleResolution", "node",
      "typings/tsd.d.ts",
    ].concat(tsFiles),
    "babel": [
      "babel",
      "--out-dir", ".",
      "--presets", "es2015,react",
      "--plugins", "syntax-async-functions,transform-regenerator",
    ].concat(jsFiles),
  }
};
