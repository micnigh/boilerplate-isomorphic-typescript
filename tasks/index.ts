import { Gulp } from "gulp";
import { GulpTask } from "../gulpfile.types";
import { GulpConfig } from "../gulpfile.config.types";

import buildTask from "./build/";
import serveTask from "./serve";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTaskResults = [
    buildTask(gulp, config),
    serveTask(gulp, config),
  ];

  let generatedTasks: string[] = generatedTaskResults.map(t => t.generatedTasks || []).reduce((a, b) => a.concat(b));
  let generatedWatchTasks: string[] = generatedTaskResults.map(t => t.generatedWatchTasks || []).reduce((a, b) => a.concat(b));

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
