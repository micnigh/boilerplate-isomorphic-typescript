import { Gulp } from "gulp";

export interface GulpConfig {
  /** are we in development mode? */
  isDev: boolean;

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

  /** path to store output */
  dest: string;

  /** files to watch and trigger rebuild */
  watch: string[];
}

export interface JSConfig {
  libs: JSLibConfig[];
  builds: JSBuildConfig[];
}

export interface JSBuildConfig extends BuildConfig {
  entries: string[];
  includePaths?: string[];
}

export interface JSLibConfig extends BuildConfig {
  includePaths?: string[];
  requires: string[];
  destFileName: string;
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
