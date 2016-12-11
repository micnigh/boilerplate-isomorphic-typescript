"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializeUser = undefined;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serializeUser = exports.serializeUser = function serializeUser(req, user, done) {
    console.log(_chalk2.default.bgBlue("passport serializeUser"), JSON.stringify(user, null, 2));
    // console.log(chalk.bgBlue("passport serializeUser"), req.session);
    done(null, user);
};
exports.default = serializeUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9hdXRoL3NlcmlhbGl6ZVVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLEFBQUssQUFBTSxBQUFPLEFBRXpCOzs7Ozs7QUFBTyxJQUFJLEFBQWEsd0NBQUcsdUJBQUMsQUFBRyxLQUFFLEFBQUksTUFBRSxBQUFJO0FBQ3pDLEFBQU8sWUFBQyxBQUFHLElBQUMsQUFBSyxnQkFBQyxBQUFNLE9BQUMsQUFBd0IsQUFBQywyQkFBRSxBQUFJLEtBQUMsQUFBUyxVQUFDLEFBQUksTUFBRSxBQUFJLE1BQUUsQUFBQyxBQUFDLEFBQUMsQUFBQztBQUNuRixBQUFvRTtBQUNwRSxBQUFJLFNBQUMsQUFBSSxNQUFFLEFBQUksQUFBQyxBQUFDLEFBQ25CO0FBQUMsQUFBQyxBQUVGO2tCQUFlLEFBQWEsQUFBQyIsImZpbGUiOiJzZXJ2ZXIvYXV0aC9zZXJpYWxpemVVc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5leHBvcnQgbGV0IHNlcmlhbGl6ZVVzZXIgPSAocmVxLCB1c2VyLCBkb25lKSA9PiB7XG4gIGNvbnNvbGUubG9nKGNoYWxrLmJnQmx1ZShcInBhc3Nwb3J0IHNlcmlhbGl6ZVVzZXJcIiksIEpTT04uc3RyaW5naWZ5KHVzZXIsIG51bGwsIDIpKTtcbiAgLy8gY29uc29sZS5sb2coY2hhbGsuYmdCbHVlKFwicGFzc3BvcnQgc2VyaWFsaXplVXNlclwiKSwgcmVxLnNlc3Npb24pO1xuICBkb25lKG51bGwsIHVzZXIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplVXNlcjtcbiJdfQ==