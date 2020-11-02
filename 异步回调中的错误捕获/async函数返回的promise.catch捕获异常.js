//这个例子有问题，跟async无关。
var foo = async () => {
	await Promise.resolve('done').then(() => {
		console.log('err occur', someerror)
	});
};

foo().catch(e => (console.warn('err caught', e)));

/************************************************************/

//无法捕获异常：这里内层的Promise跟外面没关系，就是一个异步函数执行。
var foo = async () => {
	await Promise.resolve('done').then(() => {
		// setTimeout(()=>{
		// 	throw new Error('err occur')
		// });
		Promise.resolve().then(()=>{throw new Error('err occur')})
	});
};

foo().catch(e => (console.warn('err caught', e)));

/************************************************************/

//可以捕获到异常：return的Promise也会受await影响
var foo = async () => {
	await Promise.resolve('done').then(() => {
		return Promise.resolve().then(()=>{throw new Error('err occur')})
	});
};

foo().catch(e => (console.warn('err caught', e)));

