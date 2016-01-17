"use strict";
let execSync = require("child_process").execSync;

function execHelper(commands) {
  console.log(commands.join(" "));
  execSync(commands.join(" "), { stdio: "inherit" });
}

execHelper(["tsd", "install"]);
require("./build-gulp-tasks");
