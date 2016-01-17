declare module "gulpfile.types.config" {
  import { Gulp } from "gulp";

  export interface GulpConfig {
    /** path to store output */
    distPath: string;

    /** js task config */
    js?: JSConfig;

    /** css task config */
    css?: CSSConfig;

    /** sprite task config */
    spritesheet?: SpriteConfig;
  }

  export interface BuildConfig {
    /**
     * task name within namespace
     * for example, 'build:js' task with 'taskName'='app'
     * creates task 'build:js:app'
    */
    taskName: string;
    dest: string;
  }

  export interface JSConfig {
    libs: JSLibConfig;
    builds: JSBuildConfig[];
  }

  export interface JSBuildConfig extends BuildConfig {
    entries: string[];
    includePaths?: string[];
  }

  export interface JSLibConfig extends JSBuildConfig {
    requires: string[];
  }

  export interface CSSConfig {
    builds: CSSBuildConfig[];
  }

  export interface CSSBuildConfig extends BuildConfig {
    entries: string[];
    includePaths?: string[];
  }

  export interface SpriteConfig {
    builds: SpriteBuildConfig[];
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
