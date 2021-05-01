"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startWork = startWork;
let nextUnitOfWork = null;
let wipRoot = null;

function commitRoot() {
  if (wipRoot.child) {
    commitWork(wipRoot.child);
  }

  wipRoot = null;
}

function commitWork(fiber) {
  fiber.parent.dom.appendChild(fiber.dom);

  if (fiber.child) {
    commitWork(fiber.child);
  }

  if (fiber.sibling) {
    commitWork(fiber.sibling);
  }
}

function createDomNode(fiber) {
  const domNode = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
  Object.keys(fiber.props).forEach(key => {
    if (key !== "children") {
      domNode[key] = fiber.props[key];
    }
  });
  return domNode;
} // 任务分片的单位即为fiber


function performUnitOfWork(fiber) {
  if (typeof fiber.type === 'object') {
    return { ...fiber.type,
      parent: fiber.parent
    };
  }

  if (!fiber.dom) {
    fiber.dom = createDomNode(fiber);
  }

  if (fiber.props.children && fiber.props.children.length) {
    let nextChildFiber = { ...fiber.props.children[0],
      parent: fiber
    };
    fiber.child = nextChildFiber;

    for (let i = 1; fiber.props.children[i]; i++) {
      nextChildFiber.sibling = { ...fiber.props.children[i],
        parent: fiber
      };
      nextChildFiber = nextChildFiber.sibling;
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

function startWork(fiberRoot) {
  wipRoot = nextUnitOfWork = fiberRoot;
  window.requestIdleCallback(workloop);
}