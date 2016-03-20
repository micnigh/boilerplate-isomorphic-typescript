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
let handlebars = require("gulp-handlebars");
let defineModule = require("gulp-define-module");
let vinylPaths = require("vinyl-paths");
let del = require("del");

let isDev = process.env.NODE_ENV === "production" ? false : true;

gulp.task("build", [
  "build:handlebars",
  "build:typescript",
]);

gulp.task("watch", [
  "watch:handlebars",
  "watch:typescript",
]);

let sourcesHandlebars = [
  "server/**/*.hbs",
];

gulp.task("build:handlebars", [], () => {
  return gulp.src(sourcesHandlebars, {
    base: ".",
  })
    .pipe(plumber())
    .pipe(handlebars({
      handlebars: require("handlebars"),
    }))
    .pipe(defineModule("node"))
    .pipe(rename({ extname: ".js" }))
    .pipe(changed("./", {
      hasChanged: changed.compareSha1Digest,
    }))
    .pipe(gulp.dest("."))
    .pipe(size({ showFiles: true }));
});

gulp.task("watch:handlebars", ["build:handlebars"], () => {
  return watch(sourcesHandlebars, {}, () => {
    gulp.start("build:handlebars");
  });
});

let sourcesTypescript = [
  "typings/browser.d.ts",
  "*.ts{,x}",
  "client/**/*.ts{,x}",
  "server/**/*.ts{,x}",
  "shared/**/*.ts{,x}",
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
  experimentalDecorators: true,
});

gulp.task("build:typescript", [], function () {
  return gulp.src(sourcesTypescript, {
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

gulp.task("watch:typescript", ["build:typescript"], () => {
  return watch(sourcesTypescript, {}, () => {
    gulp.start("build:typescript");
  });
});

gulp.task("clean", () => {
  return gulp.src(
      [].concat(sourcesTypescript)
        .concat(sourcesHandlebars),
      { read: false }
    )
      .pipe(rename({extname: ".es6"}))
      .pipe(vinylPaths(del))
      .pipe(rename({extname: ".js"}))
      .pipe(vinylPaths(del));
});

gulp.task("help", [], () => {
  console.log(`
gulp tasks

    gulp build - transpile all assets
    gulp watch - build and watch assets
    gulp clean - del all transpiled assets

`);
});

gulp.task("default", ["help"]);
