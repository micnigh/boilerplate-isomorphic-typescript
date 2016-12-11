"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.developmentStrategy = undefined;
exports.DevelopmentStrategy = DevelopmentStrategy;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _passport = require("passport");

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

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
function DevelopmentStrategy() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _passport.Strategy.call(this);
    this.name = "development";
}
;
_util2.default.inherits(DevelopmentStrategy, _passport.Strategy);
DevelopmentStrategy.prototype.authenticate = function (req) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var role, sessionUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!req.user || req.query && req.query.role) {
                            role = req.query.role;

                            role = role ? role.toUpperCase() : "GUEST";
                            sessionUser = {
                                id: 1,
                                guid: _nodeUuid2.default.v4(),
                                name: role.toLowerCase(),
                                displayName: role.toLowerCase(),
                                role: role
                            };

                            console.log(_chalk2.default.bgBlue("Dev Strategy: Logging in as user"), JSON.stringify(sessionUser, null, 2));
                            this.success(sessionUser, {});
                        } else {
                            this.pass();
                        }

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
var developmentStrategy = exports.developmentStrategy = new DevelopmentStrategy({});
exports.default = developmentStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hdXRoL2Rldi9wYXNzcG9ydFN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQU8sQUFBSyxBQUFNLEFBQU87Ozs7QUFDbEIsQUFBSSxBQUFNLEFBQU07Ozs7QUFDaEIsQUFBRSxBQUFRLEFBQUUsQUFBTSxBQUFVOztBQUM1QixBQUFJLEFBQU0sQUFBVyxBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFvQyxBQUFPLDhFQUFRLEFBQUU7O0FBQ25ELEFBQVEsdUJBQUMsQUFBSSxLQUFDLEFBQUksQUFBQyxBQUFDO0FBQ3BCLEFBQUksU0FBQyxBQUFJLE9BQUcsQUFBYSxBQUFDLEFBQzVCO0FBQUM7QUFBQSxBQUFDO0FBRUYsQUFBSSxlQUFDLEFBQVEsU0FBQyxBQUFtQixBQUFFLEFBQVEsQUFBQyxBQUFDO0FBRTdDLEFBQW1CLG9CQUFDLEFBQVMsVUFBQyxBQUFZLGVBQUcsVUFBZ0IsQUFBRztRQUFFLEFBQU8sOEVBQUcsQUFBRTs7Ozs7Ozs7QUFDNUUsQUFBRSxBQUFDLDRCQUFDLENBQUMsQUFBRyxJQUFDLEFBQUksQUFBSSxRQUFDLEFBQUcsSUFBQyxBQUFLLFNBQUksQUFBRyxJQUFDLEFBQUssTUFBQyxBQUFJLEFBQUMsQUFBQztBQUN2QyxBQUFJLEFBQUUsbUNBQUcsQUFBRyxJQUFDLEFBQUssQUFBQzs7QUFDekIsQUFBSSxtQ0FBRyxBQUFJLE9BQUcsQUFBSSxLQUFDLEFBQVcsQUFBRSxnQkFBRyxBQUFPLEFBQUMsQUFDM0M7QUFBSSxBQUFXO0FBQ2IsQUFBRSxvQ0FBRSxBQUFDO0FBQ0wsQUFBSSxzQ0FBRSxBQUFJLG1CQUFDLEFBQUUsQUFBRTtBQUNmLEFBQUksc0NBQUUsQUFBSSxLQUFDLEFBQVcsQUFBRTtBQUN4QixBQUFXLDZDQUFFLEFBQUksS0FBQyxBQUFXLEFBQUU7QUFDL0IsQUFBSSxBQUNMLEFBQUM7QUFOZ0IsNkJBSDRCLEFBQUMsQUFDL0MsQUFBSTs7QUFTSixBQUFPLG9DQUFDLEFBQUcsSUFBQyxBQUFLLGdCQUFDLEFBQU0sT0FBQyxBQUFrQyxBQUFDLHFDQUFFLEFBQUksS0FBQyxBQUFTLFVBQUMsQUFBVyxhQUFFLEFBQUksTUFBRSxBQUFDLEFBQUMsQUFBQyxBQUFDO0FBQ3BHLEFBQUksaUNBQUMsQUFBTyxRQUFDLEFBQVcsYUFBRSxBQUFFLEFBQUMsQUFBQyxBQUNoQztBQUFDLEFBQUMsQUFBSSwrQkFBQyxBQUFDO0FBQ04sQUFBSSxpQ0FBQyxBQUFJLEFBQUUsQUFBQyxBQUNkO0FBQUMsQUFDSCxBQUFDOzs7Ozs7Ozs7QUFBQSxBQUFDLEFBRUY7QUFBTyxJQUFJLEFBQW1CLG9EQUFHLElBQUksQUFBbUIsb0JBQUMsQUFBRSxBQUFDLEFBQUMsQUFFN0Q7a0JBQWUsQUFBbUIsQUFBQyIsImZpbGUiOiJzZXJ2ZXIvYXV0aC9kZXYvcGFzc3BvcnRTdHJhdGVneS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gXCJwYXNzcG9ydFwiO1xuaW1wb3J0IHV1aWQgZnJvbSBcIm5vZGUtdXVpZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gRGV2ZWxvcG1lbnRTdHJhdGVneShvcHRpb25zOiBhbnkgPSB7fSkge1xuICBTdHJhdGVneS5jYWxsKHRoaXMpO1xuICB0aGlzLm5hbWUgPSBcImRldmVsb3BtZW50XCI7XG59O1xuXG51dGlsLmluaGVyaXRzKERldmVsb3BtZW50U3RyYXRlZ3ksIFN0cmF0ZWd5KTtcblxuRGV2ZWxvcG1lbnRTdHJhdGVneS5wcm90b3R5cGUuYXV0aGVudGljYXRlID0gYXN5bmMgZnVuY3Rpb24gKHJlcSwgb3B0aW9ucyA9IHt9KSB7XG4gIGlmICghcmVxLnVzZXIgfHwgKHJlcS5xdWVyeSAmJiByZXEucXVlcnkucm9sZSkpIHtcbiAgICBsZXQgeyByb2xlIH0gPSByZXEucXVlcnk7XG4gICAgcm9sZSA9IHJvbGUgPyByb2xlLnRvVXBwZXJDYXNlKCkgOiBcIkdVRVNUXCI7XG4gICAgbGV0IHNlc3Npb25Vc2VyID0ge1xuICAgICAgaWQ6IDEsXG4gICAgICBndWlkOiB1dWlkLnY0KCksXG4gICAgICBuYW1lOiByb2xlLnRvTG93ZXJDYXNlKCksXG4gICAgICBkaXNwbGF5TmFtZTogcm9sZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgcm9sZSxcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnQmx1ZShcIkRldiBTdHJhdGVneTogTG9nZ2luZyBpbiBhcyB1c2VyXCIpLCBKU09OLnN0cmluZ2lmeShzZXNzaW9uVXNlciwgbnVsbCwgMikpO1xuICAgIHRoaXMuc3VjY2VzcyhzZXNzaW9uVXNlciwge30pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGFzcygpO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGRldmVsb3BtZW50U3RyYXRlZ3kgPSBuZXcgRGV2ZWxvcG1lbnRTdHJhdGVneSh7fSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRldmVsb3BtZW50U3RyYXRlZ3k7XG4iXX0=