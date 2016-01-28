"use strict";
let gulp = require("gulp");
let gulpTasks = require("./gulp-tasks");
let sources = gulpTasks.sources;

gulp.task("watch", ["build"], () => {
  return gulp.watch(sources, ["build"]);
});

gulp.start("watch");
