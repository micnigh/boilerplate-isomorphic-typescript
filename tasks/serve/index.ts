import { Gulp } from "gulp";
import { GulpTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  gulp.task("serve", generatedTasks);

  return {
    generatedTasks
  };
};

export default generateTask;
