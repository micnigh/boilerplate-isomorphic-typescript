"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectedToDB = exports.sequelize = undefined;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

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

var dotenv = require("dotenv").config({ path: "./server/db/" + process.env.NODE_ENV + ".env" });
var MYSQL_USER = dotenv.MYSQL_USER,
    MYSQL_PASSWORD = dotenv.MYSQL_PASSWORD,
    MYSQL_DATABASE = dotenv.MYSQL_DATABASE;
var sequelize = exports.sequelize = new _sequelize2.default(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    benchmark: false
});
var connectedToDB = exports.connectedToDB = false;
var User = require("./models/user").default;

exports.default = function () {
    return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return sequelize.authenticate();

                    case 4:
                        exports.connectedToDB = connectedToDB = true;
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](1);

                        console.log("database unavailable");

                    case 10:
                        _context.next = 12;
                        return sequelize.sync();

                    case 12:
                        _context.next = 17;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t1 = _context["catch"](0);

                        console.error(_chalk2.default.red(_context.t1.stack || _context.t1));

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 14], [1, 7]]);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9kYi9zdGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLEFBQVMsQUFBTSxBQUFXOzs7O0FBRTFCLEFBQUssQUFBTSxBQUFPLEFBR3pCLEFBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKSixJQUFJLEFBQU0sU0FBRyxBQUFPLFFBQUMsQUFBUSxBQUFDLFVBQUMsQUFBTSxPQUFDLEVBQUMsQUFBSSxBQUFFLHVCQUFlLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBUSxBQUFNLEFBQUMsQUFBQyxBQUFDO0lBS3ZGLEFBQVUsYUFHUixBQUFNLEFBQUMsQUFFWDtJQUpFLEFBQWM7SUFDZCxBQUFjLEFBQ2Y7QUFFTSxJQUFJLEFBQVMsd0RBQWlCLEFBQWMsZ0JBQUUsQUFBVSxZQUFFLEFBQWM7QUFDN0UsQUFBSSxVQUFFLEFBQVc7QUFDakIsQUFBTyxhQUFFLEFBQU87QUFDaEIsQUFBTyxhQUFFLEFBQUs7QUFDZCxBQUFTLGVBQUUsQUFBSyxBQUNqQixBQUFDLEFBQUMsQUFFSDtBQVBpRixDQUExRCxBQUFJLEFBQVM7QUFPN0IsSUFBSSxBQUFhLHdDQUFHLEFBQUssQUFBQztBQUVqQyxJQUFJLEFBQUksT0FBRyxBQUFPLFFBQUMsQUFBZSxBQUFDLGlCQUFDLEFBQU8sQUFBQyxBQUU1Qzs7O0FBQWU7QUFDYixBQUFJLEFBQUMsQUFDSCxBQUFJLEFBQUMsQUFBQzs7Ozs7OzsrQkFBTSxBQUFTLFVBQUMsQUFBWSxBQUFFLEFBQUM7OztBQUFDLEFBQWEsZ0VBQUcsQUFBSSxBQUFDLEFBQUMsQUFBRSxBQUFLLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFDOzs7Ozs7OztBQUFrQixBQUFPLGdDQUFDLEFBQUcsSUFBQyxBQUFzQixBQUFDLEFBQUMsQUFBQyxBQUNoSTs7OzsrQkFBTSxBQUFTLFVBQUMsQUFBSSxBQUFFLEFBQUMsQUFDekIsQUFBRSxBQUFLLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFDOzs7Ozs7Ozs7O0FBQ1gsQUFBTyxnQ0FBQyxBQUFLLE1BQUMsQUFBSyxnQkFBQyxBQUFHLElBQUMsQUFBQyxZQUFDLEFBQUssQUFBSSxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQ3pDLEFBQUMsQUFDSCxBQUFDLEFBQUMiLCJmaWxlIjoic2VydmVyL2RiL3N0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcXVlbGl6ZSBmcm9tIFwic2VxdWVsaXplXCI7XG5sZXQgZG90ZW52ID0gcmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoe3BhdGg6IGAuL3NlcnZlci9kYi8ke3Byb2Nlc3MuZW52Lk5PREVfRU5WfS5lbnZgfSk7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9ndWxwZmlsZS5jb25maWdcIjtcblxubGV0IHtcbiAgTVlTUUxfVVNFUixcbiAgTVlTUUxfUEFTU1dPUkQsXG4gIE1ZU1FMX0RBVEFCQVNFLFxufSA9IGRvdGVudjtcblxuZXhwb3J0IGxldCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKE1ZU1FMX0RBVEFCQVNFLCBNWVNRTF9VU0VSLCBNWVNRTF9QQVNTV09SRCwge1xuICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICBkaWFsZWN0OiBcIm15c3FsXCIsXG4gIGxvZ2dpbmc6IGZhbHNlLFxuICBiZW5jaG1hcms6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBsZXQgY29ubmVjdGVkVG9EQiA9IGZhbHNlO1xuXG5sZXQgVXNlciA9IHJlcXVpcmUoXCIuL21vZGVscy91c2VyXCIpLmRlZmF1bHQ7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICB0cnkgeyBhd2FpdCBzZXF1ZWxpemUuYXV0aGVudGljYXRlKCk7IGNvbm5lY3RlZFRvREIgPSB0cnVlOyB9IGNhdGNoIChlKSB7IC8qIGRvIG5vdGhpbmcgKi8gY29uc29sZS5sb2coXCJkYXRhYmFzZSB1bmF2YWlsYWJsZVwiKSB9XG4gICAgYXdhaXQgc2VxdWVsaXplLnN5bmMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGUuc3RhY2sgfHwgZSkpO1xuICB9XG59O1xuIl19