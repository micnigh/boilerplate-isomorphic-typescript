import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";
import size from "gulp-size";
import chalk from "chalk";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  let src = "server/public";

  let buildTaskName = "build:html";
  let watchTaskName = "watch:html";

  gulpTask.childTasks = [buildTaskName];
  gulpTask.childWatchTasks = [watchTaskName];

  gulp.task(buildTaskName, [], function () {
    return gulp.src([`${src}/**/*`])
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(config.distPath));
  });

  gulp.task(watchTaskName, [buildTaskName], function () {
    return gulp.watch([`${src}/**/*`], [buildTaskName]);
  });

  return gulpTask;
};

export default generateTask;
