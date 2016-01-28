"use strict";
import { Gulp } from "gulp";
import { GulpConfig } from "./gulpfile.config.types";

export class GulpTask {
  childTasks: string[] = [];
  addChildTask(childTask: GulpTask) {
    this.childTasks = this.childTasks.concat(childTask.childTasks);
  }
}

export class GulpBuildTask extends GulpTask {
  childBuildTasks: string[] = [];
  childWatchTasks: string[] = [];
  addChildTask(childTask: GulpBuildTask) {
    this.childTasks = this.childTasks.concat(childTask.childTasks);
    this.childBuildTasks = this.childBuildTasks.concat(childTask.childBuildTasks);
    this.childWatchTasks = this.childWatchTasks.concat(childTask.childWatchTasks);
  }
}
