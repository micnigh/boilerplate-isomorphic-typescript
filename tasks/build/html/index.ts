import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";
import * as size from "gulp-size";
import * as chalk from "chalk";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();
  let src = "server/public";

  let buildTaskName = "build:html";
  let watchTaskName = "watch:html";

  gulpTask.childBuildTasks = [buildTaskName];
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
