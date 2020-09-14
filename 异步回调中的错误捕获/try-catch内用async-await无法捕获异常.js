//async函数实际上是一个返回promise的函数，下面的写法无意义
try{
    (async ()=>{
        var p = await Promise.resolve('done');
        console.log('got p', p);
        console.log('err occur', someerror)
    })()
}catch(e){console.log('caught err', e)}