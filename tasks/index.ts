import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

import buildTask from "./build/";
import serveTask from "./serve";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  let { generatedTasks: buildTaskResult } = buildTask(gulp, config);
  let { generatedTasks: serveTaskResult } = serveTask(gulp, config);
  // let { generatedTasks: watchTaskResult } = watchTask(gulp, config);

  generatedTasks = generatedTasks
    .concat(buildTaskResult)
    .concat(serveTaskResult)
    // .concat(watchTaskResult);

  return {
    generatedTasks
  };
};

export default generateTask;
