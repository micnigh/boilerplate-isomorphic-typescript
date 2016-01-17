"use strict";

let glob = require("glob");

let tsFiles = []
  .concat(glob.sync("*.ts{,x}"))
  .concat(glob.sync("tasks/**/*.ts{,x}"));

let jsFiles = tsFiles
  .filter(f => !/\.d\.tsx?$/.test(f))
  .map(f => f.replace(/tsx?$/,"js"));

module.exports = {
  "commands": {
    "tsc": [
      "tsc",
      "--module", "commonjs",
      "--target", "es6",
      "--experimentalDecorators",
      "--moduleResolution", "node",
      "typings/tsd.d.ts",
    ]
      .concat(glob.sync("*.d.ts{,x}"))
      .concat(tsFiles),
    "babel": [
      "babel",
      "--out-dir", ".",
      "--presets", "es2015,react",
      "--plugins", "syntax-async-functions,transform-regenerator",
    ]
      .concat(jsFiles),
  }
};
