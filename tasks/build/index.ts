import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

import * as buildJSTask from "./js/";
import * as buildCSSTask from "./css/";
import * as buildHTMLTask from "./html/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpTask => {
  let gulpTask = new GulpBuildTask();
  gulpTask.addChildTask(buildJSTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildCSSTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildHTMLTask.generateTask(gulp, config));

  gulp.task("build", gulpTask.childBuildTasks);
  gulp.task("watch", gulpTask.childWatchTasks);

  return gulpTask;
};
