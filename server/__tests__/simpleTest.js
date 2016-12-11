"use strict";

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
describe("Can Run Tests", function () {
    it("can run a simple test", function () {
        expect(true).toEqual(true);
    });
    it("can run a simple async/await test", function (done) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var i, deferred;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            i = false;
                            deferred = new Promise(function (resolve) {
                                setTimeout(function () {
                                    return resolve(true);
                                }, 0);
                            });
                            _context.next = 5;
                            return deferred;

                        case 5:
                            i = _context.sent;

                            expect(i).toEqual(true);
                            _context.next = 12;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context["catch"](0);

                            fail(_context.t0);

                        case 12:
                            _context.prev = 12;

                            done();
                            return _context.finish(12);

                        case 15:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 9, 12, 15]]);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci90ZXN0L3NpbXBsZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFRLFNBQUMsQUFBZSxpQkFBRTtBQUN4QixBQUFFLE9BQUMsQUFBdUIseUJBQUU7QUFDMUIsQUFBTSxlQUFDLEFBQUksQUFBQyxNQUFDLEFBQU8sUUFBQyxBQUFJLEFBQUMsQUFBQyxBQUM3QjtBQUFDLEFBQUMsQUFBQztBQUVILEFBQUUsT0FBQyxBQUFtQyxxQ0FBRSxVQUFnQixBQUFJOztBQUMxRCxBQUFJLEFBQUMsQUFDSDs7Ozs7O0FBQUksQUFBQyxnQ0FBRyxBQUFLLEFBQUMsQUFDZDtBQUFJLEFBQVEsMkNBQU8sQUFBTyxRQUFVLFVBQUMsQUFBTztBQUMxQyxBQUFVO0FBQUMsMkNBQU0sQUFBTyxRQUFDLEFBQUksQUFBQzttQ0FBRSxBQUFDLEFBQUMsQUFBQyxBQUNyQztBQUFDLEFBQUMsQUFBQyw2QkFGWTs7bUNBR0wsQUFBUSxBQUFDOzs7QUFBbkIsQUFBQyxBQUFHOztBQUNKLEFBQU0sbUNBQUMsQUFBQyxBQUFDLEdBQUMsQUFBTyxRQUFDLEFBQUksQUFBQyxBQUFDLEFBQzFCLEFBQUUsQUFBSyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQzs7Ozs7Ozs7QUFDWCxBQUFJLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFDVixBQUFDLEFBQVMsQUFBQzs7Ozs7QUFDVCxBQUFJLEFBQUUsQUFBQyxBQUNULEFBQUMsQUFDSCxBQUFDOzs7Ozs7Ozs7O0FBQUEsQUFBQyxBQUFDLEFBQ0w7QUFBQyxBQUFDLEFBQUMiLCJmaWxlIjoic2VydmVyL3Rlc3Qvc2ltcGxlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlc2NyaWJlKFwiQ2FuIFJ1biBUZXN0c1wiLCBmdW5jdGlvbiAoKSB7XG4gIGl0KFwiY2FuIHJ1biBhIHNpbXBsZSB0ZXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICBleHBlY3QodHJ1ZSkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoXCJjYW4gcnVuIGEgc2ltcGxlIGFzeW5jL2F3YWl0IHRlc3RcIiwgYXN5bmMgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGkgPSBmYWxzZTtcbiAgICAgIGxldCBkZWZlcnJlZCA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSh0cnVlKSwgMCk7XG4gICAgICB9KTtcbiAgICAgIGkgPSBhd2FpdCBkZWZlcnJlZDtcbiAgICAgIGV4cGVjdChpKS50b0VxdWFsKHRydWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGZhaWwoZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iXX0=