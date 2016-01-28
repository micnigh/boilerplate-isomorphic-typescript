import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

import * as buildJSClientTask from "./client/";
import * as buildJSServerTask from "./server/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();
  gulpTask.addChildTask(buildJSClientTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildJSServerTask.generateTask(gulp, config));

  gulp.task("build:js", gulpTask.childBuildTasks);
  gulp.task("watch:js", gulpTask.childWatchTasks);

  return gulpTask;
};
