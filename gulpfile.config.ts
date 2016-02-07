import { GulpConfig } from "./gulpfile.config.types";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";

let config: GulpConfig = {
  isDev: isDev,
  distPath: distPath,
  test: {
    karma: {
      port: 3004,
    },
  },
  js: {
    libs: [
      {
        taskName: "lib",
        dest: `${distPath}/js/`,
        destFileName: "lib.js",
        includes: [
          { name: "react", path: "node_modules/react/dist/react.js", global: "React" },
          { name: "react-dom", path: "node_modules/react-dom/dist/react-dom.js", global: "ReactDOM" },
          { name: "lodash", path: "node_modules/lodash/lodash.js", global: "_" },
          { name: "regenerator/runtime", path: "node_modules/regenerator/runtime.js", global: "regeneratorRuntime" },
          { name: "bluebird", path: "node_modules/bluebird/js/browser/bluebird.js", global: "Promise" },
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
      },
      {
        taskName: "test:src",
        dest: `${distPath}/js/test/`,
        entries: [
          "client/js/src/test/**/*.ts{,x}",
          "!client/js/src/test/bootstrap.ts",
        ],
        bootstrap: [
          "client/js/src/test/bootstrap.js",
        ],
      },
      {
        taskName: "test:spec",
        dest: `${distPath}/js/`,
        entries: [
          "client/js/src/**/*.spec.ts{,x}",
        ],
        bootstrap: [
          "client/js/src/test/bootstrap.js",
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
