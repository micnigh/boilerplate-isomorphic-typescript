"use strict";
import { Gulp } from "gulp";
import { GulpConfig } from "./gulpfile.config.types";

export class GulpTask {
  childTasks: string[] = [];
  addChildTask(childTask: GulpTask) {
    this.childTasks = this.childTasks.concat(childTask.childTasks);
  }
}

export class GulpWatchTask extends GulpTask {
  childWatchTasks: string[] = [];
  addChildTask(childTask: GulpWatchTask | GulpTask) {
    super.addChildTask(childTask);
    if (childTask instanceof GulpWatchTask) {
      this.childWatchTasks = this.childWatchTasks.concat((<GulpWatchTask>childTask).childWatchTasks);
    }
  }
}
