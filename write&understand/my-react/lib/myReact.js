"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// 构造render所需数据结构
function createElement(type, props, ...children) {
  return {
    type,
    props: { ...props,
      children
    }
  };
} // 渲染dom


function render(reactElement, container) {
  const domNode = typeof reactElement === "object" ? typeof reactElement.type === "object" ? render(reactElement.type, container) : document.createElement(reactElement.type) : document.createTextNode(reactElement);

  if (typeof reactElement === "object") {
    Object.keys(reactElement.props).forEach(propsKey => {
      if (propsKey !== "children") {
        domNode[propsKey] = reactElement.props[propsKey];
      }
    });
    reactElement.props.children.forEach(child => render(child, domNode));
  }

  container.appendChild(domNode);
  return domNode;
}

var _default = {
  createElement,
  render
};
exports.default = _default;