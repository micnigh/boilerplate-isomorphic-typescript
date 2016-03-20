import { Gulp } from "gulp";
import { GulpTask, GulpWatchTask } from "../../../gulpfile.types";
import { GulpConfig, SpriteBuildConfig } from "../../../gulpfile.config.types";

import buffer from "vinyl-buffer";
import size from "gulp-size";
import rename from "gulp-rename";
import replace from "gulp-replace";
let spritesmith = require("gulp.spritesmith");
let imagemin = require("gulp-imagemin");
import es from "event-stream";
import merge from "merge-stream";
import glob from "glob";
import chalk from "chalk";
let crypto = require("crypto");
let del = require("del");
import path from "path";
import fs from "fs";

let shouldBuildSprite = (build: SpriteBuildConfig) => {
  let buildSpritesheet = true;

  if (glob.sync(`${build.dest}/${build.destFileName}*.png`).length > 0) {
    let srcModifiedTime: Date = build.src
      .map(s => s.indexOf("*") !== -1 ? s.split("*")[0] : path.dirname(s))
      .map(s => { try { return fs.statSync(s).mtime; } catch (e) { return new Date(); }})
      .reduce((a, b) => {
        if (a > b) {
          return a;
        } else {
          return b;
        }
    });

    try {
      let spriteCSSModifiedTime = fs.statSync(build.spriteCSSFile).mtime;
      buildSpritesheet = srcModifiedTime > spriteCSSModifiedTime;
      if (!buildSpritesheet) {
        console.log(`sprite ${build.taskName} up to date - skip building`);
        return;
      } else {
        console.log(`sprite ${build.taskName} src modified`);
      }
    } catch (e) { /* continue */ }
  } else {
    console.log(`sprite ${build.taskName} not built`);
  }

  return buildSpritesheet;
};

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  config.spritesheet.builds.forEach(build => {
    let buildTaskName = `build:sprite:${build.taskName}`;
    let watchTaskName = `watch:sprite:${build.taskName}`;
    gulpTask.childTasks.push(buildTaskName);

    let browserSyncInstances = build.browsersync || [];

    let createSpriteTaskName = `${buildTaskName}:create-sprite`;
    let injectTaskName = `${buildTaskName}:inject-md5-name-into-css`;

    gulp.task(buildTaskName, [createSpriteTaskName, injectTaskName]);

    let spriteSmith = null;
    let cssFileName = path.basename(build.spriteCSSFile);
    let newSpritesheetName = `${build.destFileName}${new Date()}.png`;
    let md5SpritesheetName = "";
    let md5Png = "";

    let spriteOutputFolder = build.dest;
    let spriteCSSOutputFolder = path.dirname(build.spriteCSSFile);
    let spriteCSSOutputFile = build.spriteCSSFile;

    let buildSpritesheet = true;

    gulp.task(createSpriteTaskName, [], () => {

      buildSpritesheet = shouldBuildSprite(build);
      if (!buildSpritesheet) {
        return;
      }

      console.log(`building ${build.taskName}`);

      newSpritesheetName = `${build.destFileName}${(+ new Date())}`;

      del.sync([`${spriteOutputFolder}/${build.destFileName}*.png`]);

      spriteSmith = gulp.src(build.src)
        .pipe(spritesmith({
          imgName: `${newSpritesheetName}.png`,
          cssName: cssFileName
        }));

      let imgPipe = spriteSmith.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(es.map(function (file, cb) {
          md5Png = crypto.createHash("md5").update(file.contents).digest("hex").slice(0, 10);
          md5SpritesheetName = `${build.destFileName}${md5Png}`;
          cb(null, file);
        }))
        .pipe(rename(function (path) {
          path.basename = md5SpritesheetName;
          return path;
        }))
        .pipe(gulp.dest(spriteOutputFolder))
        .pipe(size({ showFiles: true }));

      let cssPipe = spriteSmith.css
        .pipe(gulp.dest(spriteCSSOutputFolder))
        .pipe(size({ showFiles: true }));

      return merge(imgPipe, cssPipe);
    });

    gulp.task(injectTaskName, [createSpriteTaskName], function () {
      if (!buildSpritesheet) {
        return;
      }

      let p = gulp.src(spriteCSSOutputFile)
        .pipe(replace(new RegExp(newSpritesheetName, "g"), md5SpritesheetName))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(spriteCSSOutputFolder));
      return p;
    });

    gulpTask.childWatchTasks.push(watchTaskName);
    gulp.task(watchTaskName, [buildTaskName], () => {
      return gulp.watch(build.watch, [buildTaskName]);
    });
  });

  gulp.task("build:sprite", gulpTask.childTasks);
  gulp.task("watch:sprite", gulpTask.childWatchTasks);

  return gulpTask;
};
