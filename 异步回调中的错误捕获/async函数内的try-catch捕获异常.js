//通过async/await将异步变为同步后可用try/catch捕获异常。

(async ()=>{
    try{
        var p = await Promise.resolve('done');
        console.log('got p', p);
        console.log('err occur', someerror)
    }catch(e){
        console.log('caught err', e)
    }
})();

/**********************************************************/

(async ()=>{
    try{
        await Promise.resolve('done').then(()=>{console.log('err occur', someerror)});
    }catch(e){
        console.log('caught err', e)
    }
})();

//目前没想到在外层捕获setTimeout异步函数异常的方法。