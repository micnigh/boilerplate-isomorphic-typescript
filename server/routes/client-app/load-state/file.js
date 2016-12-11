"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
var loadStateFromFile = exports.loadStateFromFile = function loadStateFromFile(user) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var initialState;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        initialState = require("../../../db/seed").initialState;
                        return _context.abrupt("return", initialState);

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
exports.default = loadStateFromFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2ZpbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFPLElBQUksQUFBaUIsZ0RBQUcsMkJBQWdCLEFBQVM7O0FBQ3REOzs7OztBQUFJLEFBQVksdUNBQUcsQUFBTyxRQUFDLEFBQWtCLEFBQUMsb0JBQUMsQUFBWSxBQUFDLEFBQzVELEFBQU07eURBQUMsQUFBWSxBQUFDLEFBQ3RCLEFBQUM7Ozs7Ozs7OztBQUFBLEFBQUMsQUFFRjtrQkFBZSxBQUFpQixBQUFDIiwiZmlsZSI6InNlcnZlci9yb3V0ZXMvY2xpZW50LWFwcC9sb2FkLXN0YXRlL2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbGV0IGxvYWRTdGF0ZUZyb21GaWxlID0gYXN5bmMgZnVuY3Rpb24gKHVzZXI6IGFueSkge1xuICBsZXQgaW5pdGlhbFN0YXRlID0gcmVxdWlyZShcIi4uLy4uLy4uL2RiL3NlZWRcIikuaW5pdGlhbFN0YXRlO1xuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN0YXRlRnJvbUZpbGU7XG4iXX0=