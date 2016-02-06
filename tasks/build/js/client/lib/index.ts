import { Gulp } from "gulp";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import size from "gulp-size";
import glob from "glob";
import chalk from "chalk";
import path from "path";
import _ from "lodash";

import { GulpTask, GulpWatchTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();

  config.js.libs.forEach(lib => {
    let buildTaskName = `build:js:client:libs:${lib.taskName}:${lib.destFileName}`;
    let watchTaskName = `watch:js:client:libs:${lib.taskName}:${lib.destFileName}`;

    let libSources = lib.includes.map(i => i.path);

    gulp.task(buildTaskName, [], () => {
      return gulp.src(libSources)
        .pipe(sourcemaps.init())
        .pipe(concat(lib.destFileName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(lib.dest))
        .pipe(size({ showFiles: true }));
    });
    gulp.task(watchTaskName, [buildTaskName], () => {
      return gulp.watch(lib.watch, [buildTaskName]);
    });
    gulpTask.childTasks.push(buildTaskName);
    gulpTask.childWatchTasks.push(watchTaskName);
  });

  gulp.task(`build:js:client:libs`, gulpTask.childTasks);

  return gulpTask;
};
