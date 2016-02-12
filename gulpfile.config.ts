import { GulpConfig } from "./gulpfile.config.types";

import browsersync from "browser-sync";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";
let baseUrl = isDev ?
  process.env.BASE_URL || "/" :
  process.env.BASE_URL || "/boilerplate-isomorphic-typescript/";

let bsApp = browsersync.create("app");
let bsTest = browsersync.create("test");

let config: GulpConfig = {
  isDev: isDev,
  distPath: distPath,
  baseUrl: baseUrl,
  watch: {
    browsersync: [
      { instance: bsApp, port: 3005, uiPort: 3006 },
      { instance: bsTest, port: 3007, uiPort: 3008 },
    ],
  },
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
        bootstrap: [
          "client/js/src/bootstrap.js",
        ],
        browsersync: [
          bsApp,
        ],
      },
      {
        taskName: "test:src",
        dest: `${distPath}/js/test/`,
        entries: [
          "client/js/src/test/**/*.ts{,x}",
        ],
        bootstrap: [
          "client/js/src/test/bootstrap.js",
        ],
        browsersync: [
          bsTest,
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
        browsersync: [
          bsTest,
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
        browsersync: [
          bsApp,
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
