boilerplate isomorphic typescript

# Requirements/Recommended

 - [node] `v4+`
 - [atom]
    - Packages
      - [atom-typescript]
      - [atom-lint]
      - [linter-tslint]
 - [docker]

# Quick start

```bash
# first time
npm install -g gulp bower
npm install

# every time
gulp --gulpfile gulpfile.transpile.js watch
gulp watch

# when working with real db
docker-compose up
```

# Features

 - [typescript] - javascript type support
 - [gulp] - automated build system

# Misc

## Todos

- TODO: upgrade gulp-watch when next version is pushed.  v4.3.5 crashes when deleting a directory.  `v4.2.5` is working until then.
  - https://github.com/floatdrop/gulp-watch/issues/187
  - https://github.com/floatdrop/gulp-watch/commit/678a8f19fdaf1416b49f40da980b7471dea5e4c6

---

[node]: https://nodejs.org/
[atom]: https://atom.io/
[atom-typescript]: https://atom.io/packages/atom-typescript
[gulp]: http://gulpjs.com/
[typescript]: http://www.typescriptlang.org/
[backbone]: http://backbonejs.org/
[tsd]: http://definitelytyped.org/tsd/
[tslint]: http://palantir.github.io/tslint/
[atom-lint]: https://atom.io/packages/atom-lint
[linter-tslint]: https://atom.io/packages/linter-tslint
[es5-shim]: https://github.com/es-shims/es5-shim
[webpack]: https://webpack.github.io/
[docker]: https://www.docker.com/
