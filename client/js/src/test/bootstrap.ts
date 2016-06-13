import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "regenerator-runtime/runtime";
import Promise from "bluebird";

window.Promise = Promise;

if (/PhantomJS/.test(navigator.userAgent)) {
  // no console output if in phantom - too noisy
  // console.log = function () {};
  // console.warn = function () {};
  // console.error = function () {};
} else {
  if (process.env.NODE_ENV !== "production") {
    if (process.env.BROWSER_SYNC_SNIPPETS !== "undefined") {
    (<{ port: number, path: string}[]>process.env.BROWSER_SYNC_SNIPPETS).forEach(s => {
      let { protocol, hostname } = window.location;
      let { port, path } = s;
      document.write(`<script src="${protocol}//${hostname}:${port}${path}"></script>`);
    });
  }
  }
}
