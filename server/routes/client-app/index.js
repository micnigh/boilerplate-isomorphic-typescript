"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _server = require("react-dom/server");

var _reactRouter = require("react-router");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _gulpfile = require("../../../gulpfile.config");

var _gulpfile2 = _interopRequireDefault(_gulpfile);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _reactRedux = require("react-redux");

var _loadState = require("./load-state/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};

var escape = require("regexp.escape");

var htmlTemplate = require("./templates/index.html");
var router = exports.router = _express2.default.Router({ mergeParams: true });
router.get(_gulpfile2.default.baseUrl + "*", function (req, res, next) {
    return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                            var initialState, user, _require, initStore, store, routes;

                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            initialState = undefined;
                                            user = req.user;

                                            user = user ? user : {
                                                displayName: "Guest",
                                                role: "GUEST"
                                            };
                                            console.log(_chalk2.default.bgBlue("clientApp user"), JSON.stringify(user, null, 2));
                                            if (process.env.NODE_ENV !== "production") {
                                                clearNodeModuleCache();
                                            }
                                            _context.next = 7;
                                            return (0, _loadState.loadState)(user);

                                        case 7:
                                            initialState = _context.sent;
                                            _require = require("../../../client/js/src/store/"), initStore = _require.initStore;
                                            store = initStore(initialState);
                                            routes = require("../../../client/js/src/routes/").default;

                                            (0, _reactRouter.match)({
                                                routes: routes,
                                                location: req.url
                                            }, function (error, redirectLocation, renderProps) {
                                                if (error) {
                                                    res.status(500).send(error.message);
                                                } else if (redirectLocation) {
                                                    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                                                } else if (renderProps) {
                                                    try {
                                                        res.status(200).send(htmlTemplate({
                                                            isDev: _gulpfile2.default.isDev,
                                                            inlineJS: "\n              window.initialState = " + JSON.stringify(initialState) + "\n            ",
                                                            content: (0, _server.renderToString)(_react2.default.createElement(_reactRedux.Provider, { store: store }, _react2.default.createElement(_reactRouter.RouterContext, __assign({}, renderProps)))),
                                                            relPathToBaseUrl: relPathToBaseUrl(req.url)
                                                        }));
                                                    } catch (e) {
                                                        console.log(_chalk2.default.red(e.stack));
                                                        res.status(200).send(htmlTemplate({
                                                            isDev: _gulpfile2.default.isDev,
                                                            inlineJS: "\n              window.initialState = " + JSON.stringify(initialState) + "\n            ",
                                                            content: "",
                                                            relPathToBaseUrl: relPathToBaseUrl(req.url)
                                                        }));
                                                    }
                                                } else {
                                                    res.status(404).send("Not found");
                                                }
                                            });

                                        case 12:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this);
                        })(), "t0", 2);

                    case 2:
                        _context2.next = 7;
                        break;

                    case 4:
                        _context2.prev = 4;
                        _context2.t1 = _context2["catch"](0);

                        console.error(_chalk2.default.red(_context2.t1.stack || _context2.t1));

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 4]]);
    }));
});
var relPathToBaseUrl = function relPathToBaseUrl(path) {
    var result = path;
    result = result.replace(_gulpfile2.default.baseUrl, "/"); // remove baseUrl
    result = result.replace(/^.*?:\/\//, "", ""); // remove protocol
    result = "../".repeat(result.match(/\//g).length - 1); // each subdir = "../"
    return result;
};
/**
 * Clears modules from node cache, so calling require will rebuild module
 */
var clearNodeModuleCache = function clearNodeModuleCache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        includePaths: [],
        excludePaths: []
    };

    options = Object.assign({
        includePaths: [],
        excludePaths: []
    }, options);
    var _options = options,
        includePaths = _options.includePaths,
        excludePaths = _options.excludePaths;

    excludePaths.push("node_modules");
    var regExpIncludePaths = includePaths.map(function (p) {
        return new RegExp("^" + escape(_path2.default.resolve(process.cwd() + "/" + p)));
    });
    var regExpExcludePaths = excludePaths.map(function (p) {
        return new RegExp("^" + escape(_path2.default.resolve(process.cwd() + "/" + p)));
    });
    var modulesToDelete = [];

    var _loop = function _loop(k) {
        if (regExpIncludePaths.length > 0) {
            if (regExpIncludePaths.some(function (r) {
                return r.test(k);
            }) && !regExpExcludePaths.some(function (r) {
                return r.test(k);
            })) {
                modulesToDelete.push(k);
            }
        } else {
            if (!regExpExcludePaths.some(function (r) {
                return r.test(k);
            })) {
                modulesToDelete.push(k);
            }
        }
    };

    for (var k in require.cache) {
        _loop(k);
    }
    console.log(modulesToDelete);
    modulesToDelete.forEach(function (m) {
        return delete require.cache[m];
    });
    console.log(_chalk2.default.yellow("Cleared module cache with RegExp - deleted " + modulesToDelete.length + " modules"));
};
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLEFBQUssQUFBTSxBQUFPOzs7O0FBQ2xCLEFBQU8sQUFBTSxBQUFTOzs7O0FBQ3RCLEFBQUUsQUFBYyxBQUFFLEFBQU0sQUFBa0I7O0FBQzFDLEFBQUUsQUFBSyxBQUFFLEFBQWEsQUFBRSxBQUFNLEFBQWM7O0FBQzVDLEFBQUssQUFBTSxBQUFPOzs7O0FBQ2xCLEFBQU0sQUFBTSxBQUEwQjs7OztBQUN0QyxBQUFJLEFBQU0sQUFBTTs7OztBQUdoQixBQUFFLEFBQVEsQUFBRSxBQUFNLEFBQWE7O0FBRS9CLEFBQUUsQUFBUyxBQUFFLEFBQU0sQUFBZSxBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFOQSxJQUFJLEFBQU0sU0FBRyxBQUFPLFFBQUMsQUFBZSxBQUFDLEFBQUM7O0FBR3RDLElBQUksQUFBWSxlQUFHLEFBQU8sUUFBQyxBQUF3QixBQUFDLEFBQUM7QUFHOUMsSUFBSSxBQUFNLDBCQUFHLEFBQU8sa0JBQUMsQUFBTSxPQUFDLEVBQUUsQUFBVyxhQUFFLEFBQUksQUFBRSxBQUFDLEFBQUM7QUFFMUQsQUFBTSxPQUFDLEFBQUcsQUFBQyxJQUFHLEFBQU0sbUJBQUMsQUFBTyxBQUFHLHlCQUFTLEFBQUcsS0FBRSxBQUFHLEtBQUUsQUFBSTtBQUFyQjtBQUMvQixBQUFJLEFBQUMsQUFDSDs7Ozs7Ozs7Ozs7Ozs7QUFBSSxBQUFZLDJEQUFHLEFBQVMsQUFBQyxBQUM3QixBQUFJO0FBQUUsQUFBSSxBQUFFLG1EQUFHLEFBQUcsQUFBQzs7QUFDbkIsQUFBSSxtREFBRyxBQUFJLE9BQUcsQUFBSTtBQUNoQixBQUFXLDZEQUFFLEFBQU87QUFDcEIsQUFBSSxzREFBRSxBQUFPLEFBQ2QsQUFBQztBQUhtQjtBQUlyQixBQUFPLG9EQUFDLEFBQUcsSUFBQyxBQUFLLGdCQUFDLEFBQU0sQUFBQyxBQUFn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QUFJLE9BQU8sQUFBTyxRQUFDLEFBQUssTUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFDOztBQUN0RCxBQUFPLFlBQUMsQUFBRyxJQUFDLEFBQUssZ0JBQUMsQUFBTSxBQUFDLHVEQUE4QyxBQUFlLGdCQUFDLEFBQU0sQUFBVSxBQUFDLEFBQUMsQUFBQyxBQUM1RztBQUFDLEFBQUMsQUFFRjtrQkFBZSxBQUFNLEFBQUMiLCJmaWxlIjoic2VydmVyL3JvdXRlcy9jbGllbnQtYXBwL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIjtcbmltcG9ydCB7IG1hdGNoLCBSb3V0ZXJDb250ZXh0IH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vZ3VscGZpbGUuY29uZmlnXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xubGV0IGVzY2FwZSA9IHJlcXVpcmUoXCJyZWdleHAuZXNjYXBlXCIpO1xuXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xubGV0IGh0bWxUZW1wbGF0ZSA9IHJlcXVpcmUoXCIuL3RlbXBsYXRlcy9pbmRleC5odG1sXCIpO1xuaW1wb3J0IHsgbG9hZFN0YXRlIH0gZnJvbSBcIi4vbG9hZC1zdGF0ZS9cIjtcblxuZXhwb3J0IGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcih7IG1lcmdlUGFyYW1zOiB0cnVlIH0pO1xuXG5yb3V0ZXIuZ2V0KGAke2NvbmZpZy5iYXNlVXJsfSpgLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQgaW5pdGlhbFN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGxldCB7IHVzZXIgfSA9IHJlcTtcbiAgICB1c2VyID0gdXNlciA/IHVzZXIgOiB7XG4gICAgICBkaXNwbGF5TmFtZTogXCJHdWVzdFwiLFxuICAgICAgcm9sZTogXCJHVUVTVFwiLFxuICAgIH07XG4gICAgY29uc29sZS5sb2coY2hhbGsuYmdCbHVlKGBjbGllbnRBcHAgdXNlcmApLCBKU09OLnN0cmluZ2lmeSh1c2VyLCBudWxsLCAyKSk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY2xlYXJOb2RlTW9kdWxlQ2FjaGUoKTtcbiAgICB9XG4gICAgaW5pdGlhbFN0YXRlID0gYXdhaXQgbG9hZFN0YXRlKHVzZXIpO1xuXG4gICAgbGV0IHsgaW5pdFN0b3JlIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L2pzL3NyYy9zdG9yZS9cIik7XG4gICAgbGV0IHN0b3JlID0gaW5pdFN0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgbGV0IHJvdXRlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jbGllbnQvanMvc3JjL3JvdXRlcy9cIikuZGVmYXVsdDtcblxuICAgIG1hdGNoKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGxvY2F0aW9uOiByZXEudXJsLFxuICAgIH0sIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgcmVuZGVyUHJvcHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAocmVkaXJlY3RMb2NhdGlvbikge1xuICAgICAgICByZXMucmVkaXJlY3QoMzAyLCByZWRpcmVjdExvY2F0aW9uLnBhdGhuYW1lICsgcmVkaXJlY3RMb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgfSBlbHNlIGlmIChyZW5kZXJQcm9wcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGh0bWxUZW1wbGF0ZSh7XG4gICAgICAgICAgICBpc0RldjogY29uZmlnLmlzRGV2LFxuICAgICAgICAgICAgaW5saW5lSlM6IGBcbiAgICAgICAgICAgICAgd2luZG93LmluaXRpYWxTdGF0ZSA9ICR7SlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKX1cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgICBjb250ZW50OiByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgPFJvdXRlckNvbnRleHQgey4uLnJlbmRlclByb3BzfSAvPlxuICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlbFBhdGhUb0Jhc2VVcmw6IHJlbFBhdGhUb0Jhc2VVcmwocmVxLnVybCksXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coY2hhbGsucmVkKGUuc3RhY2spKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChodG1sVGVtcGxhdGUoe1xuICAgICAgICAgICAgaXNEZXY6IGNvbmZpZy5pc0RldixcbiAgICAgICAgICAgIGlubGluZUpTOiBgXG4gICAgICAgICAgICAgIHdpbmRvdy5pbml0aWFsU3RhdGUgPSAke0pTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSl9XG4gICAgICAgICAgICBgLFxuICAgICAgICAgICAgY29udGVudDogYGAsXG4gICAgICAgICAgICByZWxQYXRoVG9CYXNlVXJsOiByZWxQYXRoVG9CYXNlVXJsKHJlcS51cmwpLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoXCJOb3QgZm91bmRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChlLnN0YWNrIHx8IGUpKTtcbiAgfVxufSk7XG5cbmxldCByZWxQYXRoVG9CYXNlVXJsID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgbGV0IHJlc3VsdCA9IHBhdGg7XG4gIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGNvbmZpZy5iYXNlVXJsLCBcIi9cIik7IC8vIHJlbW92ZSBiYXNlVXJsXG4gIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9eLio/OlxcL1xcLy8sIFwiXCIsIFwiXCIpOyAvLyByZW1vdmUgcHJvdG9jb2xcbiAgcmVzdWx0ID0gXCIuLi9cIi5yZXBlYXQocmVzdWx0Lm1hdGNoKC9cXC8vZykubGVuZ3RoIC0gMSk7IC8vIGVhY2ggc3ViZGlyID0gXCIuLi9cIlxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBDbGVhcnMgbW9kdWxlcyBmcm9tIG5vZGUgY2FjaGUsIHNvIGNhbGxpbmcgcmVxdWlyZSB3aWxsIHJlYnVpbGQgbW9kdWxlXG4gKi9cbmxldCBjbGVhck5vZGVNb2R1bGVDYWNoZSA9IGZ1bmN0aW9uIChvcHRpb25zOiB7XG4gIC8qKiByZWxhdGl2ZSBpbmNsdWRlIHBhdGhzIGZyb20gcHJvamVjdCBkaXIgKi9cbiAgaW5jbHVkZVBhdGhzPzogc3RyaW5nW10sXG4gIC8qKiByZWxhdGl2ZSBleGNsdWRlIHBhdGhzIGZyb20gcHJvamVjdCBkaXIgKi9cbiAgZXhjbHVkZVBhdGhzPzogc3RyaW5nW11cbn0gPSB7XG4gIGluY2x1ZGVQYXRoczogW10sXG4gIGV4Y2x1ZGVQYXRoczogW10sXG59KSB7XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBpbmNsdWRlUGF0aHM6IFtdLFxuICAgIGV4Y2x1ZGVQYXRoczogW10sXG4gIH0sIG9wdGlvbnMpO1xuICBsZXQgeyBpbmNsdWRlUGF0aHMsIGV4Y2x1ZGVQYXRocyB9ID0gb3B0aW9ucztcbiAgZXhjbHVkZVBhdGhzLnB1c2goXCJub2RlX21vZHVsZXNcIik7XG4gIGxldCByZWdFeHBJbmNsdWRlUGF0aHMgPSBpbmNsdWRlUGF0aHMubWFwKHAgPT4gbmV3IFJlZ0V4cChcIl5cIiArIGVzY2FwZShwYXRoLnJlc29sdmUoYCR7cHJvY2Vzcy5jd2QoKX0vJHtwfWApKSkpO1xuICBsZXQgcmVnRXhwRXhjbHVkZVBhdGhzID0gZXhjbHVkZVBhdGhzLm1hcChwID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBlc2NhcGUocGF0aC5yZXNvbHZlKGAke3Byb2Nlc3MuY3dkKCl9LyR7cH1gKSkpKTtcbiAgbGV0IG1vZHVsZXNUb0RlbGV0ZSA9IFtdO1xuICBmb3IgKGxldCBrIGluIHJlcXVpcmUuY2FjaGUpIHtcbiAgICBpZiAocmVnRXhwSW5jbHVkZVBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAgcmVnRXhwSW5jbHVkZVBhdGhzLnNvbWUociA9PiByLnRlc3QoaykpICYmXG4gICAgICAgICFyZWdFeHBFeGNsdWRlUGF0aHMuc29tZShyID0+IHIudGVzdChrKSlcbiAgICAgICkge1xuICAgICAgICBtb2R1bGVzVG9EZWxldGUucHVzaChrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICAhcmVnRXhwRXhjbHVkZVBhdGhzLnNvbWUociA9PiByLnRlc3QoaykpXG4gICAgICApIHtcbiAgICAgICAgbW9kdWxlc1RvRGVsZXRlLnB1c2goayk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKG1vZHVsZXNUb0RlbGV0ZSk7XG4gIG1vZHVsZXNUb0RlbGV0ZS5mb3JFYWNoKG0gPT4gZGVsZXRlIHJlcXVpcmUuY2FjaGVbbV0pO1xuICBjb25zb2xlLmxvZyhjaGFsay55ZWxsb3coYENsZWFyZWQgbW9kdWxlIGNhY2hlIHdpdGggUmVnRXhwIC0gZGVsZXRlZCAke21vZHVsZXNUb0RlbGV0ZS5sZW5ndGh9IG1vZHVsZXNgKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=