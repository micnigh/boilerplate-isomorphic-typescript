import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import size from "gulp-size";
import chalk from "chalk";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  config.css.builds.forEach(build => {
    let buildTaskName = `build:css:${build.taskName}`;
    let watchTaskName = `watch:css:${build.taskName}`;
    gulpTask.childTasks.push(buildTaskName);

    let browserSyncInstances = build.browsersync || [];

    gulp.task(buildTaskName, [], () => {
      let pipe = gulp.src(build.entries);

      if (config.isDev) {
        pipe = pipe.pipe(sourcemaps.init());
      }

      pipe = pipe
        .pipe(sass({
          includePaths: build.includePaths,
          outputStyle: config.isDev ? "nested" : "compressed",
        }));

      pipe.on("error", function (msg) {
          msg.showProperties = false;
          console.log(chalk.red(msg.toString()));
          this.emit("end");
        });

      pipe = pipe
        .pipe(autoprefixer());

      if (config.isDev) {
        pipe = pipe
          .pipe(sourcemaps.write("."))
          .pipe(gulp.dest(build.dest));
      }

      pipe = pipe.pipe(gulp.dest(build.dest));

      browserSyncInstances.forEach(b => {
        pipe = pipe
          .pipe(b.stream({
            match: "**/*.css",
          }));
      });

      pipe = pipe.pipe(size({
        showFiles: true,
        title: buildTaskName,
        gzip: true,
      }));

      return pipe;
    });

    gulpTask.childWatchTasks.push(watchTaskName);
    gulp.task(watchTaskName, [buildTaskName], () => {
      return gulp.watch(build.watch, [buildTaskName]);
    });
  });

  return gulpTask;
};
