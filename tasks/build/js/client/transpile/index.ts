import { Gulp } from "gulp";
import { GulpTask, GulpTaskReturn } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
import * as changed from "gulp-changed";
import * as typescript from "gulp-typescript";
import * as babel from "gulp-babel";
import * as size from "gulp-size";
import * as _ from "lodash";
let rename = require("gulp-rename");

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let buildTaskName = `build:js:client:transpile`;
  let watchTaskName = `watch:js:client:transpile`;

  let generatedTasks: string[] = [buildTaskName];
  let generatedWatchTasks: string[] = [watchTaskName];

  let tsClientProject = typescript.createProject({
    module: "es6",
    target: "es6",
    jsx: "preserve",
    isolatedModules: true,
  });

  gulp.task(buildTaskName, [], () => {
    return gulp.src([
      "typings/tsd.d.ts",
      "client/js/**/*.ts{,x}",
    ])
      .pipe(typescript(tsClientProject))
      // .pipe(rename({extname: ".es6"}))
      // .pipe(gulp.dest("client/js/"))
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
      .pipe(changed("client/js/", {
        hasChanged: changed.compareSha1Digest,
      }))
      .pipe(gulp.dest("client/js/"))
      .pipe(size({ showFiles: true }));
  });

  gulp.task(watchTaskName, [buildTaskName], () => {
    return gulp.watch(["client/js/**/*.ts{,x}"], [buildTaskName]);
  });

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
