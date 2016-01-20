"use strict";
import { Gulp } from "gulp";
import * as size from "gulp-size";
import source = require("vinyl-source-stream");
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
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
    let buildTaskName = `build:js:client:libs:${lib.taskName}`;
    let watchTaskName = `watch:js:client:libs:${lib.taskName}`;
    let generatedEntryBuildTasks: string[] = [];
    let generatedEntryWatchTasks: string[] = [];
    lib.entries.forEach(entry => {
      let entriesFromGlob = glob.sync(entry);
      entriesFromGlob.forEach(entryFromGlob => {
        let entryBuildTaskName = `build:js:client:libs:${lib.taskName}:${entryFromGlob}`;
        let entryWatchTaskName = `watch:js:client:libs:${lib.taskName}:${entryFromGlob}`;
        generatedEntryBuildTasks.push(entryBuildTaskName);
        generatedEntryWatchTasks.push(entryWatchTaskName);

        let entryBuildBrowserifyConfig: Browserify.Options = {
          debug: config.isDev,
          entries: [
            entryFromGlob,
            // "typings/tsd.d.ts",
          ],
          paths: lib.includePaths,
        };

        let entryBuildBrowserifyBuildOptions: BrowserifyBuildOptions = {
          watch: false,
          destFileName: lib.destFileName,
          isLib: true,
        };

        gulp.task(entryBuildTaskName, [], () => {
          return browserifyBuild(entryBuildBrowserifyConfig, entryBuildBrowserifyBuildOptions, gulp, config);
        });
        gulp.task(entryWatchTaskName, [], () => {
          return browserifyBuild(entryBuildBrowserifyConfig, _.merge({}, entryBuildBrowserifyBuildOptions, {
            watch: true,
          }, true), gulp, config);
        });
      });
      generatedTasks.push(buildTaskName);
      generatedWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryBuildTasks);
      gulp.task(watchTaskName, [buildTaskName], () => {
        return gulp.watch(lib.watch, [buildTaskName]);
      });
    });
  });

  gulp.task(`build:js:client:libs`, generatedTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
