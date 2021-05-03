"use strict";

var _App = _interopRequireDefault(require("./App"));

var _SomeFunctionComponent = _interopRequireDefault(require("./SomeFunctionComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const container = document.querySelector("#root");

const updateValue = e => {
  rerender(e.target.value);
};

const rerender = value => {
  const element = MyReact.createElement("div", null, MyReact.createElement(_App.default, null), MyReact.createElement(_SomeFunctionComponent.default, null), MyReact.createElement("input", {
    onInput: updateValue,
    value: value
  }), MyReact.createElement("h2", null, value));
  MyReact.render(element, container);
};

rerender("");