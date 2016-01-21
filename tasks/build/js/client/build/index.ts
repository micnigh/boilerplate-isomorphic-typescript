"use strict";
import { Gulp } from "gulp";
import * as size from "gulp-size";
import source = require("vinyl-source-stream");
import { GulpTask } from "gulpfile.types.task";
import { GulpConfig } from "gulpfile.types.config";
import * as glob from "glob";
import * as chalk from "chalk";
import * as browserify from "browserify";
import * as path from "path";
import * as _ from "lodash";

let watchify: {(instance: Browserify.BrowserifyObject): Browserify.BrowserifyObject} = require("watchify");
let buffer = require("gulp-buffer");
let prettyTime = require("pretty-hrtime");

export interface BrowserifyBuildOptions {
  watch: boolean;
  destFileName: string;
  isLib?: boolean;
};

function bundleBrowserifyBuild (b: Browserify.BrowserifyObject, buildOptions: BrowserifyBuildOptions, gulp: Gulp, config: GulpConfig): NodeJS.ReadWriteStream {
  let bundleStartTime = process.hrtime();
  let bundle = b.bundle();
  bundle
    .on("error", function (msg) {
      console.log(chalk.red(msg.toString()));
    })
    .on("end", function () {
      console.log(`Bundled ${chalk.cyan(buildOptions.destFileName)} ${chalk.magenta(prettyTime(process.hrtime(bundleStartTime)))}`);
    });

  return bundle
    .pipe(source(buildOptions.destFileName))
    .pipe(buffer())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(`${config.distPath}/js/`));
}

export function browserifyBuild (browserifyOptions: Browserify.Options, buildOptions: BrowserifyBuildOptions, gulp: Gulp, config: GulpConfig): NodeJS.ReadWriteStream {
    browserifyOptions = _.merge({
      extensions: [".js", ".jsx" ],
      // create empty caches - so bundles wont share cache
      cache: {},
      packageCache: {},
      paths: [],
    }, browserifyOptions, true);

    browserifyOptions.paths.push(process.cwd());

    let b = browserify(browserifyOptions);

    if (buildOptions.isLib) {
      config.js.libs
        .map(l => l.requires)
        .reduce((a, b) => a.concat(b))
        .forEach(e => b.require(e));
    } else {
      config.js.libs
        .map(l => l.requires)
        .reduce((a, b) => a.concat(b))
        .forEach(e => b.external(e));
    }

    if (buildOptions.watch) {
      b.plugin(watchify);
      b.on("update", () => bundleBrowserifyBuild(b, buildOptions, gulp, config));
    }
    return bundleBrowserifyBuild(b, buildOptions, gulp, config);
}

let generateTask: GulpTask = (gulp: Gulp, config: GulpConfig) => {
  let generatedTasks: string[] = [];
  let generatedWatchTasks: string[] = [];
  config.js.builds.forEach(build => {
    let buildTaskName = `build:js:client:builds:${build.taskName}`;
    let watchTaskName = `watch:js:client:builds:${build.taskName}`;
    let generatedEntryBuildTasks: string[] = [];
    let generatedEntryWatchTasks: string[] = [];
    build.entries.forEach(entry => {
      let entriesFromGlob = glob.sync(entry);
      entriesFromGlob.forEach(entryFromGlob => {
        entryFromGlob = `${entryFromGlob.replace(path.extname(entryFromGlob), ".js")}`;
        let entryBuildTaskName = `build:js:client:builds:${build.taskName}:${entryFromGlob}`;
        let entryWatchTaskName = `watch:js:client:builds:${build.taskName}:${entryFromGlob}`;
        generatedEntryBuildTasks.push(entryBuildTaskName);
        generatedEntryWatchTasks.push(entryWatchTaskName);

        let entryBuildBrowserifyConfig: Browserify.Options = {
          debug: config.isDev,
          entries: [
            entryFromGlob,
            // "typings/tsd.d.ts",
          ],
          paths: build.includePaths,
        };

        let entryBuildBrowserifyBuildOptions: BrowserifyBuildOptions = {
          watch: false,
          destFileName: `${path.basename(entryFromGlob, path.extname(entryFromGlob))}.js`,
        };

        gulp.task(entryBuildTaskName, ["build:js:client:transpile"], () => {
          return browserifyBuild(entryBuildBrowserifyConfig, entryBuildBrowserifyBuildOptions, gulp, config);
        });
        gulp.task(entryWatchTaskName, ["build:js:client:transpile"], () => {
          return browserifyBuild(entryBuildBrowserifyConfig, _.merge({}, entryBuildBrowserifyBuildOptions, {
            watch: true,
          }, true), gulp, config);
        });
      });
      generatedTasks.push(buildTaskName);
      generatedWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryBuildTasks);
      gulp.task(watchTaskName, [buildTaskName], () => {
        return gulp.watch(build.watch, [buildTaskName]);
      });
    });
  });

  gulp.task(`build:js:client:builds`, generatedTasks);
  gulp.task(`watch:js:client:builds`, generatedWatchTasks);

  return {
    generatedTasks,
    generatedWatchTasks,
  };
};

export default generateTask;
