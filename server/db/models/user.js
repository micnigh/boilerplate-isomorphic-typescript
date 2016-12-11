"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _start = require("../start");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import uuid from "node-uuid";
var User = _start.sequelize.define("user", {
    guid: {
        type: _sequelize2.default.UUID,
        allowNull: false,
        unique: true
    },
    name: _sequelize2.default.STRING,
    displayName: _sequelize2.default.STRING
}, {
    freezeTableName: true
});
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9kYi9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxBQUFTLEFBQU0sQUFBVzs7OztBQUMxQixBQUFFLEFBQVMsQUFBRSxBQUFNLEFBQVU7Ozs7QUFDcEMsQUFBZ0M7QUFFaEMsSUFBSSxBQUFJLHdCQUFhLEFBQU0sT0FBQyxBQUFNO0FBQ2hDLEFBQUk7QUFDRixBQUFJLGNBQUUsQUFBUyxvQkFBQyxBQUFJO0FBQ3BCLEFBQVMsbUJBQUUsQUFBSztBQUNoQixBQUFNLGdCQUFFLEFBQUksQUFDYjtBQUpLO0FBS04sQUFBSSxVQUFFLEFBQVMsb0JBQUMsQUFBTTtBQUN0QixBQUFXLGlCQUFFLEFBQVMsb0JBQUMsQUFBTSxBQUM5QjtBQVJtQyxDQUF6QixBQUFTO0FBVWxCLEFBQWUscUJBQUUsQUFBSSxBQUN0QixBQUFDLEFBQUMsQUFFSDtBQUpBO2tCQUllLEFBQUksQUFBQyIsImZpbGUiOiJzZXJ2ZXIvZGIvbW9kZWxzL3VzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VxdWVsaXplIGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCB7IHNlcXVlbGl6ZSB9IGZyb20gXCIuLi9zdGFydFwiO1xuLy8gaW1wb3J0IHV1aWQgZnJvbSBcIm5vZGUtdXVpZFwiO1xuXG5sZXQgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXCJ1c2VyXCIsIHtcbiAgZ3VpZDoge1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgdW5pcXVlOiB0cnVlLFxuICB9LFxuICBuYW1lOiBTZXF1ZWxpemUuU1RSSU5HLFxuICBkaXNwbGF5TmFtZTogU2VxdWVsaXplLlNUUklORyxcbn0sXG57XG4gIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSwgLy8gTW9kZWwgdGFibGVOYW1lIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIG1vZGVsIG5hbWUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdfQ==