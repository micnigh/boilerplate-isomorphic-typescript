"use strict";
import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../../../gulpfile.types";
import { GulpConfig } from "../../../../gulpfile.config.types";

import * as buildJSClientBuildTask from "./build/";
import * as buildJSClientLibTask from "./lib/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  gulpTask.addChildTask(buildJSClientBuildTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildJSClientLibTask.generateTask(gulp, config));

  gulp.task("build:js:client", gulpTask.childTasks);
  gulp.task("watch:js:client", gulpTask.childWatchTasks);

  return gulpTask;
};
