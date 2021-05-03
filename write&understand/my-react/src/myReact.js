import { startWork } from "./scheduler";
// 构造render所需数据结构
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object"
          ? child
          : {
              type: "TEXT_ELEMENT",
              props: {
                nodeValue: child,
                children: [],
              },
            }
      ),
    },
  };
}

// 渲染dom
function render(reactElement, container) {
  startWork({
    dom: container,
    props: {
      children: [reactElement],
    },
  });
}

export default { createElement, render };
export * from "./BaseClassComponent";
export * from "./useState";
