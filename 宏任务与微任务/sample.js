var promise = new Promise(function (resolve, reject) {
    console.log("A");
    resolve()
});

setTimeout(()=>{setTimeout(()=>{console.log('H');},0)},0)

setTimeout(()=>{promise.then(()=>{console.log('F')});},0)

promise.then(() => {setTimeout(()=>{console.log("B")},0)});

promise.then(() => {promise.then(()=>{console.log('I')})});

setTimeout(()=>{promise.then(()=>{console.log('G')});},0)


setTimeout(()=>{console.log("C")},0);

console.log('D');

promise.then(()=>{console.log('E')});

//浏览器环境：A D E I F G C B H
//node环境：A D E I C B F G H
//参考文章https://blog.csdn.net/eeewwwddd/article/details/80862682