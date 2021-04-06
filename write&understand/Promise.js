function Promise(resolver){
  if(typeof resolver !== 'function'){
    throw new TypeError();
  }
  
  resolver(this.resolve, this.reject);

  this.status = 'pending';
  
  this.queue = [];
}

Promise.prototype.resolve = function(value){
  if(this.status === 'pending'){
    this.status = 'fullfilled';
  }
  this.value = value;
  while(this.queue.length){
    const {type, cb} = this.queue.shift();
    try{
      if(type === 'then'){
        this.value = cb(value);
      }
    }catch(e){
      this.reject(this.value);
    }
  }
}

Promise.prototype.reject = function(value){
  if(this.status === 'pending'){
    this.status = 'rejected';
  }
  this.value = value;
  while(this.queue.length){
    const {type, cb} = this.queue.shift();

    if(type === 'catch'){
      try{
        this.value = cb(value);
      }catch(e){
        this.reject(this.value);
      }
      break;
    }
  }
  this.resolve(this.value);
}

Promise.prototype.then = function(cb){
  this.queue.push({
    type: 'then',
    cb
  });
}

Promise.prototype.catch = function(cb){
  this.queue.push({
    type: 'catch',
    cb
  });
}

Promise.resolve = function(value){
  return new Promise((resolve)=>{resolve()})
}
Promise.reject = function(value){
  return new Promise((resolve, reject)=>{reject()})
}
