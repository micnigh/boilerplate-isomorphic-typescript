import { Gulp } from "gulp";
import { GulpWatchTask } from "../../gulpfile.types";
import { GulpConfig } from "../../gulpfile.config.types";

import nodemon from "gulp-nodemon";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();

  let dependsOn = config.isDev ? ["build:js:client"] : [];

  gulp.task("serve", dependsOn, () => {
    return nodemon({
      watch: [
        "server",
      ],
      ignore: [
        "*.spec.js",
      ],
      ext: "js",
      script: "server/index.js",
    });
  });

  gulpTask.childWatchTasks = ["serve"];

  return gulpTask;
};
