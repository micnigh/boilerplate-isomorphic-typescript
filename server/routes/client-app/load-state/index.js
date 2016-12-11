"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadState = undefined;

var _gulpfile = require("../../../../gulpfile.config");

var _gulpfile2 = _interopRequireDefault(_gulpfile);

var _db = require("./db");

var _file = require("./file");

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

var initialState = undefined;
var loadState = exports.loadState = function loadState(user) {
    return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var _require, connectedToDB, _require2, stateFile;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        if (!(_gulpfile2.default.isDev || process.env.NODE_ENV === "staging")) {
                            _context.next = 17;
                            break;
                        }

                        _require = require("../../../db/start"), connectedToDB = _require.connectedToDB;

                        if (!connectedToDB) {
                            _context.next = 10;
                            break;
                        }

                        console.log("DB Started - creating state from DB");
                        _context.next = 7;
                        return (0, _db.loadStateFromDb)(user);

                    case 7:
                        initialState = _context.sent;
                        _context.next = 15;
                        break;

                    case 10:
                        _require2 = require("../../../db/seed"), stateFile = _require2.stateFile;

                        console.log("DB Not Started - creating state from file " + stateFile);
                        _context.next = 14;
                        return (0, _file.loadStateFromFile)(user);

                    case 14:
                        initialState = _context.sent;

                    case 15:
                        _context.next = 26;
                        break;

                    case 17:
                        if (!(process.env.NODE_ENV === "staging")) {
                            _context.next = 23;
                            break;
                        }

                        _context.next = 20;
                        return (0, _file.loadStateFromFile)(user);

                    case 20:
                        initialState = _context.sent;
                        _context.next = 26;
                        break;

                    case 23:
                        _context.next = 25;
                        return (0, _db.loadStateFromDb)(user);

                    case 25:
                        initialState = _context.sent;

                    case 26:
                        _context.next = 32;
                        break;

                    case 28:
                        _context.prev = 28;
                        _context.t0 = _context["catch"](0);

                        console.error("Failed to load initial state");
                        console.error(_context.t0.stack || _context.t0);

                    case 32:
                        return _context.abrupt("return", initialState);

                    case 33:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 28]]);
    }));
};
exports.default = loadState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sQUFBTSxBQUFNLEFBQTZCOzs7O0FBRXpDLEFBQUUsQUFBZSxBQUFFLEFBQU0sQUFBTTs7QUFDL0IsQUFBRSxBQUFpQixBQUFFLEFBQU0sQUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFMUMsSUFBSSxBQUFZLGVBQUcsQUFBUyxBQUFDLEFBRTdCO0FBQU8sSUFBSSxBQUFTLG1EQUFVLEFBQVM7QUFBaEI7QUFDckIsQUFBSSxBQUFDLEFBQ0gsQUFBRSxBQUFDOzs7Ozs7Ozs4QkFBQyxBQUFNLG1CQUFDLEFBQUssU0FBSSxBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQVEsYUFBSyxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ3ZELEFBQUk7Ozs7O21DQUFvQixBQUFPLFFBQUMsQUFBbUIsQUFBQyxBQUFDLEFBQ3JELEFBQUUsQUFBQyxzQkFERyxBQUFhLEFBQUU7OzZCQUNqQixBQUFhLEFBQUMsQUFBQyxBQUFDOzs7OztBQUNsQixBQUFPLGdDQUFDLEFBQUcsQUFBQyxBQUFxQyxBQUFDLEFBQUM7OytCQUM5QixBQUFlLHlCQUFDLEFBQUksQUFBQyxBQUFDLEFBQzdDLEFBQUMsQUFBQyxBQUFJLEFBQUMsQUFBQyxBQUNOLEFBQUk7OztBQUZKLEFBQVksQUFBRzs7Ozs7b0NBRUssQUFBTyxRQUFDLEFBQWtCLEFBQUMsQUFBQyxxQkFBMUMsQUFBUyxBQUFFOztBQUNqQixBQUFPLGdDQUFDLEFBQUcsQUFBQyxtREFBNkMsQUFBUyxBQUFFLEFBQUMsQUFBQzs7K0JBQ2pELEFBQWlCLDZCQUFDLEFBQUksQUFBQyxBQUFDLEFBQy9DLEFBQUMsQUFDSCxBQUFDLEFBQUMsQUFBSSxBQUFDLEFBQUMsQUFDTixBQUFxQixBQUNyQixBQUFFLEFBQUM7OztBQUpELEFBQVksQUFBRzs7Ozs7Ozs4QkFJYixBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQVEsYUFBSyxBQUFTLEFBQUMsQUFBQyxBQUFDLEFBQ3ZDLEFBQXFDOzs7Ozs7K0JBQ2hCLEFBQWlCLDZCQUFDLEFBQUksQUFBQyxBQUFDLEFBRS9DLEFBQUMsQUFBQyxBQUFJLEFBQUMsQUFBQzs7O0FBRk4sQUFBWSxBQUFHOzs7Ozs7K0JBR00sQUFBZSx5QkFBQyxBQUFJLEFBQUMsQUFBQyxBQUM3QyxBQUFDLEFBQ0gsQUFBQyxBQUNILEFBQUUsQUFBSyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQzs7O0FBSFAsQUFBWSxBQUFHOzs7Ozs7Ozs7O0FBSW5CLEFBQU8sZ0NBQUMsQUFBSyxNQUFDLEFBQThCLEFBQUMsQUFBQztBQUM5QyxBQUFPLGdDQUFDLEFBQUssTUFBQyxBQUFDLFlBQUMsQUFBSyxBQUFJLEFBQUMsQUFBQyxBQUFDLEFBQzlCLEFBQUMsQUFDRCxBQUFNOzs7eURBQUMsQUFBWSxBQUFDLEFBQ3RCLEFBQUMsQUFBQyxBQUVGOzs7Ozs7Ozs7O2tCQUFlLEFBQVMsQUFBQyIsImZpbGUiOiJzZXJ2ZXIvcm91dGVzL2NsaWVudC1hcHAvbG9hZC1zdGF0ZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uLy4uLy4uL2d1bHBmaWxlLmNvbmZpZ1wiO1xuXG5pbXBvcnQgeyBsb2FkU3RhdGVGcm9tRGIgfSBmcm9tIFwiLi9kYlwiO1xuaW1wb3J0IHsgbG9hZFN0YXRlRnJvbUZpbGUgfSBmcm9tIFwiLi9maWxlXCI7XG5cbmxldCBpbml0aWFsU3RhdGUgPSB1bmRlZmluZWQ7XG5cbmV4cG9ydCBsZXQgbG9hZFN0YXRlID0gYXN5bmMgKHVzZXI6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIGlmIChjb25maWcuaXNEZXYgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwic3RhZ2luZ1wiKSB7XG4gICAgICBsZXQgeyBjb25uZWN0ZWRUb0RCIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vZGIvc3RhcnRcIik7XG4gICAgICBpZiAoY29ubmVjdGVkVG9EQikge1xuICAgICAgICBjb25zb2xlLmxvZyhgREIgU3RhcnRlZCAtIGNyZWF0aW5nIHN0YXRlIGZyb20gREJgKTtcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gYXdhaXQgbG9hZFN0YXRlRnJvbURiKHVzZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHsgc3RhdGVGaWxlIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vZGIvc2VlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYERCIE5vdCBTdGFydGVkIC0gY3JlYXRpbmcgc3RhdGUgZnJvbSBmaWxlICR7c3RhdGVGaWxlfWApO1xuICAgICAgICBpbml0aWFsU3RhdGUgPSBhd2FpdCBsb2FkU3RhdGVGcm9tRmlsZSh1c2VyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RhZ2luZy9wcm9kdWN0aW9uXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwic3RhZ2luZ1wiKSB7XG4gICAgICAgIC8vIGRpc2FibGUgZGIgaW4gc3RhZ2luZyB1bnRpbCBzdGFibGVcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gYXdhaXQgbG9hZFN0YXRlRnJvbUZpbGUodXNlcik7XG4gICAgICAgIC8vIGluaXRpYWxTdGF0ZSA9IGxvYWRTdGF0ZUZyb21EYih1c2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxTdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZUZyb21EYih1c2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgaW5pdGlhbCBzdGF0ZVwiKTtcbiAgICBjb25zb2xlLmVycm9yKGUuc3RhY2sgfHwgZSk7XG4gIH1cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRTdGF0ZTtcbiJdfQ==