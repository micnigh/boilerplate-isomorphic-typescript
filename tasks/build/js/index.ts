import { Gulp } from "gulp";
import { GulpTask, GulpTaskReturn } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import buildJSClientTask from "./client/";
import buildJSServerTask from "./server/";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTaskResults = [
    buildJSClientTask(gulp, config),
    buildJSServerTask(gulp, config),
  ];

  let generatedTasks: string[] = generatedTaskResults.map(t => t.generatedTasks || []).reduce((a, b) => a.concat(b));
  let generatedWatchTasks: string[] = generatedTaskResults.map(t => t.generatedWatchTasks || []).reduce((a, b) => a.concat(b));

  gulp.task("build:js", generatedTasks);
  gulp.task("watch:js", generatedWatchTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
