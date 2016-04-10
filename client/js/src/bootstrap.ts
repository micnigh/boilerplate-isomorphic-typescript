import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "regenerator/runtime";

if (process.env.NODE_ENV !== "production") {
  if (process.env.BROWSER_SYNC_SNIPPETS !== "undefined") {
    (<string[]>process.env.BROWSER_SYNC_SNIPPETS).forEach(s => {
      document.write(`<script src="${s}"></script>`);
    });
  }
}
