function _create(proto){
  function F(){}
  F.prototype = proto;
  reutrn new F();
}

function _create_without_new(proto){
  const obj = {};
  obj.__proto__ = proto;
  return obj;
}