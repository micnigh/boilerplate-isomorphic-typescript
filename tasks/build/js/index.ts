import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import buildJSClientTask from "./client/";
import buildJSServerTask from "./server/";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  let { generatedTasks: buildJSClientTaskResult } = buildJSClientTask(gulp, config);
  let { generatedTasks: buildJSServerTaskResult } = buildJSServerTask(gulp, config);

  generatedTasks = generatedTasks
    .concat(buildJSClientTaskResult)
    .concat(buildJSServerTaskResult);

  gulp.task("build", generatedTasks);

  return {
    generatedTasks
  };
};

export default generateTask;
