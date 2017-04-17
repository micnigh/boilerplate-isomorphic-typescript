import * as fs from "fs";
import * as md5 from "md5";

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

export let isDev = process.env.NODE_ENV === "development";
export let tmpPath = `.tmp/${process.env.NODE_ENV}`;
export let distPath = `${tmpPath}/dist`;

export const baseUrl = isDev ?
  process.env.BASE_URL || "/" :
  process.env.BASE_URL || "/";

export const port = isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;

let libHash = md5(fs.readFileSync("./npm-shrinkwrap.json"));

export let dllLibPath = `.tmp/lib/`;
export let dllLibFileName = `libs.${libHash}.dll.js`;
export let dllLibManifestPath = `${dllLibPath}/${dllLibFileName}.manifest.json`;
