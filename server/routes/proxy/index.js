"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router({ mergeParams: true });
if (process.env.NODE_ENV === "development") {
    try {
        router.use(require("./webpack/").default);
    } catch (err) {
        console.error(err.stack || err);
    }
}
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9yb3V0ZXMvcHJveHkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLEFBQU8sQUFBTSxBQUFTLEFBRzdCOzs7Ozs7QUFBTyxJQUFJLEFBQU0sMEJBQUcsQUFBTyxrQkFBQyxBQUFNLE9BQUMsRUFBRSxBQUFXLGFBQUUsQUFBSSxBQUFFLEFBQUMsQUFBQztBQUUxRCxBQUFFLEFBQUMsSUFBQyxBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQVEsYUFBSyxBQUFhLEFBQUMsZUFBQyxBQUFDO0FBQzNDLFFBQUksQUFBQztBQUFDLEFBQU0sZUFBQyxBQUFHLElBQUMsQUFBTyxRQUFDLEFBQVksQUFBQyxjQUFDLEFBQU8sQUFBQyxBQUFDLEFBQUM7QUFBRSxNQUFBLEFBQUssQUFBQyxPQUFDLEFBQUcsQUFBQyxLQUFDLEFBQUM7QUFBQyxBQUFPLGdCQUFDLEFBQUssTUFBQyxBQUFHLElBQUMsQUFBSyxTQUFJLEFBQUcsQUFBQyxBQUFDLEFBQUM7QUFBQyxBQUNyRztBQUFDLEFBRUQ7a0JBQWUsQUFBTSxBQUFDIiwiZmlsZSI6InNlcnZlci9yb3V0ZXMvcHJveHkvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5leHBvcnQgbGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKHsgbWVyZ2VQYXJhbXM6IHRydWUgfSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gIHRyeSB7IHJvdXRlci51c2UocmVxdWlyZShcIi4vd2VicGFjay9cIikuZGVmYXVsdCk7IH0gY2F0Y2ggKGVycikgeyBjb25zb2xlLmVycm9yKGVyci5zdGFjayB8fCBlcnIpOyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==