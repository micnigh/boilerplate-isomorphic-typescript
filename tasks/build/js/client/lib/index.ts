import { Gulp } from "gulp";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import size from "gulp-size";
import glob from "glob";
import chalk from "chalk";
import path from "path";
import _ from "lodash";
import webpack from "webpack";

import { GulpTask, GulpWatchTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";
import webpackConfigGenerator from "./webpack.config";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();

  config.js.libs.forEach(lib => {
    let buildTaskName = `build:js:client:libs:${lib.taskName}:${lib.destFileName}`;
    let watchTaskName = `watch:js:client:libs:${lib.taskName}:${lib.destFileName}`;

    let browserSyncInstances = lib.browsersync || [];

    gulp.task(buildTaskName, [], (doneWithGeneratedTask) => {
      let webpackConfig = webpackConfigGenerator(config, lib);
      let webpackBuilder = webpack(webpackConfig);
      return webpackBuilder.run((err: Error, stats: webpack.compiler.Stats) => {
        console.log(stats.toString({
          colors: true,
        }));
        doneWithGeneratedTask();
      });
    });
    gulp.task(watchTaskName, [buildTaskName], () => {
      let webpackConfig = webpackConfigGenerator(config, lib);
      let webpackBuilder = webpack(webpackConfig);
      return webpackBuilder.watch({
        aggregateTimeout: 0,
      }, (err: Error, stats: webpack.compiler.Stats) => {
        console.log(stats.toString({
          colors: true,
        }));
        browserSyncInstances.forEach(b => {
          b.reload([`${lib.taskName}.js`]);
        });
      });
    });
    gulpTask.childTasks.push(buildTaskName);
    gulpTask.childWatchTasks.push(watchTaskName);
  });

  gulp.task(`build:js:client:libs`, gulpTask.childTasks);

  return gulpTask;
};
