import { Gulp } from "gulp";
import { GulpTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

import buildJSTask from "./js/";
import buildCSSTask from "./css/";
import buildHTMLTask from "./html/";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTaskResults = [
    buildJSTask(gulp, config),
    buildCSSTask(gulp, config),
    buildHTMLTask(gulp, config),
  ];

  let generatedTasks: string[] = generatedTaskResults.map(t => t.generatedTasks || []).reduce((a, b) => a.concat(b));
  let generatedWatchTasks: string[] = generatedTaskResults.map(t => t.generatedWatchTasks || []).reduce((a, b) => a.concat(b));

  gulp.task("build", generatedTasks);
  gulp.task("watch", generatedWatchTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
