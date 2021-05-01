import { fibers_to_delete } from "./shared";
import { reconcileChildren } from "./reconciler";

let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

function commitRoot() {
  fibers_to_delete.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  if (fiber.dom) {
    switch (fiber.effectTag) {
      case "DELETE":
        domParentFiber.dom.removeChild(fiber.dom);
        return;
      case "PLACEMENT":
        domParentFiber.dom.appendChild(fiber.dom);
        break;
      case "UPDATE":
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
        break;
    }
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateDom(domNode, previousProps, nextProps) {
  const deletedProps = [];

  Object.keys(previousProps).forEach((key) => {
    if (key !== "children") {
      if (key.startsWith("on")) {
        domNode.removeEventListener(
          key.substring(2).toLocaleLowerCase(),
          previousProps[key]
        );
      } else {
        if (!(key in nextProps)) {
          domNode.removeAttribute(key === "className" ? "class" : key);
        }
      }
    }
  });

  Object.keys(nextProps).forEach((key) => {
    if (key !== "children") {
      if (key.startsWith("on")) {
        domNode.addEventListener(
          key.substring(2).toLocaleLowerCase(),
          nextProps[key]
        );
      } else {
        domNode[key] = nextProps[key];
      }
    }
  });
}

function createDomNode(fiber) {
  const domNode =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(domNode, {}, fiber.props);

  return domNode;
}

// 任务分片的单位即为fiber
function performUnitOfWork(fiber) {
  if (typeof fiber.type === "object") {
    reconcileChildren(fiber, [fiber.type]);
  } else {
    reconcileChildren(fiber, fiber.props.children);
    if (!fiber.dom) {
      fiber.dom = createDomNode(fiber);
    }
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function workloop(idleDeadline) {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    if (idleDeadline.timeRemaining() < 10) {
      break;
    }
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  window.requestIdleCallback(workloop);
}

export function startWork(fiberRoot) {
  wipRoot = nextUnitOfWork = fiberRoot;
  wipRoot.alternate = currentRoot;
  fibers_to_delete.length = 0;
  window.requestIdleCallback(workloop);
}
