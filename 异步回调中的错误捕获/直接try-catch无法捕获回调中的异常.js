//try/catch只能捕获同步的错误，setTimeout、Promise.then一类的异步函数中错误无法捕获

try{
    Promise.resolve().then(()=>{console.log('error occur', someerror)})

}catch(e){console.log('caught error', e)}


try{
	setTimeout(()=>{throw new Error('error occur')});
}catch(e){
	console.log('error caught', e)
}