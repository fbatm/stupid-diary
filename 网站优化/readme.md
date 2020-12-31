# 梳理下目前各项目中已应用或可应用的优化项(多数项目基于[react-starter-kit](https://github.com/kriasoft/react-starter-kit)脚手架搭建)

## web server方面(以express为例)
1. [对于material-ui之类在ssr的server侧设置prefix为all](https://github.com/mui-org/material-ui/issues/2356)
   ```
    global.navigator = global.navigator || {};
    global.navigator.userAgent = global.navigator.userAgent || 'all';
   ```
2. 用`response-time`在响应头中添加响应时间以供分析
   - 中间件引用的库`on-headers`利用改写`res.writeHead`方法来设置时间，如果后续中间件(如`serve-static`)没有用`writeHead`设置响应头就`send`了就木大。
3. 用`morgan`现成的日志记录格式
4. 用`compression`启用压缩
5. 用`helmet`设置安全的响应头,`helmet`默认启用部分中间件，可通过参数设置
   - hidePoweredBy: `x-powered-by`可以直接在express中通过`app.disable('x-powered-by')`移除
7. 避免一般情况下的堆内存溢出，添加--max-old-space-size=4096参数扩容；频繁出现此问题需要根据具体错误来定位
8. renderToNodeStream/renderToStaticNodeStream返回流
9. 预渲染



## js方面
1. 渐进式注水+骨架屏
2. 页面错误上报
3. 所有用到的第三方、window对象/方法或document对象/方法进行一层封装，以便后续升级依赖或者优化
4. 利用requestAnimationFrame实现高精度的timeout方法；相较于Date.now可优先使用精度更高的performance.now，

## css方面

## html方面
1. 对cdn的域名设置dns-prefetch
2. 结合source-map, preload当前页面所用到的js文件

## webpack配置
1. treeshaking
   - terser依赖export的静态检查来进行treeshaking，老旧代码中client侧如果有采用commonjs写法的exports需要改成es6的export
   - export default只用于导出一个变量的情景
2. source-map(配合错误上报定位出错的代码片段)
3. 访问量大的网站启用cdn（设置publicPath）
4. import的文件根据组件加载时机设置preload或prefetch
5. optimization.splitChunks.chunks设置'all';对于node_modules中的依赖设置optimization.splitChunks.{cacheGroups}.chunks为'initial'可减小首次加载的commonChunk文件的体积

## 部署
1. 根据发布版本增加目录来存放静态资源，不要每次覆盖旧版本