"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _api = require("./api/");

var _api2 = _interopRequireDefault(_api);

var _clientApp = require("./client-app/");

var _clientApp2 = _interopRequireDefault(_clientApp);

var _proxy = require("./proxy/");

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router({ mergeParams: true });
router.use("/api", _api2.default);
router.use(_proxy2.default);
router.use(_clientApp2.default);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxBQUFPLEFBQU0sQUFBUzs7OztBQUV0QixBQUFTLEFBQU0sQUFBUTs7OztBQUN2QixBQUFlLEFBQU0sQUFBZTs7OztBQUNwQyxBQUFXLEFBQU0sQUFBVSxBQUVsQzs7Ozs7O0FBQU8sSUFBSSxBQUFNLDBCQUFHLEFBQU8sa0JBQUMsQUFBTSxPQUFDLEVBQUUsQUFBVyxhQUFFLEFBQUksQUFBRSxBQUFDLEFBQUM7QUFFMUQsQUFBTSxPQUFDLEFBQUcsSUFBQyxBQUFNLEFBQUUsQUFBUyxBQUFDLEFBQUM7QUFDOUIsQUFBTSxPQUFDLEFBQUcsQUFBQyxBQUFXLEFBQUMsQUFBQztBQUN4QixBQUFNLE9BQUMsQUFBRyxBQUFDLEFBQWUsQUFBQyxBQUFDLEFBRTVCO2tCQUFlLEFBQU0sQUFBQyIsImZpbGUiOiJzZXJ2ZXIvcm91dGVzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcblxuaW1wb3J0IGFwaVJvdXRlciBmcm9tIFwiLi9hcGkvXCI7XG5pbXBvcnQgY2xpZW50QXBwUm91dGVyIGZyb20gXCIuL2NsaWVudC1hcHAvXCI7XG5pbXBvcnQgcHJveHlSb3V0ZXIgZnJvbSBcIi4vcHJveHkvXCI7XG5cbmV4cG9ydCBsZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoeyBtZXJnZVBhcmFtczogdHJ1ZSB9KTtcblxucm91dGVyLnVzZShcIi9hcGlcIiwgYXBpUm91dGVyKTtcbnJvdXRlci51c2UocHJveHlSb3V0ZXIpO1xucm91dGVyLnVzZShjbGllbnRBcHBSb3V0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=