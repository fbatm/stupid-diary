let nextUnitOfWork = null;

function createDomNode(fiber) {
  const domNode =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  Object.keys(fiber.props).forEach((key) => {
    if (key !== "children") {
      domNode[key] = fiber.props[key];
    }
  });
  return domNode;
}

// 任务分片的单位即为fiber
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDomNode(fiber);
  }
  if(fiber.parent){
    fiber.parent.dom.appendChild(fiber.dom);
  }
  if(fiber.props.children && fiber.props.children.length){
    let nextChildFiber = {
      ...fiber.props.children[0],
      parent: fiber
    }
    fiber.child = nextChildFiber;

    for(let i = 1;fiber.props.children[i];i++){
      nextChildFiber.sibling = {
        ...fiber.props.children[i],
        parent: fiber
      }
      nextChildFiber =  nextChildFiber.sibling;
    }
  }

  if(fiber.child){
    return fiber.child;
  }
  let nextFiber = fiber;
  while(nextFiber){
    if(nextFiber.sibling){
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
  window.requestIdleCallback(workloop);
}

function startWork(fiberRoot) {
  nextUnitOfWork = fiberRoot;
  window.requestIdleCallback(workloop);
}
