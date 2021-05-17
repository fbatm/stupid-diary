Function.prototype._bind = function (context) {
  context = Object(context || globalThis);

  const originalFn = this;
  const postArgs = [];
  const outerArguments = arguments;
  for (var i = 1; outerArguments[i]; i++) {
    postArgs.push("outerArguments[" + i + "]");
  }
  function fn() {
    const innerArguments = arguments;
    for (var i = 0; innerArguments[i]; i++) {
      postArgs.push("innerArguments[" + i + "]");
    }

    Object.defineProperty(context, "__fn", {
      configurable: true,
      enumerable: false,
      value: originalFn,
    });
    const result = eval("context.__fn(" + postArgs + ")");
    delete context.__fn;
    return result;
  }
  Object.defineProperty(fn, "name", {
    value: "bound " + originalFn.name,
  });

  return fn;
};

function f() {
  console.log(this, arguments);
}

const bindF = f.bind(1, 2, 3);
console.log(bindF);
bindF(4, 5, 6);
const _bindF = f._bind(1, 2, 3);
console.log(_bindF);
_bindF(4, 5, 6);
