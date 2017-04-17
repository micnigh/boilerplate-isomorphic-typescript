// import all libs you might want to use here

// shims/runtimes
import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "es7-shim";
import "regenerator-runtime/runtime";
import "babel-runtime/regenerator/";

// developer/webpack libs
import "react-hot-loader";

// libs
import "webfontloader";
import "moment";
import "lodash";

// react/redux
import "react";
import "react-dom";
import "react-router-dom";
import "react-redux";
import "redux";
import "redux-thunk";
import "redux-logger";
import "redux-promise";
import "normalizr";
import "denormalizr";

// css styling
import "styled-components";
import "grid-styled";
import "color";
import "css-wipe/js";

//
// Load submodules - modules which should be loaded, but do not have a
// clean npm reference
//
const requireAll = (requireContext) => {
  requireContext.keys().forEach(path => {
    try {
      requireContext(path);
    } catch (err) {
      // do nothing - typically triggered when file deleted
    }
  });
};

// import babel-runtime sub modules
requireAll(require.context("babel-runtime/core-js/", true, /\.js$/));
requireAll(require.context("babel-runtime/helpers/", true, /\.js$/));

// import lodash sub modules so webpack groups them up with the global module
requireAll(require.context("lodash/", true, /\.js$/));
