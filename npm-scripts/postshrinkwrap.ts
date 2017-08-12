import * as taskLib from "../tasks/lib";
import * as fs from "fs";
import { dllLibPath, dllLibFileName } from "../config";

export let runTasks = async () => {
  // build dll lib
  await taskLib.runTask();
};

runTasks();
