"use strict";
import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../../../gulpfile.types";
import { GulpConfig } from "../../../../gulpfile.config.types";

import * as buildJSClientTranspileTask from "./transpile/";
import * as buildJSClientBuildTask from "./build/";
import * as buildJSClientLibTask from "./lib/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();
  gulpTask.addChildTask(buildJSClientTranspileTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildJSClientBuildTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildJSClientLibTask.generateTask(gulp, config));

  gulp.task("build:js:client", gulpTask.childBuildTasks);
  gulp.task("watch:js:client", gulpTask.childWatchTasks);

  return gulpTask;
};
