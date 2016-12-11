"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serve = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _start = require("./db/start");

var _start2 = _interopRequireDefault(_start);

var _seed = require("./db/seed");

var _seed2 = _interopRequireDefault(_seed);

var _gulpfile = require("../gulpfile.config");

var _gulpfile2 = _interopRequireDefault(_gulpfile);

var _routes = require("./routes/");

var _routes2 = _interopRequireDefault(_routes);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportStrategy = require("./auth/dev/passportStrategy");

var _passportStrategy2 = _interopRequireDefault(_passportStrategy);

var _serializeUser = require("./auth/serializeUser");

var _serializeUser2 = _interopRequireDefault(_serializeUser);

var _deserializeUser = require("./auth/deserializeUser");

var _deserializeUser2 = _interopRequireDefault(_deserializeUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var expressSession = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(expressSession.Store);

var cookieParser = require("cookie-parser");

var BASE_URL = _gulpfile2.default.baseUrl;
var PORT = _gulpfile2.default.isDev ? process.env.PORT || 3000 : process.env.PORT || 80;
var serve = exports.serve = function serve() {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var sequelizeStore, app, server;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        sequelizeStore = null;
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _start2.default)();

                    case 4:
                        _context.next = 6;
                        return (0, _seed2.default)();

                    case 6:
                        sequelizeStore = new SequelizeStore({
                            db: _start.sequelize
                        });
                        _context.next = 9;
                        return sequelizeStore.sync();

                    case 9:
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context["catch"](1);

                        console.error(_context.t0.stack || _context.t0);

                    case 14:
                        ;
                        app = (0, _express2.default)().use(_bodyParser2.default.urlencoded({
                            extended: true
                        })).use(cookieParser()).use(expressSession({
                            secret: "secret",
                            store: sequelizeStore
                        })).use(_bodyParser2.default.json()).use((0, _compression2.default)()).use((0, _morgan2.default)(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time ms"));

                        app.use(_passport2.default.initialize());
                        app.use(_passport2.default.session());
                        _passport2.default.serializeUser(_serializeUser2.default);
                        _passport2.default.deserializeUser(_deserializeUser2.default);
                        app.use(BASE_URL, _express2.default.static(__dirname + "/public"));
                        app.use(BASE_URL, _express2.default.static("" + _gulpfile2.default.distPath));
                        _passport2.default.use(_passportStrategy2.default);
                        app.get("/login", function (req, res) {
                            return res.status(403).send("unauthorized: please login first");
                        });
                        app.use([].concat(process.env.NODE_ENV !== "production" ? [_passport2.default.authenticate("development", {})] : []), _routes2.default);
                        server = app.listen(PORT, "0.0.0.0", function () {
                            var url = "http://" + _os2.default.hostname() + ":" + server.address().port + "/";
                            console.log("Server listening at " + _chalk2.default.green(url));
                        });

                    case 26:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 11]]);
    }));
};
serve();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zZXJ2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sQUFBTyxBQUFNLEFBQVM7Ozs7QUFDdEIsQUFBVSxBQUFNLEFBQWE7Ozs7QUFDN0IsQUFBVyxBQUFNLEFBQWE7Ozs7QUFDOUIsQUFBTSxBQUFNLEFBQVE7Ozs7QUFDcEIsQUFBSyxBQUFNLEFBQU87Ozs7QUFDbEIsQUFBRSxBQUFNLEFBQUk7Ozs7QUFHWixBQUFFLEFBQU8sQUFBSSxBQUFPLEFBQUUsQUFBUyxBQUFDLEFBQU0sQUFBWTs7OztBQUNsRCxBQUFNLEFBQU0sQUFBVzs7OztBQUt2QixBQUFNLEFBQU0sQUFBb0I7Ozs7QUFDaEMsQUFBTSxBQUFNLEFBQVc7Ozs7QUFDdkIsQUFBUSxBQUFNLEFBQVU7Ozs7QUFHeEIsQUFBZSxBQUFNLEFBQTZCOzs7O0FBQ2xELEFBQWEsQUFBTSxBQUFzQjs7OztBQUN6QyxBQUFlLEFBQU0sQUFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFWcEQsSUFBSSxBQUFjLGlCQUFHLEFBQU8sUUFBQyxBQUFpQixBQUFDLEFBQUM7QUFDaEQsSUFBSSxBQUFjLGlCQUFHLEFBQU8sUUFBQyxBQUEyQixBQUFDLDZCQUFDLEFBQWMsZUFBQyxBQUFLLEFBQUMsQUFBQzs7QUFLaEYsSUFBSSxBQUFZLGVBQUcsQUFBTyxRQUFDLEFBQWUsQUFBQyxBQUFDOztBQU01QyxJQUFNLEFBQVEsV0FBRyxBQUFNLG1CQUFDLEFBQU8sQUFBQztBQUNoQyxJQUFNLEFBQUksT0FBRyxBQUFNLG1CQUFDLEFBQUssUUFDdkIsQUFBTyxRQUFDLEFBQUcsSUFBQyxBQUFJLFFBQUksQUFBSSxPQUN4QixBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQUksUUFBSSxBQUFFLEFBQUMsQUFFekI7QUFBTyxJQUFJLEFBQUssd0JBQUc7O0FBRWpCOzs7OztBQUFJLEFBQWMseUNBQUcsQUFBSSxBQUFDLEFBQzFCLEFBQUksQUFBQyxBQUNIOzs7K0JBQU0sQUFBTyxBQUFFLEFBQUMsQUFDaEI7Ozs7K0JBQU0sQUFBTSxBQUFFLEFBQUM7OztBQUNmLEFBQWMsNkNBQU8sQUFBYztBQUNqQyxBQUFFLEFBQUUsQUFBUyxBQUNkLEFBQUMsQUFBQyxBQUNIO0FBSG9DLHlCQUFuQjs7K0JBR1gsQUFBYyxlQUFDLEFBQUksQUFBRSxBQUFDLEFBQzlCLEFBQUUsQUFBSyxBQUFDLEFBQUMsQUFBRyxBQUFDLEFBQUMsQUFBQzs7Ozs7Ozs7OztBQUNiLEFBQU8sZ0NBQUMsQUFBSyxNQUFDLEFBQUcsWUFBQyxBQUFLLEFBQUksQUFBRyxBQUFDLEFBQUMsQUFDbEMsQUFBQzs7O0FBQUEsQUFBQyxBQUVGO0FBQUksQUFBRyx1REFDSixBQUFHLHlCQUFZLEFBQVU7QUFDeEIsQUFBUSxzQ0FBRSxBQUFJLEFBQ2YsQUFBQyxBQUFDO0FBRndCLHlCQUF0QixBQUFVLENBRFAsQUFBTyxBQUFFLEVBSWhCLEFBQUcsSUFBQyxBQUFZLEFBQUUsQUFBQyxnQkFDbkIsQUFBRztBQUNGLEFBQU0sb0NBQUUsQUFBUTtBQUNoQixBQUFLLG1DQUFFLEFBQWMsQUFDdEIsQUFBQyxBQUFDO0FBSGlCLHlCQUFmLEFBQWMsR0FJbEIsQUFBRyxJQUFDLEFBQVUscUJBQUMsQUFBSSxBQUFFLEFBQUMsUUFDdEIsQUFBRyxJQUFDLEFBQVcsQUFBRSxBQUFDLDhCQUNsQixBQUFHLElBQUMsQUFBTSxzQkFBQyxBQUEySixBQUFDLEFBQUMsQUFBQzs7QUFFNUssQUFBRyw0QkFBQyxBQUFHLElBQUMsQUFBUSxtQkFBQyxBQUFVLEFBQUUsQUFBQyxBQUFDO0FBQy9CLEFBQUcsNEJBQUMsQUFBRyxJQUFDLEFBQVEsbUJBQUMsQUFBTyxBQUFFLEFBQUMsQUFBQztBQUM1QixBQUFRLDJDQUFDLEFBQWEsQUFBQyxBQUFhLEFBQUMsQUFBQztBQUN0QyxBQUFRLDJDQUFDLEFBQWUsQUFBQyxBQUFlLEFBQUMsQUFBQztBQUMxQyxBQUFHLDRCQUFDLEFBQUcsSUFBQyxBQUFRLFVBQUUsQUFBTyxrQkFBQyxBQUFNLEFBQUMsT0FBRyxBQUFTLEFBQVMsQUFBQyxBQUFDLEFBQUM7QUFDekQsQUFBRyw0QkFBQyxBQUFHLElBQUMsQUFBUSxVQUFFLEFBQU8sa0JBQUMsQUFBTSxBQUFDLFlBQUcsQUFBTSxtQkFBQyxBQUFRLEFBQUUsQUFBQyxBQUFDLEFBQUM7QUFDeEQsQUFBUSwyQ0FBQyxBQUFHLEFBQUMsQUFBZSxBQUFDLEFBQUM7QUFFOUIsQUFBRyw0QkFBQyxBQUFHLElBQUMsQUFBUSxVQUFFLFVBQUMsQUFBRyxLQUFFLEFBQUc7QUFDekIsQUFBTSxtQ0FBQyxBQUFHLElBQUMsQUFBTSxPQUFDLEFBQUcsQUFBQyxLQUFDLEFBQUksS0FBQyxBQUFrQyxBQUFDLEFBQUMsQUFDbEU7QUFBQyxBQUFDLEFBQUM7QUFFSCxBQUFHLDRCQUFDLEFBQUcsSUFDTCxBQUFFLEdBQUMsQUFBTSxPQUFDLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBUSxhQUFLLEFBQVksZUFBRyxDQUFDLEFBQVEsbUJBQUMsQUFBWSxhQUFDLEFBQWEsZUFBRSxBQUFFLEFBQUMsQUFBQyxPQUFHLEFBQUUsQUFBQyxBQUNsRyxBQUFNLEFBQ1AsQUFBQyxBQUVGO0FBQUksQUFBTSxxQ0FBTyxBQUFNLE9BQUMsQUFBSSxNQUFFLEFBQVMsV0FBRTtBQUN2QyxnQ0FBSSxBQUFHLE1BQUcsQUFBUyxZQUFHLEFBQUUsYUFBQyxBQUFRLEFBQUUsYUFBRyxBQUFHLE1BQUcsQUFBTSxPQUFDLEFBQU8sQUFBRSxVQUFDLEFBQUksT0FBRyxBQUFHLEFBQUM7QUFDeEUsQUFBTyxvQ0FBQyxBQUFHLEFBQUMsNkJBQXVCLEFBQUssZ0JBQUMsQUFBSyxNQUFDLEFBQUcsQUFBQyxBQUFFLEFBQUMsQUFBQyxBQUN6RDtBQUFDLEFBQUMsQUFBQyxBQUNMLEFBQUMseUJBSmMsQUFBRzs7Ozs7Ozs7O0FBSWpCLEFBQUM7QUFFRixBQUFLLEFBQUUsQUFBQyIsImZpbGUiOiJzZXJ2ZXIvc2VydmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSBcImNvbXByZXNzaW9uXCI7XG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCBvcyBmcm9tIFwib3NcIjtcblxuLy8gbG9hZCBkYiBiZWZvcmUgb3RoZXIgaW1wb3J0cywgc28gbW9kZWxzIGNhbiBiZSBsb2FkZWQgaW50byBzZXF1ZWxpemVcbmltcG9ydCB7IGRlZmF1bHQgYXMgc3RhcnREYiwgc2VxdWVsaXplfSBmcm9tIFwiLi9kYi9zdGFydFwiO1xuaW1wb3J0IHNlZWREYiBmcm9tIFwiLi9kYi9zZWVkXCI7XG5cbmxldCBleHByZXNzU2Vzc2lvbiA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7XG5sZXQgU2VxdWVsaXplU3RvcmUgPSByZXF1aXJlKFwiY29ubmVjdC1zZXNzaW9uLXNlcXVlbGl6ZVwiKShleHByZXNzU2Vzc2lvbi5TdG9yZSk7XG5cbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2d1bHBmaWxlLmNvbmZpZ1wiO1xuaW1wb3J0IHJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvXCI7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XG5sZXQgY29va2llUGFyc2VyID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG5cbmltcG9ydCBEZXZBdXRoU3RyYXRlZ3kgZnJvbSBcIi4vYXV0aC9kZXYvcGFzc3BvcnRTdHJhdGVneVwiO1xuaW1wb3J0IHNlcmlhbGl6ZVVzZXIgZnJvbSBcIi4vYXV0aC9zZXJpYWxpemVVc2VyXCI7XG5pbXBvcnQgZGVzZXJpYWxpemVVc2VyIGZyb20gXCIuL2F1dGgvZGVzZXJpYWxpemVVc2VyXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gY29uZmlnLmJhc2VVcmw7XG5jb25zdCBQT1JUID0gY29uZmlnLmlzRGV2ID9cbiAgcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwIDpcbiAgcHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDtcblxuZXhwb3J0IGxldCBzZXJ2ZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuICBsZXQgc2VxdWVsaXplU3RvcmUgPSBudWxsO1xuICB0cnkge1xuICAgIGF3YWl0IHN0YXJ0RGIoKTtcbiAgICBhd2FpdCBzZWVkRGIoKTtcbiAgICBzZXF1ZWxpemVTdG9yZSA9IG5ldyBTZXF1ZWxpemVTdG9yZSh7XG4gICAgICBkYjogc2VxdWVsaXplLFxuICAgIH0pO1xuICAgIGF3YWl0IHNlcXVlbGl6ZVN0b3JlLnN5bmMoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyKTtcbiAgfTtcblxuICBsZXQgYXBwID0gZXhwcmVzcygpXG4gICAgLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgfSkpXG4gICAgLnVzZShjb29raWVQYXJzZXIoKSlcbiAgICAudXNlKGV4cHJlc3NTZXNzaW9uKHtcbiAgICAgIHNlY3JldDogXCJzZWNyZXRcIixcbiAgICAgIHN0b3JlOiBzZXF1ZWxpemVTdG9yZSxcbiAgICB9KSlcbiAgICAudXNlKGJvZHlQYXJzZXIuanNvbigpKVxuICAgIC51c2UoY29tcHJlc3Npb24oKSlcbiAgICAudXNlKG1vcmdhbihcIjpyZW1vdGUtYWRkciAtIDpyZW1vdGUtdXNlciBbOmRhdGVbY2xmXV0gXFxcIjptZXRob2QgOnVybCBIVFRQLzpodHRwLXZlcnNpb25cXFwiIDpzdGF0dXMgOnJlc1tjb250ZW50LWxlbmd0aF0gXFxcIjpyZWZlcnJlclxcXCIgXFxcIjp1c2VyLWFnZW50XFxcIiA6cmVzcG9uc2UtdGltZSBtc1wiKSk7XG5cbiAgYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuICBhcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG4gIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplVXNlcik7XG4gIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVVzZXIpO1xuICBhcHAudXNlKEJBU0VfVVJMLCBleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9L3B1YmxpY2ApKTtcbiAgYXBwLnVzZShCQVNFX1VSTCwgZXhwcmVzcy5zdGF0aWMoYCR7Y29uZmlnLmRpc3RQYXRofWApKTtcbiAgcGFzc3BvcnQudXNlKERldkF1dGhTdHJhdGVneSk7XG5cbiAgYXBwLmdldChcIi9sb2dpblwiLCAocmVxLCByZXMpID0+IHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLnNlbmQoXCJ1bmF1dGhvcml6ZWQ6IHBsZWFzZSBsb2dpbiBmaXJzdFwiKTtcbiAgfSk7XG5cbiAgYXBwLnVzZShcbiAgICBbXS5jb25jYXQocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gW3Bhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImRldmVsb3BtZW50XCIsIHt9KV0gOiBbXSksXG4gICAgcm91dGVzXG4gICk7XG5cbiAgbGV0IHNlcnZlciA9IGFwcC5saXN0ZW4oUE9SVCwgXCIwLjAuMC4wXCIsICgpID0+IHtcbiAgICBsZXQgdXJsID0gXCJodHRwOi8vXCIgKyBvcy5ob3N0bmFtZSgpICsgXCI6XCIgKyBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQgKyBcIi9cIjtcbiAgICBjb25zb2xlLmxvZyhgU2VydmVyIGxpc3RlbmluZyBhdCAke2NoYWxrLmdyZWVuKHVybCl9YCk7XG4gIH0pO1xufTtcblxuc2VydmUoKTtcbiJdfQ==