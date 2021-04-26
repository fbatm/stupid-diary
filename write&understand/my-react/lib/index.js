"use strict";

var _myReact = _interopRequireDefault(require("./myReact"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_myReact.default.render(_myReact.default.createElement(_App.default, null), document.querySelector('#root'));