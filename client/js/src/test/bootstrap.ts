import "regenerator/runtime";
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
      (<string[]>process.env.BROWSER_SYNC_SNIPPETS).forEach(s => {
        document.write(`<script src="${s}"></script>`);
      });
    }
  }
}
