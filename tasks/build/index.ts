import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

import * as buildJSTask from "./js/";
import * as buildCSSTask from "./css/";
import * as buildHTMLTask from "./html/";
import * as buildSpriteTask from "./sprite/";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpTask => {
  let gulpTask = new GulpWatchTask();
  gulpTask.addChildTask(buildJSTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildCSSTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildHTMLTask.generateTask(gulp, config));
  gulpTask.addChildTask(buildSpriteTask.generateTask(gulp, config));

  gulp.task("build", gulpTask.childTasks);

  return gulpTask;
};
