import { GulpConfig } from "../../../gulpfile.config.types";

import karma from "karma";
import path from "path";

export default function generateConfig (config: GulpConfig): karma.ConfigOptions {
  let karmaConfig: karma.ConfigOptions = {
    frameworks: ["jasmine", "source-map-support"],
    browsers: [
      "ChromeCustom",
    ],
    customLaunchers: {
      ChromeCustom: {
        base: "Chrome",
        flags: [
          `--user-data-dir=${path.resolve(`${config.tmpPath}/.chrome`)}`,
          `--disable-session-crashed-bubble`,
          `--disable-infobars`,
          `--window-size=1024,768`,
          `--window-position=-102400,0`,
        ],
      },
    },
    client: {
      captureConsole: false
    },
    reporters: [
      "progress",
      "kjhtml",
      //"spec",
    ],
    port: config.test.karma.port,
    files: [
      {
        pattern: config.distPath + "/js/lib.js",
        included: true,
        watched: true,
        served: true,
      },
      {
        pattern: config.distPath + "/js/testLib.js",
        included: true,
        watched: true,
        served: true,
      },
      {
        pattern: config.distPath + "/js/test/**/*.js",
        included: true,
        watched: true,
        served: true,
      },
      {
        pattern: config.distPath + "/js/**/*.spec.js",
        included: true,
        watched: true,
        served: true,
      },
      {
        pattern: config.distPath + "/css/**/*.css",
        included: true,
        watched: false,
        served: true,
      },
      {
        pattern: config.distPath + "/**/*.*",
        included: false,
        watched: false,
        served: true,
      },
    ],
  };

  return karmaConfig;
}
