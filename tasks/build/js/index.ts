import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

import * as buildJSClientTask from "./client/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  gulpTask.addChildTask(buildJSClientTask.generateTask(gulp, config));

  gulp.task("build:js", gulpTask.childTasks);
  gulp.task("watch:js", gulpTask.childWatchTasks);

  return gulpTask;
};
