import { Gulp } from "gulp";
import { GulpConfig } from "./gulpfile.config.types";

export interface GulpTaskReturn {
  generatedTasks: string[];
  generatedWatchTasks?: string[];
}

export interface GulpTask {
  (gulp: Gulp, config: GulpConfig): GulpTaskReturn;
}
