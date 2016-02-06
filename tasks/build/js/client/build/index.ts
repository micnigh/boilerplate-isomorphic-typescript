"use strict";
import { Gulp } from "gulp";
import size from "gulp-size";
import sourcemap from "gulp-sourcemaps";
import source from "vinyl-source-stream";
import glob from "glob";
import chalk from "chalk";
import path from "path";
import _ from "lodash";
import webpack from "webpack";

import { GulpTask, GulpBuildTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";
import webpackConfigGenerator from "./webpack.config";

let buffer = require("gulp-buffer");
let prettyTime = require("pretty-hrtime");

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();
  config.js.builds.forEach(build => {
    let buildTaskName = `build:js:client:builds:${build.taskName}`;
    let watchTaskName = `watch:js:client:builds:${build.taskName}`;
    let generatedEntryBuildTasks: string[] = [];
    let generatedEntryWatchTasks: string[] = [];
    build.entries.forEach(entry => {
      let entriesFromGlob = glob.sync(entry);
      entriesFromGlob.forEach(entryFromGlob => {
        entryFromGlob = `${entryFromGlob.replace(path.extname(entryFromGlob), ".js")}`;
        let entryBuildTaskName = `build:js:client:builds:${build.taskName}:${entryFromGlob}`;
        let entryWatchTaskName = `watch:js:client:builds:${build.taskName}:${entryFromGlob}`;
        generatedEntryBuildTasks.push(entryBuildTaskName);
        generatedEntryWatchTasks.push(entryWatchTaskName);

        let webpackConfig = webpackConfigGenerator(config, build, entryFromGlob);
        let webpackBuilder = webpack(webpackConfig);

        gulp.task(entryBuildTaskName, [], (doneWithGeneratedTask) => {
          return webpackBuilder.run((err: Error, stats) => {
            console.log(stats.toString({
              colors: true,
            }));
            doneWithGeneratedTask();
          });
        });
        gulp.task(entryWatchTaskName, [], () => {
          return webpackBuilder.watch({
            aggregateTimeout: 0,
          }, (err: Error, stats) => {
            console.log(stats.toString({
              colors: true,
            }));
          });
        });
      });
      gulpTask.childBuildTasks.push(buildTaskName);
      gulpTask.childWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryBuildTasks);
      gulp.task(watchTaskName, generatedEntryWatchTasks);
    });
  });

  gulp.task(`build:js:client:builds`, gulpTask.childBuildTasks);
  gulp.task(`watch:js:client:builds`, gulpTask.childWatchTasks);

  gulpTask.childTasks = gulpTask.childTasks
    .concat(gulpTask.childBuildTasks)
    .concat(gulpTask.childWatchTasks);

  return gulpTask;
};
