import { Gulp } from "gulp";
import { GulpTask } from "../gulpfile.types";
import { GulpConfig } from "../gulpfile.config.types";

import * as buildTask from "./build/";
import * as serveTask from "./serve";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpTask => {
  let gulpTask = new GulpTask();
  gulpTask.addChildTask(buildTask.generateTask(gulp, config));
  gulpTask.addChildTask(serveTask.generateTask(gulp, config));
  return gulpTask;
};
