boilerplate isomorphic typescript

# Requirements/Recommended

 - [node] `v6+`
 - [atom]
    - Packages
      - [atom-typescript]
      - [atom-lint]
      - [linter-tslint]
 - [docker]

# Quick start

```bash
# first time
npm install

# every time
npm run server:dev

# for testing - browser debugging at http://localhost:9876/debug.html
npm run test:watch

```

# Libraries

Libraries can be large (~250KB gzipped) and slow down rebuild times, so we
build them separately from application code.  We do this by using the webpack
DLL plugin.  This allows us to reference many different libraries from one
external webpack bundle, allowing us to cache and reduce load times.

The lib file should be automatically regenerated when dependencies are updated.
New dependencies may need to be added to the entry file `client/js/src/libs.tsx`

```bash
# to manually generate a new libs file
npm run build:lib

# to lock down npm libraries, so we can rebuild on different machines
npm shrinkwrap --dev

```

# Features

 - [typescript] - javascript type support

# Misc

## Todos

---

[node]: https://nodejs.org/
[atom]: https://atom.io/
[atom-typescript]: https://atom.io/packages/atom-typescript
[typescript]: http://www.typescriptlang.org/
[tsd]: http://definitelytyped.org/tsd/
[tslint]: http://palantir.github.io/tslint/
[atom-lint]: https://atom.io/packages/atom-lint
[linter-tslint]: https://atom.io/packages/linter-tslint
[es5-shim]: https://github.com/es-shims/es5-shim
[webpack]: https://webpack.github.io/
[docker]: https://www.docker.com/
