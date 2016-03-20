import webpack from "webpack";

import browsersync from "browser-sync";

export interface GulpConfig {
  /**
   *  are we in development mode?  default=true
   *  overwrite with env var NODE_ENV
   */
  isDev: boolean;

  /** path to store output */
  distPath: string;

  /** path to store tmp files */
  tmpPath: string;

  /**
   *  directory where content will be served
   *  change this when serving from a subdirectory
   *  overwrite with env var BASE_URL
   */
  baseUrl: string;

  watch?: {
    /** browsersync instances to trigger livereload for */
    browsersync?: {
      port: number;
      uiPort: number;
      instance: browsersync.BrowserSyncInstance;
    }[]
  };

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

  /** browsersync instances to trigger livereload for */
  browsersync?: browsersync.BrowserSyncInstance[];

  /**
   * gulp tasks which this build depends on
   */
   dependsOn?: string[];
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

  webpack?: webpack.Configuration;

  /**
   * enable webpack hmr
   */
  hmr: boolean;
}

export interface JSLibConfig extends BuildConfig {
  includePaths?: string[];
  includes: string[];
  destFileName: string;
  webpack?: webpack.Configuration;
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
  spriteCSSFile: string;
  destFileName: string;
  buildCSSTask: string;
}
