import { Gulp } from "gulp";
import { GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

import plumber from "gulp-plumber";
import watch from "gulp-watch";
import chalk from "chalk";

let jasmine = require("gulp-jasmine");

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  let src = [
    "server/test/**/*.js",
    "server/**/*.spec.js",
  ];

  gulp.task("test:server", (done) => {
    gulp.src(src)
      .pipe(jasmine())
      .on("error", e => {
        // swallow error - too noisy
      })
      .on("finish", done);
  });
  gulpTask.childTasks.push("test:server");

  gulp.task("watch:test:server", ["test:server"], () => {
    watch(src, {}, () => {
      return gulp.start("test:server");
    });
  });
  gulpTask.childWatchTasks.push("watch:test:server");

  return gulpTask;
};
