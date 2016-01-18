import { Gulp } from "gulp";
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
import * as glob from "glob";

let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
import webpackConfigGenerator from "./webpack.config";

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];

  config.js.builds.forEach(build => {
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
      gulp.task(`build:js:client:${build.taskName}`, generatedEntryTasks);
      gulp.task(`watch:js:client:${build.taskName}`, generatedEntryTasks, () => {
        return gulp.watch(build.watch, generatedEntryTasks);
      });
    });
  });

  return {
    generatedTasks,
  };
};

export default generateTask;
