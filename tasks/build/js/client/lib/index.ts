"use strict";
import { Gulp } from "gulp";
import size from "gulp-size";
import source from "vinyl-source-stream";
import glob from "glob";
import chalk from "chalk";
import browserify from "browserify";
import path from "path";
import ts from "typescript";
import _ from "lodash";
import { GulpTask, GulpBuildTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";

import { browserifyBuild, BrowserifyBuildOptions } from "../build/";

let watchify: {(instance: Browserify.BrowserifyObject): Browserify.BrowserifyObject} = require("watchify");
let buffer = require("gulp-buffer");
let prettyTime = require("pretty-hrtime");
let tsify = require("tsify");
let babelify = require("babelify");

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();

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
    gulpTask.childBuildTasks.push(buildTaskName);
    gulpTask.childWatchTasks.push(watchTaskName);
  });

  gulp.task(`build:js:client:libs`, gulpTask.childBuildTasks);

  gulpTask.childTasks = gulpTask.childTasks
    .concat(gulpTask.childBuildTasks)
    .concat(gulpTask.childWatchTasks);

  return gulpTask;
};
