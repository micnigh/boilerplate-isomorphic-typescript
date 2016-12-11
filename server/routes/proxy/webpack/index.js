"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require("lodash");

var _gulpfile = require("../../../../gulpfile.config");

var _gulpfile2 = _interopRequireDefault(_gulpfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpProxy = require("http-proxy");
var router = exports.router = _express2.default.Router({ mergeParams: true });
var webpackConfigs = _glob2.default.sync(_gulpfile2.default.tmpPath + "/webpackConfigs/*.json").map(function (c) {
    return require(process.cwd() + "/" + c);
});
webpackConfigs.forEach(function (webpackConfigOption) {
    var gulpfileConfigField = webpackConfigOption.gulpfileConfigField,
        entry = webpackConfigOption.entry,
        dest = webpackConfigOption.dest,
        port = webpackConfigOption.port,
        relativePath = webpackConfigOption.relativePath;

    var buildConfig = (0, _lodash.get)(_gulpfile2.default, gulpfileConfigField);
    var proxy = httpProxy.createProxyServer();
    router.get(_gulpfile2.default.baseUrl + "js/" + relativePath + "*", function (req, res) {
        proxy.web(req, res, {
            target: "http://localhost:" + port,
            ws: true
        });
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvcHJveHkvd2VicGFjay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sQUFBTyxBQUFNLEFBQVM7Ozs7QUFDdEIsQUFBSSxBQUFNLEFBQU07Ozs7QUFDaEIsQUFBRSxBQUFHLEFBQUUsQUFBTSxBQUFROztBQUtyQixBQUFNLEFBQU0sQUFBNkIsQUFFaEQ7Ozs7OztBQU5BLElBQUksQUFBUyxZQUFHLEFBQU8sUUFBQyxBQUFZLEFBQUMsQUFBQztBQU0vQixJQUFJLEFBQU0sMEJBQUcsQUFBTyxrQkFBQyxBQUFNLE9BQUMsRUFBRSxBQUFXLGFBQUUsQUFBSSxBQUFFLEFBQUMsQUFBQztBQUUxRCxJQUFJLEFBQWMsZ0NBQWUsQUFBSSxBQUFDLEtBQUcsQUFBTSxtQkFBQyxBQUFPLEFBQXdCLEFBQUMsb0NBQUMsQUFBRztBQUFDLEFBQUMsV0FBSSxBQUFPLEFBQUMsUUFBRyxBQUFPLFFBQUMsQUFBRyxBQUFFLGNBQUksQUFBQyxBQUFFLEFBQUMsQUFBQyxBQUFDO0NBQWhHLEFBQUk7QUFDaEMsQUFBYyxlQUFDLEFBQU8sUUFBQyxBQUFtQjtBQUN4QyxBQUFJLFFBQUUsQUFBbUI7UUFBRSxBQUFLO1FBQUUsQUFBSSxPQUF5QixBQUFtQixBQUFDO1FBQTNDLEFBQUk7UUFBRSxBQUFZLEFBQUU7O0FBQzVELFFBQUksQUFBVyxjQUFrQixBQUFHLEFBQUMsQUFBTSxxQ0FBRSxBQUFtQixBQUFRLEFBQUM7QUFDekUsUUFBSSxBQUFLLFFBQUcsQUFBUyxVQUFDLEFBQWlCLEFBQUUsQUFBQztBQUMxQyxBQUFNLFdBQUMsQUFBRyxBQUFDLElBQUcsQUFBTSxtQkFBQyxBQUFPLGtCQUFNLEFBQVksQUFBRyxvQkFBRSxVQUFDLEFBQUcsS0FBRSxBQUFHO0FBQzFELEFBQUssY0FBQyxBQUFHLElBQUMsQUFBRyxLQUFFLEFBQUc7QUFDaEIsQUFBTSxBQUFFLDBDQUFvQixBQUFJLEFBQUU7QUFDbEMsQUFBRSxnQkFBRSxBQUFJLEFBQ1QsQUFBQyxBQUFDLEFBQ0w7QUFKc0I7QUFJckIsQUFBQyxBQUFDLEFBQ0w7QUFBQyxBQUFDLEFBQUMsQUFFSDtrQkFBZSxBQUFNLEFBQUMiLCJmaWxlIjoic2VydmVyL3JvdXRlcy9wcm94eS93ZWJwYWNrL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBnbG9iIGZyb20gXCJnbG9iXCI7XG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwibG9kYXNoXCI7XG5sZXQgaHR0cFByb3h5ID0gcmVxdWlyZShcImh0dHAtcHJveHlcIik7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5cbmltcG9ydCB7IEpTQnVpbGRDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3VscGZpbGUuY29uZmlnLnR5cGVzXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi8uLi9ndWxwZmlsZS5jb25maWdcIjtcblxuZXhwb3J0IGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcih7IG1lcmdlUGFyYW1zOiB0cnVlIH0pO1xuXG5sZXQgd2VicGFja0NvbmZpZ3M6IGFueVtdID0gZ2xvYi5zeW5jKGAke2NvbmZpZy50bXBQYXRofS93ZWJwYWNrQ29uZmlncy8qLmpzb25gKS5tYXAoYyA9PiByZXF1aXJlKGAke3Byb2Nlc3MuY3dkKCl9LyR7Y31gKSk7XG53ZWJwYWNrQ29uZmlncy5mb3JFYWNoKHdlYnBhY2tDb25maWdPcHRpb24gPT4ge1xuICBsZXQgeyBndWxwZmlsZUNvbmZpZ0ZpZWxkLCBlbnRyeSwgZGVzdCwgcG9ydCwgcmVsYXRpdmVQYXRoIH0gPSB3ZWJwYWNrQ29uZmlnT3B0aW9uO1xuICBsZXQgYnVpbGRDb25maWc6IEpTQnVpbGRDb25maWcgPSBnZXQoY29uZmlnLCBndWxwZmlsZUNvbmZpZ0ZpZWxkKSBhcyBhbnk7XG4gIGxldCBwcm94eSA9IGh0dHBQcm94eS5jcmVhdGVQcm94eVNlcnZlcigpO1xuICByb3V0ZXIuZ2V0KGAke2NvbmZpZy5iYXNlVXJsfWpzLyR7cmVsYXRpdmVQYXRofSpgLCAocmVxLCByZXMpID0+IHtcbiAgICBwcm94eS53ZWIocmVxLCByZXMsIHtcbiAgICAgIHRhcmdldDogYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fWAsXG4gICAgICB3czogdHJ1ZSxcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIl19