import { Gulp } from "gulp";
import { GulpTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpTask => {
  let gulpTask = new GulpTask();
  gulp.task("serve", gulpTask.childTasks);
  return gulpTask;
};
