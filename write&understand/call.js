Function.prototype._call = function (context, args) {
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
