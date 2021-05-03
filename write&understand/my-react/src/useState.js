import { currentRoot, wipFiber, wipHookIndex, startWork } from "./scheduler";

function useState(initialState) {
  let oldHook = wipFiber.alternate?.hooks?.[wipHookIndex];
  const hook = {
    state: oldHook?.state ?? initialState,
  };
  wipFiber.hooks.push(hook);

  function setState(newStateOrAction) {
    hook.state =
      typeof newStateOrAction === "function"
        ? newStateOrAction(hook.state)
        : newStateOrAction;
    startWork({
      dom: currentRoot.dom,
      props: currentRoot.props,
    });
  }

  return [hook.state, setState];
}

export { useState };
