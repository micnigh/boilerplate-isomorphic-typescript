import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
import * as size from "gulp-size";
import * as chalk from "chalk";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let src = "server/public";

  let buildTaskName = "build:html";
  let watchTaskName = "watch:html";

  let generatedTasks: string[] = [buildTaskName];
  let generatedWatchTasks: string[] = [watchTaskName];

  gulp.task(buildTaskName, [], function () {
    return gulp.src([`${src}/**/*`])
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(config.distPath));
  });

  gulp.task(watchTaskName, [buildTaskName], function () {
    return gulp.watch([`${src}/**/*`], [buildTaskName]);
  });

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
