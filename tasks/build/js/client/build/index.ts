import { Gulp } from "gulp";
import glob from "glob";
import fs from "fs";
import path from "path";
import webpack from "webpack";
import mkdirp from "mkdirp";
import express from "express";
import compression from "compression";
import os from "os";
import chalk from "chalk";

let WebpackDevMiddleware = require("webpack-dev-middleware");
let WebpackHotMiddleware = require("webpack-hot-middleware");
let portfinder = require("portfinder");
portfinder.basePort = 3010;

import { GulpWatchTask } from "../../../../../gulpfile.types";
import { GulpConfig, JSBuildConfig } from "../../../../../gulpfile.config.types";
import webpackConfigGenerator from "./webpack.config";

export let generateTask = (gulp: Gulp, config: GulpConfig): GulpWatchTask => {
  let gulpTask = new GulpWatchTask();
  let totalHMREntries = getAllHMREntries(config.js.builds).length;
  let freePortsPromise = getFreePorts(totalHMREntries);
  let portsTaken = 0;

  config.js.builds.forEach(build => {
    let buildTaskName = `build:js:client:builds:${build.taskName}`;
    let watchTaskName = `watch:js:client:builds:${build.taskName}`;
    let generatedEntryBuildTasks: string[] = [];
    let generatedEntryWatchTasks: string[] = [];

    let webpackConfigsPath = `${config.tmpPath}/webpackConfigs/`;
    if (config.isDev) {
      mkdirp.sync(webpackConfigsPath);
    }

    build.entries.forEach(entry => {
      let buildBootstrap = build.bootstrap || [];
      let entriesFromGlob = glob.sync(entry);
      let basePath = entry.indexOf("*") !== -1 ? entry.split("*")[0] : ".";
      entriesFromGlob = entriesFromGlob
        .map(e => `${e.replace(path.extname(e), ".js")}`)
        .filter(e => buildBootstrap.indexOf(e) === -1);
      entriesFromGlob.forEach(entryFromGlob => {
        let entryBuildTaskName = `build:js:client:builds:${build.taskName}:${entryFromGlob}`;
        let entryWatchTaskName = `watch:js:client:builds:${build.taskName}:${entryFromGlob}`;
        generatedEntryBuildTasks.push(entryBuildTaskName);
        generatedEntryWatchTasks.push(entryWatchTaskName);

        let browserSyncInstances = build.browsersync || [];

        if (config.isDev && build.hmr) {
          let portIndex = portsTaken++;
          // build configs for use as webpack dev server - which we will proxy to from express server
          let relativeDest = `${path.dirname(entryFromGlob.replace(basePath, ""))}`;
          let relativePath = `${entryFromGlob.replace(basePath, "")}`;
          // relativeDest = relativeDest === "." ? "" : relativeDest;
          let dest = `${relativeDest}`;
          let es6EntryFromGlob = entryFromGlob.replace(/\.js$/, ".es6");
          gulp.task(entryBuildTaskName, ["build:js:client:libs"], (doneWithGeneratedTask) => {
            freePortsPromise.then((ports) => {
              let port = ports[portIndex];
              let webpackConfigGeneratorOptions: WebpackConfigGeneratorOptions = {
                gulpfileConfigField: `js.builds[${config.js.builds.indexOf(build)}]`,
                entry: es6EntryFromGlob,
                dest,
                relativePath,
                port,
              };
              // let webpackConfigGeneratorOptions = webpackConfigGenerator(config, build, entryFromGlob, dest);
              fs.writeFile(`${webpackConfigsPath}${entryBuildTaskName.replace(/[:/]/g, "-").replace(/\.js$/, ".json")}`, JSON.stringify(webpackConfigGeneratorOptions, null, 2), (err) => {
                doneWithGeneratedTask();
              });
            });
          });
          gulp.task(entryWatchTaskName, ["build:js:client:libs", entryBuildTaskName], () => {
            freePortsPromise.then((ports) => {
              let app = express()
                .use(compression());
              let port = ports[portIndex];
              let webpackConfig = webpackConfigGenerator(config, build, es6EntryFromGlob, dest, port);
              let compiler = webpack(webpackConfig);
              let webpackDevMiddleware = new WebpackDevMiddleware(compiler, {
                headers: { "Access-Control-Allow-Origin": "*" },
                publicPath: webpackConfig.output.publicPath,
                stats: { colors: true },
                watchOptions: {
                  aggregateTimeout: 0,
                },
              });
              let webpackHotMiddleware = WebpackHotMiddleware(compiler);
              app.use(webpackDevMiddleware);
              app.use(webpackHotMiddleware);
              let server = app.listen(port, "0.0.0.0", () => {
                let url = "http://" + os.hostname() + ":" + server.address().port + "/";
                console.log(`Webpack Server for ${es6EntryFromGlob} listening at ${chalk.green(url)}`);
              });
            });
          });
        } else {
          // build bundles
          let dest = `${build.dest}${path.dirname(entryFromGlob.replace(basePath, ""))}`;
          gulp.task(entryBuildTaskName, ["build:js:client:libs"], (doneWithGeneratedTask) => {
            let webpackConfig = webpackConfigGenerator(config, build, entryFromGlob, dest, undefined);
            let webpackBuilder = webpack(webpackConfig);
            return webpackBuilder.run((err: Error, stats: webpack.compiler.Stats) => {
              console.log(stats.toString({
                colors: true,
              }));
              doneWithGeneratedTask();
            });
          });
          gulp.task(entryWatchTaskName, ["build:js:client:libs"], () => {
            let webpackConfig = webpackConfigGenerator(config, build, entryFromGlob, dest, undefined);
            let webpackBuilder = webpack(webpackConfig);
            return webpackBuilder.watch({
              aggregateTimeout: 0,
            }, (err: Error, stats: webpack.compiler.Stats) => {
              console.log(stats.toString({
                colors: true,
              }));
              browserSyncInstances.forEach(b => {
                b.reload([entryFromGlob]);
              });
            });
          });
        }
      });
      gulpTask.childTasks.push(buildTaskName);
      gulpTask.childWatchTasks.push(watchTaskName);
      gulp.task(buildTaskName, generatedEntryBuildTasks);
      gulp.task(watchTaskName, generatedEntryWatchTasks);
    });
  });

  gulp.task(`build:js:client:builds`, gulpTask.childTasks);
  gulp.task(`watch:js:client:builds`, gulpTask.childWatchTasks);

  return gulpTask;
};

let getFreePorts = (count) => {
  let promise = new Promise<number[]>((resolve, reject) => {
    portfinder.getPorts(count, (err, ports) => {
      if (err) {
        console.error(err.stack || err);
        reject(err.stack || err);
      }
      return resolve(ports);
    });
  });
  return promise;
};

let getAllHMREntries = (builds: JSBuildConfig[]) => {
  return builds
    .map(build => build.hmr ?
        build.entries
          .map(entry => glob.sync(entry))
          .map(entries => entries.filter(entry => (build.bootstrap || []).indexOf(entry.replace(/\.tsx?$/, ".js")) === -1))
          .reduce((a, b) => a.concat(b), [])
        : []
    )
    .reduce((a, b) => a.concat(b), []);
};
