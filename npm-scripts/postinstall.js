"use strict";
let fs = require("fs");
let execSync = require("child_process").execSync;

function execHelper(commands) {
  console.log(commands.join(" "));
  execSync(commands.join(" "), { stdio: "inherit" });
}

execHelper(["gulp", "--gulpfile", "gulpfile.transpile.js", "clean"]);
execHelper(["gulp", "--gulpfile", "gulpfile.transpile.js", "build"]);
try { fs.statSync("tsconfig.json"); } catch (e) { fs.writeFileSync("tsconfig.json", fs.readFileSync("tsconfig.sample.json")); }
