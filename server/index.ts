import "source-map-support/register";
import "regenerator-runtime/runtime";

// don't load css modules on server when doing isomorphic rendering
// https://github.com/webpack/webpack/issues/1754#issuecomment-186856033
require.extensions[".scss"] = () => {};
require.extensions[".css"] = () => {};

import "./serve";
