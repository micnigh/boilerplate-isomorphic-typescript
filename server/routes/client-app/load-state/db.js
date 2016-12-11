"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadStateFromDb = undefined;

var _start = require("../../../db/start");

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
var loadStateFromDb = exports.loadStateFromDb = function loadStateFromDb(user) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var initialState, transaction;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        initialState = {
                            entities: {}
                        };
                        _context.next = 3;
                        return _start.sequelize.transaction();

                    case 3:
                        transaction = _context.sent;
                        _context.prev = 4;
                        _context.next = 12;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](4);
                        _context.next = 11;
                        return transaction.rollback();

                    case 11:
                        console.error(_context.t0.stack || _context.t0);

                    case 12:
                        _context.next = 14;
                        return transaction.commit();

                    case 14:
                        return _context.abrupt("return", initialState);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 7]]);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2RiLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ08sQUFBRSxBQUFTLEFBQUUsQUFBTSxBQUFtQixBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFJLEFBQWUsNENBQUcseUJBQWdCLEFBQVM7O0FBQ3BEOzs7OztBQUFJLEFBQVk7QUFDZCxBQUFRLHNDQUFFLEFBQUUsQUFDYixBQUFDLEFBRUY7QUFKbUI7OytCQUlLLEFBQVMsaUJBQUMsQUFBVyxBQUFFLEFBQUMsQUFFaEQsQUFBSSxBQUFDLEFBR0wsQUFBRSxBQUFLLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQ1g7OztBQU5FLEFBQVcsQUFBRzs7Ozs7Ozs7OytCQU1WLEFBQVcsWUFBQyxBQUFRLEFBQUUsQUFBQzs7O0FBQzdCLEFBQU8sZ0NBQUMsQUFBSyxNQUFDLEFBQUMsWUFBQyxBQUFLLEFBQUksQUFBQyxBQUFDLEFBQUMsQUFDOUIsQUFBQyxBQUVEOzs7OytCQUFNLEFBQVcsWUFBQyxBQUFNLEFBQUUsQUFBQyxBQUUzQixBQUFNOzs7eURBQUMsQUFBWSxBQUFDLEFBQ3RCLEFBQUM7Ozs7Ozs7OztBQUFBLEFBQUMiLCJmaWxlIjoic2VydmVyL3JvdXRlcy9jbGllbnQtYXBwL2xvYWQtc3RhdGUvZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IHNlcXVlbGl6ZSB9IGZyb20gXCIuLi8uLi8uLi9kYi9zdGFydFwiO1xuXG5leHBvcnQgbGV0IGxvYWRTdGF0ZUZyb21EYiA9IGFzeW5jIGZ1bmN0aW9uICh1c2VyOiBhbnkpIHtcbiAgbGV0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlbnRpdGllczoge30sXG4gIH07XG5cbiAgbGV0IHRyYW5zYWN0aW9uID0gYXdhaXQgc2VxdWVsaXplLnRyYW5zYWN0aW9uKCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBsb2FkIHN0YXRlIGZyb20gZGJcbiAgICBcbiAgfSBjYXRjaCAoZSkge1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uLnJvbGxiYWNrKCk7XG4gICAgY29uc29sZS5lcnJvcihlLnN0YWNrIHx8IGUpO1xuICB9XG5cbiAgYXdhaXQgdHJhbnNhY3Rpb24uY29tbWl0KCk7XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn07XG4iXX0=