import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
import * as glob from "glob";

let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
import webpackConfigGenerator from "./webpack.config";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];
  let generatedWatchTasks: string[] = [];
  config.js.builds.forEach(build => {
    let buildTaskName = `build:js:client:${build.taskName}`;
    let watchTaskName = `watch:js:client:${build.taskName}`;
    let generatedEntryTasks: string[] = [];
    build.entries.forEach(entry => {
      let entriesFromGlob = glob.sync(entry);
      entriesFromGlob.forEach(entryFromGlob => {
        let entryTaskName = `build:js:client:${build.taskName}:${entryFromGlob}`;
        generatedEntryTasks.push(entryTaskName);
        let webpackConfig = webpackConfigGenerator(config, build, entryFromGlob);
        let webpackBuilder = webpack(webpackConfig);
        gulp.task(entryTaskName, [], (doneWithGeneratedTask) => {
          webpackBuilder.run((err: Error, stats) => {
            console.log(stats.toString({
              colors: true,
            }));
            doneWithGeneratedTask();
          });
        });
      });
      generatedTasks.push(buildTaskName);
      generatedWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryTasks);
      gulp.task(watchTaskName, [buildTaskName], () => {
        return gulp.watch(build.watch, [buildTaskName]);
      });
    });
  });

  gulp.task(`build:js:client`, generatedTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
