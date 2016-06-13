import "source-map-support/register";
import "regenerator-runtime/runtime";

import gulp from "gulp";
import * as tasks from "./tasks/";
import config from "./gulpfile.config";

tasks.generateTask(gulp, config);

gulp.task("help", [], () => {
  console.log(`
gulp tasks

  development tasks:
    gulp build - build assets (.js, .css)
    gulp watch - build and watch assets, run a server
    gulp test  - run all tests

  deployment tasks:
    NODE_ENV=production gulp build        - build assets for production
    NODE_ENV=production gulp build:static - build static version of site
    NODE_ENV=production gulp deploy       - deploy to gh-pages branch
`);
});

gulp.task("default", ["help"]);
