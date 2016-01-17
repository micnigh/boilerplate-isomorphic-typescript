import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import buildJSTask from "./js/";
import buildCSSTask from "./css/";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  let { generatedTasks: buildJSTaskResult } = buildJSTask(gulp, config);
  let { generatedTasks: buildCSSTaskResult } = buildCSSTask(gulp, config);

  generatedTasks = generatedTasks
    .concat(buildJSTaskResult)
    .concat(buildCSSTaskResult);

  gulp.task("build", generatedTasks);

  return {
    generatedTasks
  };
};

export default generateTask;
