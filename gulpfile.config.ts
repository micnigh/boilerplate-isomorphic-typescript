import { GulpConfig } from "./gulpfile.config.types";

import browsersync from "browser-sync";
import webpack from "webpack";

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
let isDev = process.env.NODE_ENV === "development";
let tmpPath = `.tmp/${process.env.NODE_ENV}`;
let distPath = `${tmpPath}/dist`;
let uploadPath = isDev ? `${tmpPath}/uploads/` : `//${tmpPath}/test/`;

let baseUrl = isDev ?
  process.env.BASE_URL || "/" :
  process.env.BASE_URL || "/";

let bsApp = browsersync.create("app");
let bsTest = browsersync.create("test");

let config: GulpConfig = {
  isDev: isDev,
  distPath: distPath,
  tmpPath: tmpPath,
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
          "es5-shim",
          "es5-shim/es5-sham",
          "es6-shim",
          "es6-shim/es6-sham",
          "react",
          "react-dom",
          "react-redux",
          "react-router",
          "redux",
          "redux-logger",
          "redux-promise",
          "redux-thunk",
          "react-router-redux",
          "lodash",
          "regenerator-runtime/runtime",
          "bluebird",
          "moment",
          "classnames",
          "superagent",
          "normalizr",
          "denormalizr",
          "node-uuid",
        ].concat(isDev ?
            // for better performance, add hmr libs
            [
              "babel-preset-react-hmre",
              "webpack-hot-middleware/client-overlay",
            ].concat(
              Object.keys(
                require(`${process.cwd()}/node_modules/webpack-hot-middleware/package.json`).dependencies
              )
                .map(d => `webpack-hot-middleware/node_modules/${d}`)
            )
          :
            []
        ),
      },
      {
        taskName: "testLib",
        dest: `${distPath}/js/`,
        destFileName: "testLib.js",
        includes: [
          "deep-freeze",
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
        hmr: true,
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
        hmr: false,
        webpack: {
          plugins: [
            new webpack.DefinePlugin({
              "process.env.NODE_ENV": JSON.stringify("test"),
            }),
          ],
        },
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
        hmr: false,
        webpack: {
          plugins: [
            new webpack.DefinePlugin({
              "process.env.NODE_ENV": JSON.stringify("test"),
            }),
          ],
        },
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
        dependsOn: [
          "build:sprite",
        ],
        watch: [
          "client/css/src/**/*.{,s}css",
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
          "client/sprites/**/*.png",
        ],
        dest: `${distPath}/css/`,
        destFileName: `spritesheet_`,
        spriteCSSFile: `client/css/src/shared/sprites.scss`,
        buildCSSTask: `build:css:app`,
        watch: [
          "client/sprites/**/*.png",
        ],
      },
    ],
  }
};

export default config;
