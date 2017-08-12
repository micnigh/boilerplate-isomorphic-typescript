import * as fs from "fs";
import * as md5 from "md5";

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

export let isDev = process.env.NODE_ENV === "development";
export let tmpPath = `.tmp/${process.env.NODE_ENV}`;
export let distPath = `${tmpPath}/dist`;

export const baseUrl = isDev ?
  process.env.BASE_URL || "/boilerplate-isomorphic-typescript/" :
  process.env.BASE_URL || "/boilerplate-isomorphic-typescript/";
process.env.BASE_URL = baseUrl;

export const port = isDev ?
  process.env.PORT || 3000 :
  process.env.PORT || 80;
process.env.PORT = port;

let libHash = md5(fs.readFileSync("./package-lock.json"));

export let dllLibPath = `.tmp/lib/`;
export let dllLibFileName = `libs.${libHash}.dll.js`;
export let dllLibManifestPath = `${dllLibPath}/${dllLibFileName}.manifest.json`;
