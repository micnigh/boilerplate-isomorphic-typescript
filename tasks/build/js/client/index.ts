import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  config.js.builds.forEach(build => {
    let taskName = `build:js:client:${build.taskName}`;
    generatedTasks.push(taskName);
    gulp.task(taskName, [], () => {
      console.log(taskName);
    });
  });

  return {
    generatedTasks,
  };
};

export default generateTask;
