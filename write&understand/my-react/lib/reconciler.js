"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reconcileChildren = reconcileChildren;

var _shared = require("./shared");

function reconcileChildren(wipFiber, children) {
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let previousSibling = null;
  let index = 0;

  while (index < children.length || oldFiber) {
    const child = children[index];
    let newFiber = null;
    const isSameType = oldFiber && child && child.type === oldFiber.type;

    if (isSameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    } else {
      if (child) {
        newFiber = {
          type: child.type,
          props: child.props,
          parent: wipFiber,
          effectTag: "PLACEMENT"
        };
      }

      if (oldFiber) {
        oldFiber.effectTag = "DELETE";

        _shared.fibers_to_delete.push(oldFiber);
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (newFiber) {
      previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
    index++;
  }
}