"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateNewState = exports.shouldSeedDb = exports.generatedNewState = exports.stateFile = exports.initialState = undefined;

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _gulpfile = require("../../gulpfile.config");

var _gulpfile2 = _interopRequireDefault(_gulpfile);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _start = require("./start");

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
var initialState = exports.initialState = undefined;
var stateDir = _gulpfile2.default.tmpPath + "/state/";
_mkdirp2.default.sync(stateDir);
var stateFile = exports.stateFile = "" + stateDir + (0, _moment2.default)().endOf("day").format("YYYY-MM-DD") + ".json";
var generatedNewState = exports.generatedNewState = false;
try {
    _fs2.default.statSync(stateFile);
    // state file exists - load it
    exports.initialState = initialState = JSON.parse(_fs2.default.readFileSync(stateFile).toString());
} catch (e) {
    // no state exists - create it
    exports.initialState = initialState = require("../../client/js/src/store/sample/").default;
    _fs2.default.writeFileSync(stateFile, JSON.stringify(initialState, null, 2));
    exports.generatedNewState = generatedNewState = true;
}
var shouldSeedDb = exports.shouldSeedDb = function shouldSeedDb() {
    return generatedNewState;
};
var generateNewState = exports.generateNewState = function generateNewState() {
    return require("../../client/js/src/store/sample/default").default();
};

exports.default = function () {
    return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var forceSyncTables;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (shouldSeedDb()) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt("return");

                    case 2:
                        console.time("SEED DB");
                        forceSyncTables = process.env.NODE_ENV === "development" ? true : false;
                        _context.prev = 4;
                        _context.next = 7;
                        return _start.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });

                    case 7:
                        _context.next = 9;
                        return _start.sequelize.sync({ force: forceSyncTables });

                    case 9:
                        _context.next = 11;
                        return _start.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });

                    case 11:
                        if (process.env.NODE_ENV !== "production") {}
                        _context.next = 17;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](4);

                        console.error(_chalk2.default.red(_context.t0.stack || _context.t0));

                    case 17:
                        console.timeEnd("SEED DB");

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 14]]);
    }));
};
//# sourceMappingURL=data:application/json;base64,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QUFBTyxRQUFDLEFBQVMsQUFBQyxBQUFDLEFBQzdCLEFBQUMsQUFBQyIsImZpbGUiOiJzZXJ2ZXIvZGIvc2VlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBta2RpcnAgZnJvbSBcIm1rZGlycFwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vZ3VscGZpbGUuY29uZmlnXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB1dWlkIGZyb20gXCJub2RlLXV1aWRcIjtcbmltcG9ydCB7IHNlcXVlbGl6ZSB9IGZyb20gXCIuL3N0YXJ0XCI7XG5cbmltcG9ydCBVc2VyIGZyb20gXCIuL21vZGVscy91c2VyXCI7XG5cbmV4cG9ydCBsZXQgaW5pdGlhbFN0YXRlOiBhbnkgPSB1bmRlZmluZWQ7XG5cbmxldCBzdGF0ZURpciA9IGAke2NvbmZpZy50bXBQYXRofS9zdGF0ZS9gO1xubWtkaXJwLnN5bmMoc3RhdGVEaXIpO1xuZXhwb3J0IGxldCBzdGF0ZUZpbGUgPSBgJHtzdGF0ZURpcn0ke21vbWVudCgpLmVuZE9mKFwiZGF5XCIpLmZvcm1hdChcIllZWVktTU0tRERcIil9Lmpzb25gO1xuZXhwb3J0IGxldCBnZW5lcmF0ZWROZXdTdGF0ZSA9IGZhbHNlO1xuXG50cnkge1xuICBmcy5zdGF0U3luYyhzdGF0ZUZpbGUpO1xuICAvLyBzdGF0ZSBmaWxlIGV4aXN0cyAtIGxvYWQgaXRcbiAgaW5pdGlhbFN0YXRlID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoc3RhdGVGaWxlKS50b1N0cmluZygpKTtcbn0gY2F0Y2ggKGUpIHtcbiAgLy8gbm8gc3RhdGUgZXhpc3RzIC0gY3JlYXRlIGl0XG4gIGluaXRpYWxTdGF0ZSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvanMvc3JjL3N0b3JlL3NhbXBsZS9cIikuZGVmYXVsdDtcbiAgZnMud3JpdGVGaWxlU3luYyhzdGF0ZUZpbGUsIEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSwgbnVsbCwgMikpO1xuICBnZW5lcmF0ZWROZXdTdGF0ZSA9IHRydWU7XG59XG5cbmV4cG9ydCBsZXQgc2hvdWxkU2VlZERiID0gKCkgPT4gZ2VuZXJhdGVkTmV3U3RhdGU7XG5cbmV4cG9ydCBsZXQgZ2VuZXJhdGVOZXdTdGF0ZSA9ICgpID0+IHtcbiAgcmV0dXJuIHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvanMvc3JjL3N0b3JlL3NhbXBsZS9kZWZhdWx0XCIpLmRlZmF1bHQoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcbiAgaWYgKCFzaG91bGRTZWVkRGIoKSkgcmV0dXJuO1xuXG4gIGNvbnNvbGUudGltZShcIlNFRUQgREJcIik7XG5cbiAgbGV0IGZvcmNlU3luY1RhYmxlcyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyB0cnVlIDogZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBzZXF1ZWxpemUucXVlcnkoXCJTRVQgRk9SRUlHTl9LRVlfQ0hFQ0tTID0gMFwiLCB7IHJhdzogdHJ1ZSB9KTtcbiAgICBhd2FpdCBzZXF1ZWxpemUuc3luYyh7IGZvcmNlOiBmb3JjZVN5bmNUYWJsZXMgfSk7XG4gICAgYXdhaXQgc2VxdWVsaXplLnF1ZXJ5KFwiU0VUIEZPUkVJR05fS0VZX0NIRUNLUyA9IDFcIiwge3JhdzogdHJ1ZX0pO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIC8vIGFkZCBzZWVkIGRhdGEgaGVyZVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGUuc3RhY2sgfHwgZSkpO1xuICB9XG5cbiAgY29uc29sZS50aW1lRW5kKFwiU0VFRCBEQlwiKTtcbn07XG4iXX0=