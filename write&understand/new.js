function factory(factor){
  const instanceObj = Object.create(factor.prototype);
  const argumentArray = Array.prototype.slice.call(arguments);
  factor.apply(instanceObj, argumentArray.slice(1));
  return instanceObj;
}

function __new(fn){
  const instanceObj = Object.create(fn.prototype);
  const argumentArray = Array.prototype.slice.call(arguments);
  const fnResult = fn.apply(instanceObj, argumentArray.slice(1));
  return fnResult instanceof Object ? fnResult : instanceObj;
}