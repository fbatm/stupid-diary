try{
    Promise.resolve().then(()=>{console.log('error occur', someerror)})

}catch(e){console.log('caught error', e)}