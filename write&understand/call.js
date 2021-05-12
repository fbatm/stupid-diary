Function.prototype._call = function (context, ...args) {
  context = Object(context || globalThis);
  context.targetFn = this;
  const result = context.targetFn(...args);
  delete context.targetFn;
  return result;
};

Function.prototype.__call = function (context) {
  context = Object(context || globalThis);
  context.targetFn = this;
  var args = [];
  for (var i = 1; arguments[i]; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.targetFn(" + args + ")");
  delete context.targetFn;
  return result;
};

Function.prototype.___call = function (context) {
  context = Object(context || globalThis);
  Object.defineProperty(context, "__fn", {
    configurable: true,
    enumerable: false,
    get: () => this,
  });
  var args = [];
  for (var i = 1; arguments[i]; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.__fn(" + args + ")");
  delete context.__fn;
  return result;
};

function f() {
  console.log(this, arguments);
}
console.log(f.call(1, 2, 3));
console.log(f._call(1, 2, 3));
console.log(f.__call(1, 2, 3));
console.log(f.___call(1, 2, 3));
