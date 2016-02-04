"use strict";
let gulp = require("gulp");
let typescript = require("gulp-typescript");
let babel = require("gulp-babel");
let rename = require("gulp-rename");
let size = require("gulp-size");
let changed = require("gulp-changed");

let sources = [
  "typings/tsd.d.ts",
  "*.ts{,x}",
  "tasks/**/*.ts{,x}",
];

let tsClientProject = typescript.createProject({
  module: "es6",
  target: "es6",
  jsx: "preserve",
  isolatedModules: true,
  moduleResolution: "node",
  allowSyntheticDefaultImports: true,
});

gulp.task("build", [], function () {
  return gulp.src(sources, {
    base: ".",
  })
    .pipe(typescript(tsClientProject))
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

gulp.start("build");

module.exports = {
  sources: sources,
};
