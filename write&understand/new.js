function factory(factor){
  const instanceObj = Object.create(factor.prototype);
  const argumentArray = Array.prototype.slice.call(arguments);
  factor.apply(instanceObj, argumentArray.slice(1));
  return instanceObj;
}

function _new(fn){
  const instanceObj = Object.create(fn.prototype);
  const argumentArray = Array.prototype.slice.call(arguments);
  const fnResult = fn.apply(instanceObj, argumentArray.slice(1));
  return fnResult instanceof Object ? fnResult : instanceObj;
}

function _new_without_Object_create(factor){
  return function(){
    const obj = {};
    obj.__proto__ = factor.prototype;
    const result = factor.apply(obj, Array.prototype.slice.call(arguments));
    return result instanceof Object ? result : obj;
  }
}