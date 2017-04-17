import * as taskLib from "../tasks/lib";
import * as fs from "fs";
import { dllLibPath, dllLibFileName } from "../config";

export let runTasks = async () => {

  // copy sample files
  try { fs.statSync("tsconfig.json"); } catch (e) { fs.writeFileSync("tsconfig.json", fs.readFileSync("tsconfig.sample.json")); }
  try { fs.statSync("server/tsconfig.json"); } catch (e) { fs.writeFileSync("server/tsconfig.json", fs.readFileSync("server/tsconfig.sample.json")); }

  // build dll lib if needed
  await taskLib.runTask();
};

runTasks();
