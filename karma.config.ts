import * as path from "path";
import * as Karma from "karma";
import * as tmp from "tmp";

import { isDev, tmpPath } from "./config";
import * as WebpackMiddleware from "./karma.webpack.middleware";

let tmpDir = tmp.dirSync({ prefix: "karma-chrome", unsafeCleanup: true });
let port = 9876;

export default (config: Karma.Config) => {
  let karmaConfig: Karma.ConfigOptions = {
    frameworks: ["jasmine", "source-map-support"],
    middleware: ["webpackMiddleware"],
    port,
    files: [
      `http://localhost:${port}/js/lib.js`,
      `http://localhost:${port}/js/specs.js`,
    ],
    preprocessors: {},
    plugins: [
      "karma-*",
      WebpackMiddleware.default,
    ],
    client: {
      captureConsole: false
    },
    reporters: [
      "progress",
      "kjhtml",
      //"spec",
    ],
    logLevel: config.LOG_INFO,
    colors: true,
    singleRun: false,
    browsers: [
      "ChromeCustom",
    ],
    customLaunchers: {
      ChromeCustom: {
        base: "Chrome",
        flags: [
          `--user-data-dir=${path.resolve(`${tmpDir.name}/.chrome`)}`,
          `--disable-session-crashed-bubble`,
          `--disable-infobars`,
          `--window-size=1024,768`,
          `--window-position=-102400,0`,
        ],
      },
    },
  };
  config.set(karmaConfig);
  return config;
};
