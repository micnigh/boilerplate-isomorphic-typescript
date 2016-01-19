"use strict";
let spawnSync = require("cross-spawn").sync;

function spawnHelper(command) {
  console.log(command.join(" "));
  spawnSync(command[0], command.slice(1), { stdio: "inherit" });
}

spawnHelper(require("./config").commands.tsc);
spawnHelper(require("./config").commands.babel);
