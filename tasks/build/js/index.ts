import { Gulp } from "gulp";
import { GulpTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

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
