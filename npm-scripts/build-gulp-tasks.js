"use strict";
let execSync = require("child_process").execSync;

function execHelper(command) {
  console.log(command.join(" "));
  execSync(command.join(" "), { stdio: "inherit" });
}

execHelper(require("./config").commands.tsc);
execHelper(require("./config").commands.babel);
