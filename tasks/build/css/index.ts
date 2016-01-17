import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import * as sass from "gulp-sass";
import * as sourcemaps from "gulp-sourcemaps";
import * as autoprefixer from "gulp-autoprefixer";
import * as size from "gulp-size";
import * as chalk from "chalk";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  config.css.builds.forEach(build => {
    let taskName = `build:css:${build.taskName}`;
    generatedTasks.push(taskName);
    gulp.task(taskName, [], () => {

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
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(build.dest));
      }

      pipe = pipe.pipe(gulp.dest(build.dest));

      pipe = pipe.pipe(size({
        showFiles: true,
        title: taskName,
        gzip: true,
      }));

      return pipe;
    });
  });

  return {
    generatedTasks,
  };
};

export default generateTask;
