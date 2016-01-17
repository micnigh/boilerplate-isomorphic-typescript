import { GulpConfig } from "gulpfile.types.config";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";

let config: GulpConfig = {
  isDev: isDev,
  distPath: distPath,
  js: {
    libs: {
      taskName: "lib",
      entries: [],
      requires: [
        "react",
      ],
      dest: `${distPath}/js/`,
      watch: [],
    },
    builds: [
      {
        taskName: "app",
        dest: `${distPath}/js/`,
        entries: [
          "client/src/js/*.ts{,x}",
        ],
        watch: [],
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
        watch: [],
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
        watch: [],
      },
    ],
  }
};

export default config;
