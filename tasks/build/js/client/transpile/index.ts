import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../../../../gulpfile.types";
import { GulpConfig } from "../../../../../gulpfile.config.types";
import * as changed from "gulp-changed";
import * as typescript from "gulp-typescript";
import * as babel from "gulp-babel";
import * as size from "gulp-size";
import * as _ from "lodash";
let rename = require("gulp-rename");

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();

  let buildTaskName = `build:js:client:transpile`;
  let watchTaskName = `watch:js:client:transpile`;

  gulpTask.childBuildTasks = [buildTaskName];
  gulpTask.childWatchTasks = [watchTaskName];

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

  gulpTask.childTasks = gulpTask.childTasks
    .concat(gulpTask.childBuildTasks)
    .concat(gulpTask.childWatchTasks);

  return gulpTask;
};
