import { GulpConfig } from "gulpfile.types.config";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";

let config: GulpConfig = {
  isDev: isDev,
  distPath: distPath,
  js: {
    libs: [
      {
        taskName: "lib",
        entries: [
          "client/js/lib/entry.ts",
        ],
        requires: [
          "react",
          "react-dom",
          "lodash",
        ],
        dest: `${distPath}/js/`,
        destFileName: "lib.js",
        watch: [
          "client/js/lib/**/*.js",
          "client/js/lib/**/*.js{,x}",
        ],
      },
    ],
    builds: [
      {
        taskName: "app",
        dest: `${distPath}/js/`,
        entries: [
          "client/js/src/*.ts{,x}",
        ],
        watch: [
          "client/js/src/**/*.ts{,x}",
        ],
      },
    ],
  },
  css: {
    builds: [
      {
        taskName: "app",
        entries: [
          "client/css/src/*.scss",
        ],
        dest: `${distPath}/css/`,
        includePaths: [
          "client/css/src/",
          "client/css/libs/",
          "node_modules/",
        ],
        watch: [
          "client/css/src/**/*.scss",
        ],
      },
    ],
  },
  spritesheet: {
    builds: [
      {
        taskName: "app",
        src: [
          "client/src/sprites/**/*.png",
        ],
        dest: `${distPath}/css/`,
        watch: [
          "client/src/sprites/**/*.png",
        ],
      },
    ],
  }
};

export default config;
