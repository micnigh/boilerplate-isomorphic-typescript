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

import { GulpTask, GulpWatchTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";
import webpackConfigGenerator from "./webpack.config";

let buffer = require("gulp-buffer");
let prettyTime = require("pretty-hrtime");
let webpackStream: {
  (webpackConfig: webpack.Configuration, webpackModule: webpack.Webpack, cb: { (err: Error, stats: webpack.compiler.Stats) });
  (webpackConfig: webpack.Configuration, webpackModule: webpack.Webpack);
  (webpackConfig: webpack.Configuration);
} = require("webpack-stream");

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  config.js.builds.forEach(build => {
    let buildTaskName = `build:js:client:builds:${build.taskName}`;
    let watchTaskName = `watch:js:client:builds:${build.taskName}`;
    let generatedEntryBuildTasks: string[] = [];
    let generatedEntryWatchTasks: string[] = [];
    build.entries.forEach(entry => {
      let buildBootstrap = build.bootstrap || [];
      let entriesFromGlob = glob.sync(entry);
      entriesFromGlob = entriesFromGlob
        .map(e => `${e.replace(path.extname(e), ".js")}`)
        .filter(e => buildBootstrap.indexOf(e) === -1);
      entriesFromGlob.forEach(entryFromGlob => {
        let entryBuildTaskName = `build:js:client:builds:${build.taskName}:${entryFromGlob}`;
        let entryWatchTaskName = `watch:js:client:builds:${build.taskName}:${entryFromGlob}`;
        generatedEntryBuildTasks.push(entryBuildTaskName);
        generatedEntryWatchTasks.push(entryWatchTaskName);

        let webpackConfig = webpackConfigGenerator(config, build, entryFromGlob);
        let webpackWatchConfig = _.merge({}, webpackConfig, {
          watch: true,
        });
        let webpackBuilder = webpack(webpackConfig);

        let browserSyncInstances = build.browsersync || [];

        gulp.task(entryBuildTaskName, [], () => {
          return gulp.src([entryFromGlob])
            .pipe(webpackStream(webpackConfig, webpack, (err: Error, stats: webpack.compiler.Stats) => {
              console.log(stats.toString({
                colors: true,
              }));
            }))
            .pipe(gulp.dest(build.dest));
        });
        gulp.task(entryWatchTaskName, [], () => {
          let pipe = gulp.src([entryFromGlob])
            .pipe(webpackStream(webpackWatchConfig, webpack, (err: Error, stats: webpack.compiler.Stats) => {
              console.log(stats.toString({
                colors: true,
              }));
            }))
            .pipe(gulp.dest(build.dest));

          browserSyncInstances.forEach(b => {
            pipe = pipe
              .pipe(b.stream({
                match: "**/*.js",
              }));
          });

          return pipe;
        });
      });
      gulpTask.childTasks.push(buildTaskName);
      gulpTask.childWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryBuildTasks);
      gulp.task(watchTaskName, generatedEntryWatchTasks);
    });
  });

  gulp.task(`build:js:client:builds`, gulpTask.childTasks);
  gulp.task(`watch:js:client:builds`, gulpTask.childWatchTasks);

  return gulpTask;
};
