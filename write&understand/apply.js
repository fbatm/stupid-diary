Function.prototype._apply = function (context, args = []) {
  context = Object(context || globalThis);
  Object.defineProperty(context, "__fn", {
    configurable: true,
    enumerable: false,
    value: this,
  });
  const postArgs = [];
  for (var i = 0; args[i]; i++) {
    postArgs.push("args[" + i + "]");
  }

  var result = eval("context.__fn(" + postArgs + ")");
  delete context.__fn;
  return result;
};

function f() {
  console.log(this, arguments);
}
console.log(f.apply(1, [2, 3]));
console.log(f._apply(1, [2, 3]));
console.log(f.apply(1));
console.log(f._apply(1));
