"use strict";
import { Gulp } from "gulp";
import * as size from "gulp-size";
import source = require("vinyl-source-stream");
import { GulpTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";
import * as glob from "glob";
import * as chalk from "chalk";
import * as browserify from "browserify";
import * as path from "path";
import * as ts from "typescript";
import * as _ from "lodash";

import { browserifyBuild, BrowserifyBuildOptions } from "../build/";

let watchify: {(instance: Browserify.BrowserifyObject): Browserify.BrowserifyObject} = require("watchify");
let buffer = require("gulp-buffer");
let prettyTime = require("pretty-hrtime");
let tsify = require("tsify");
let babelify = require("babelify");

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];
  let generatedWatchTasks: string[] = [];
  config.js.libs.forEach(lib => {
    let buildTaskName = `build:js:client:libs:${lib.taskName}:${lib.destFileName}`;
    let watchTaskName = `watch:js:client:libs:${lib.taskName}:${lib.destFileName}`;

    let libBuildBrowserifyConfig: Browserify.Options = {
      debug: config.isDev,
      paths: lib.includePaths,
    };

    let libBuildBrowserifyBuildOptions: BrowserifyBuildOptions = {
      watch: false,
      destFileName: lib.destFileName,
      isLib: true,
    };

    gulp.task(buildTaskName, ["build:js:client:transpile"], () => {
      return browserifyBuild(libBuildBrowserifyConfig, libBuildBrowserifyBuildOptions, gulp, config);
    });
    gulp.task(watchTaskName, ["build:js:client:transpile"], () => {
      return browserifyBuild(libBuildBrowserifyConfig, _.merge({}, libBuildBrowserifyBuildOptions, {
        watch: true,
      }, true), gulp, config);
    });
    generatedTasks.push(buildTaskName);
    generatedWatchTasks.push(watchTaskName);
  });

  gulp.task(`build:js:client:libs`, generatedTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
