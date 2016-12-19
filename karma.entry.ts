import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "es7-shim";
import "regenerator-runtime/runtime";

const requireAll = (requireContext) => {
  requireContext.keys().forEach(path => {
    try {
      requireContext(path);
    } catch (err) {
      // do nothing - typically triggered when file deleted
    }
  });
};
requireAll(require.context("./client/js/src/", true, /\.browser\.spec\.tsx?$/));
requireAll(require.context("./client/js/src/", true, /\/__tests__\/.*\.browser\.tsx?$/));
