"use strict";
let gulp = require("gulp");
let watch = require("gulp-watch");
let gulpTasks = require("./gulp-tasks");
let sources = gulpTasks.sources;

gulp.task("watch", () => {
  return watch(sources, {}, () => {
    gulp.start("build");
  });
});

gulp.start("watch");
