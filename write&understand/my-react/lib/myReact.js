"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scheduler = require("./scheduler");

// 构造render所需数据结构
function createElement(type, props, ...children) {
  return {
    type,
    props: { ...props,
      children: children.map(child => typeof child === "object" ? child : {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: child,
          children: []
        }
      })
    }
  };
} // 渲染dom


function render(reactElement, container) {
  (0, _scheduler.startWork)({
    dom: container,
    props: {
      children: [reactElement]
    }
  });
}

var _default = {
  createElement,
  render
};
exports.default = _default;