var foo = async () => {
	await Promise.resolve('done').then(() => {
		console.log('err occur', someerror)
	});
};

foo().catch(e => (console.warn('err occur', e)));