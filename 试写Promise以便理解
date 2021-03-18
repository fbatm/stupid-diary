function Promise(resolver){
  if(typeof resolver !== 'function'){
    throw new TypeError();
  }
  
  resolver(this.resolve, this.reject);

  this.status = 'pending';
  
  this.thenQueue = [];
  this.catchQueue = [];
  return this;
}

Promise.prototype.resolve = function(value){
  if(this.status === 'pending'){
    this.value = value;
    this.thenQueue.forEach(cb => {
      setTimeout(()=>{cb(this.value)}, 0);
    });
    this.status = 'fullfilled';
  }
}

Promise.prototype.reject = function(value){
  if(this.status === 'pending'){
    this.value = value;
    this.catchQueue.forEach(cb => {
      setTimeout(()=>{cb(this.value)}, 0);
    });
    this.status = 'rejected';
  }
}

Promise.prototype.then = function(cb){
  if(this.status === 'pending'){
    this.thenQueue.push(cb);
  }else if(this.status === 'fullfiled'){
    cb(this.value);
  }
}

Promise.prototype.catch = function(cb){
  if(this.status === 'pending'){
    this.thenQueue.push(cb);
  }else if(this.status === 'rejected'){
    cb(this.value);
  }
}

Promise.resolve = function(value){
  return new Promise((resolve)=>{resolve()})
}
Promise.reject = function(value){
  return new Promise((resolve, reject)=>{reject()})
}
