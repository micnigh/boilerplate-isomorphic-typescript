import { Gulp } from "gulp";
import { GulpTask, GulpBuildTask } from "../../../../gulpfile.types";
import { GulpConfig } from "../../../../gulpfile.config.types";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpBuildTask => {
  let gulpTask = new GulpBuildTask();
  config.js.builds.forEach(build => {
    let taskName = `build:js:server:${build.taskName}`;
    gulpTask.childTasks.push(taskName);
    gulpTask.childBuildTasks.push(taskName);
    gulp.task(taskName, [], () => {
      console.log(taskName);
    });
  });
  return gulpTask;
};
