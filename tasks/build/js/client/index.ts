"use strict";
import { Gulp } from "gulp";
import { GulpTask, GulpTaskReturn } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import buildJSClientTranspileTask from "./transpile/";
import buildJSClientBuildTask from "./build/";
import buildJSClientLibTask from "./lib/";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTaskResults = [
    buildJSClientTranspileTask(gulp, config),
    buildJSClientBuildTask(gulp, config),
    buildJSClientLibTask(gulp, config),
  ];

  let generatedTasks: string[] = generatedTaskResults.map(t => t.generatedTasks || []).reduce((a, b) => a.concat(b));
  let generatedWatchTasks: string[] = generatedTaskResults.map(t => t.generatedWatchTasks || []).reduce((a, b) => a.concat(b));

  gulp.task("build:js:client", generatedTasks);
  gulp.task("watch:js:client", generatedWatchTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
