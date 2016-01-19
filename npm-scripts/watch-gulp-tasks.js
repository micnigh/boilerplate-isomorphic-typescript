"use strict";
let spawn = require("cross-spawn");

require("./build-gulp-tasks");

function spawnHelper(command) {
  console.log(command.join(" "));
  spawn(command[0], command.slice(1), { stdio: "inherit" });
}

spawnHelper(require("./config").commands.tsc.concat("--watch"));
spawnHelper(require("./config").commands.babel.concat("--watch"));
