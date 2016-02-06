import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

import * as testServerTask from "./server/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpTask => {
  let gulpTask = new GulpWatchTask();
  gulpTask.addChildTask(testServerTask.generateTask(gulp, config));

  gulp.task("test", gulpTask.childTasks);
  gulp.task("watch:test", gulpTask.childWatchTasks);

  return gulpTask;
};
