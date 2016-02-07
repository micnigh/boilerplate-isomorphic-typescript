import { Gulp } from "gulp";
import { GulpWatchTask } from "../gulpfile.types";
import { GulpConfig } from "../gulpfile.config.types";

import * as buildTask from "./build/";
import * as serveTask from "./serve";
import * as testTask from "./test";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  gulpTask.addChildTask(buildTask.generateTask(gulp, config));
  gulpTask.addChildTask(serveTask.generateTask(gulp, config));
  gulpTask.addChildTask(testTask.generateTask(gulp, config));

  gulp.task("watch:initBrowsersync", [], (done) => {
    config.watch.browsersync.forEach(bsConfig => {
      bsConfig.instance.init({
        logSnippet: false,
        open: false,
        notify: false,
        port: bsConfig.port,
        ui: {
          port: bsConfig.uiPort,
        },
      });
    });
    done();
  });

  gulp.task("watch", gulpTask.childWatchTasks.concat([
    "watch:initBrowsersync",
  ]));

  return gulpTask;
};
