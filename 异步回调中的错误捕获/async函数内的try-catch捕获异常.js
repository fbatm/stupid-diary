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