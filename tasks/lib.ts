import * as yargs from "yargs";
let { exec } = yargs.argv;
import * as bluebird from "bluebird";
import * as webpack from "webpack";
import * as fs from "fs";
import webpackConfig from "./lib.webpack.config.ts";

let mkdirp: (path: string) => bluebird<void> = bluebird.promisify<void>(require("mkdirp"));
let glob: (path: string) => bluebird<string[]> = bluebird.promisify<string[]>(require("glob"));
let fsReadFile: (path: string) => bluebird<string> = bluebird.promisify<string>(require("fs").readFile);
let fsWriteFile: (path: string, content: string) => bluebird<void> = bluebird.promisify<void>(require("fs").writeFile);
import * as path from "path";

import { isDev, distPath, port, dllLibPath, dllLibFileName } from "../config";

let buildLib = async () => {
  let stats = await new Promise<webpack.Stats>(resolve => webpack({ ...webpackConfig, stats: "minimal"}, (err, stats) => resolve(stats)));
  console.log(stats.toString({
    chunks: false,
    colors: true,
  }));
};

export let runTask = async () => {
  try {
    fs.statSync(`${dllLibPath}/${dllLibFileName}`);
    console.log(`Lib already built - skipping build`);
  } catch (e) {
    console.log("Building lib");
    await buildLib();
    console.log("Finished");
  }
};

if (exec) {
  runTask();
}

export default runTask;
