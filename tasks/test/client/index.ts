import { Gulp } from "gulp";
import { GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig } from "../../../gulpfile.config.types";

import plumber from "gulp-plumber";
import watch from "gulp-watch";
import chalk from "chalk";
import _ from "lodash";
import karma from "karma";

import generateKarmaConfig from "./karma.conf";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  let src = [
    "client/js/test/**/*.js",
    "client/js/**/*.spec.js",
  ];

  let karmaConfig = generateKarmaConfig(config);

  gulp.task("test:client", ["build"], (done) => {
    new karma.Server(_.merge(karmaConfig, {
      singleRun: true,
    }), done).start();
  });
  gulpTask.childTasks.push("test:client");

  gulp.task("watch:test:client", ["build"],  (done) => {
    new karma.Server(_.merge(karmaConfig, {
      singleRun: false,
    }), done).start();
  });
  gulpTask.childWatchTasks.push("watch:test:client");

  return gulpTask;
};
