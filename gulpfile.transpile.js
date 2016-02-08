"use strict";
let gulp = require("gulp");
let typescript = require("gulp-typescript");
let babel = require("gulp-babel");
let rename = require("gulp-rename");
let size = require("gulp-size");
let changed = require("gulp-changed");
let sourcemaps = require("gulp-sourcemaps");
let plumber = require("gulp-plumber");
let watch = require("gulp-watch");

let sources = [
  "typings/tsd.d.ts",
  "*.ts{,x}",
  "client/**/*.ts{,x}",
  "server/**/*.ts{,x}",
  "tasks/**/*.ts{,x}",
];

let tsClientProject = typescript.createProject({
  module: "es6",
  target: "es6",
  jsx: "react",
  isolatedModules: true,
  moduleResolution: "node",
  allowSyntheticDefaultImports: true,
  noExternalResolve: true,
});

gulp.task("build", [], function () {
  return gulp.src(sources, {
    base: ".",
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(typescript(tsClientProject))
    .pipe(sourcemaps.write())
    .pipe(rename({extname: ".es6"}))
    .pipe(changed("./", {
      hasChanged: changed.compareSha1Digest,
    }))
    .pipe(gulp.dest("."))
    .pipe(size({ showFiles: true }))
    .pipe(babel({
      sourceMaps: "inline",
      presets: [
        "es2015",
        "react",
      ],
      plugins: [
        "syntax-async-functions",
        "transform-regenerator",
      ],
    }))
    .pipe(rename({extname: ".js"}))
    .pipe(changed("./", {
      hasChanged: changed.compareSha1Digest,
    }))
    .pipe(gulp.dest("."))
    .pipe(size({ showFiles: true }));
});

gulp.task("watch", ["build"], () => {
  return watch(sources, {}, () => {
    gulp.start("build");
  });
});

module.exports = {
  sources: sources,
};
