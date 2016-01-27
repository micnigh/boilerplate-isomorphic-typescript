import { Gulp } from "gulp";
import { GulpTask } from "../../../../gulpfile.types";
import { GulpConfig } from "../../../../gulpfile.config.types";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  config.js.builds.forEach(build => {
    let taskName = `build:js:server:${build.taskName}`;
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
