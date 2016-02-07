import { Gulp } from "gulp";

export interface GulpConfig {
  /** are we in development mode? */
  isDev: boolean;

  /** path to store output */
  distPath: string;

  test?: {
    /** karma browser test runner */
    karma: {
      port: number,
    };
  };

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
  watch?: string[];
}

export interface JSConfig {

  libs: JSLibConfig[];
  builds: JSBuildConfig[];
}

export interface JSBuildConfig extends BuildConfig {
  entries: string[];
  includePaths?: string[];

  /**
   * prepended to front of bundles - good for things like
   * hooking up livereload, disabling logs, or browser hacks
   */
  bootstrap?: string[];
}

export interface JSLibConfig extends BuildConfig {
  includePaths?: string[];
  includes: {
    name: string;
    path: string;
    global?: string;
  }[];
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
