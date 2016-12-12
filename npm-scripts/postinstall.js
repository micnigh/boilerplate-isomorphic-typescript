"use strict";
let fs = require("fs");
let execSync = require("child_process").execSync;

function execHelper(commands) {
  console.log(commands.join(" "));
  execSync(commands.join(" "), { stdio: "inherit" });
}

try { fs.statSync("tsconfig.json"); } catch (e) { fs.writeFileSync("tsconfig.json", fs.readFileSync("tsconfig.sample.json")); }
try { fs.statSync("server/tsconfig.json"); } catch (e) { fs.writeFileSync("server/tsconfig.json", fs.readFileSync("server/tsconfig.sample.json")); }
