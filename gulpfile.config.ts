import { GulpConfig } from "gulpfile.types.config";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";

let config: GulpConfig = {
  distPath: distPath,
  js: {
    libs: {
      taskName: "lib",
      entries: [],
      requires: [
        "react",
      ],
      dest: `${distPath}/js/`,
    },
    builds: [
      {
        taskName: "app",
        dest: `${distPath}/js/`,
        entries: [
          "client/src/js/*.ts{,x}",
        ],
      },
    ],
  },
  css: {
    builds: [
      {
        taskName: "app",
        entries: [
          "client/src/css/*.scss",
        ],
        dest: `${distPath}/css/`,
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
      },
    ],
  }
};

export default config;
