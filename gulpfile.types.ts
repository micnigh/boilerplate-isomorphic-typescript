declare module "gulpfile.types.config" {
  import { Gulp } from "gulp";

  export interface GulpConfig {
    distPath: string;
    js?: JSBuildConfig[];
    css?: CSSBuildConfig[];
    spritesheet?: SpriteBuildConfig[];
  }

  export interface BuildConfig {
    taskName: string;
    dest: string;
  }

  export interface JSBuildConfig extends BuildConfig {
    entries: string[];
  }

  export interface CSSBuildConfig extends BuildConfig {
    entries: string[];
  }
  export interface SpriteBuildConfig extends BuildConfig {
    src: string[];
  }
}

declare module "gulpfile.types.task" {
  import { Gulp } from "gulp";
  import { GulpConfig } from "gulpfile.types.config";

  export interface GulpTask {
    (gulp: Gulp, config: GulpConfig): void;
  }
}
