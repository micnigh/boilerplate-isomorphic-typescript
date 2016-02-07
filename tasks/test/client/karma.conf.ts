import { GulpConfig } from "../../../gulpfile.config.types";

import karma from "karma";

export default function generateConfig (config: GulpConfig): karma.ConfigOptions {
  let karmaConfig: karma.ConfigOptions = {
    frameworks: ["jasmine", "source-map-support"],
    browsers: [
      "PhantomJS",
    ],
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
        watched: true,
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
