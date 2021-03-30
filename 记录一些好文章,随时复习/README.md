# 记录一些文章，便于以后复习

## v8相关
1. [chrome V8工作原理](https://segmentfault.com/a/1190000037435824)

## 浏览器相关
1. [浏览器缓存机制](https://www.jianshu.com/p/54cc04190252)
2. [从Chrome源码看浏览器如何构建DOM树](https://zhuanlan.zhihu.com/p/24911872)
3. [从Chrome源码看浏览器如何计算CSS](https://zhuanlan.zhihu.com/p/25380611)
4. [从Chrome源码看浏览器的事件机制](https://zhuanlan.zhihu.com/p/25095179)
5. [从Chrome源码看事件循环](https://zhuanlan.zhihu.com/p/48522249)
6. [预加载](https://www.jianshu.com/p/14b4cbce5e27)
7. [网站性能优化](https://blog.csdn.net/john_f_lau/article/details/11020429)
8. [渲染优化](https://juejin.cn/post/6898235695245197325)
9. [现代化网站指导](https://web.dev/learn/)
10. [浏览器页签切换事件visibilitychange](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event)
11. `WebAssembly`给予浏览器执行其他语言的能力
   - [WebAssembly官网](https://webassembly.org/)
   - [Emscripten 官网](http://kripken.github.io/emscripten-site/)
   - [mdn上的说明](https://developer.mozilla.org/en-US/docs/WebAssembly)
   - [网易游戏案例](https://zhuanlan.zhihu.com/p/101686085)
   - [白鹭引擎](https://blog.csdn.net/chenqiuge1984/article/details/80131055)

## 事件循环
1. [浏览器环境与node环境下事件循环的区别](https://zhuanlan.zhihu.com/p/33058983)
2. [nodejs.org关于node事件循环的解释](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
3. [mdn关于事件循环的描述](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## cookie
1. [cookie概览](https://zhuanlan.zhihu.com/p/101315335)
   [cookie概览](https://my.oschina.net/wangzhijie/blog/4652306)
2. [cookie应用](https://zhuanlan.zhihu.com/p/31852168)

## js
1. [es5规定](http://ecma-international.org/ecma-262/5.1/)
2. [相等判断(document.all==undefined)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
3. [正则表达式尽量避免回溯](https://juejin.cn/post/6900446553790808071)
4. [es6模块](https://es6.ruanyifeng.com/#docs/module)
5. [es6模块与commjs模块的区别](https://es6.ruanyifeng.com/#docs/module-loader)
6. [html标签中class="no-js"的由来(Modernizr)](https://blog.justwd.net/2012/02/about-no-js/)
7. [js处理文件的示例](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
8. [addEventListener详解](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
9. [node-server性能优化](https://www.expressjs.com.cn/advanced/best-practice-performance.html)
10. [react-team-principles](https://overreacted.io/what-are-the-react-team-principles/)
11. [实现new操作符](https://blog.csdn.net/cc18868876837/article/details/103149502)

## css
1. [包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/All_About_The_Containing_Block)
2. [定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
3. [层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)
4. [浮动与定位的层叠](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/Stacking_and_float)

## webpack
1. [webpack实用配置](https://zhuanlan.zhihu.com/p/342035766)

## git
1. [git-workflow](https://sandofsky.com/workflow/git-workflow/)

## 安全
1. [OWASP/CheatSheetSeries](https://cheatsheetseries.owasp.org/)
2. [SSL/TSL工作原理](https://zhuanlan.zhihu.com/p/36981565)
3. 运行`npm audit`查看依赖包的安全性

## AST & compiler
1. [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)通过简易的编译器代码理解编译器
2. [how to build a programming language](https://github.com/ftomassetti/LangSandbox)
3. [AST抽象语法树](https://www.jianshu.com/p/019d449a9282)
4. [AST在线解析](https://astexplorer.net/)

## h5首屏加载优化
1. [ali方案](https://zhuanlan.zhihu.com/p/33629180)
2. [tx-qq方案](https://cloud.tencent.com/developer/article/1632630?from=article.detail.1071723)

## 其他
1. [MDN上的IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
2. [websql的api参考](https://www.runoob.com/html/html5-web-sql.html)
3. [磁盘IO](https://cloud.tencent.com/developer/article/1446715)
4. [pm2用cluster模式启用后的node error: spawn e2big错误](https://zhuanlan.zhihu.com/p/74056339)
   - 跟踪代码可知cluster模式下调用node的cluster.fork传入的参数为process.env的字符串结果，部署环境中process.env中实际存在超多变量导致抛出异常
      ```
      // node.js cluster clients can not receive deep-level objects or arrays in the forked process, e.g.:
      // { "args": ["foo", "bar"], "env": { "foo1": "bar1" }} will be parsed to
      // { "args": "foo, bar", "env": "[object Object]"}
      // So we passing a stringified JSON here.
      clu = cluster.fork({pm2_env: JSON.stringify(env_copy), windowsHide: true});
      ```
   - 4.5.1版本中可以通过设置`--filter_env [envs]`过滤环境变量(https://github.com/Unitech/pm2/pull/4596)
     配置文件中设置`filter_env`进行过滤，从代码来看，一般设置为`true`即可
     ```
      function filterEnv (envObj) {
         if (app.filter_env == true)
            return {}

         if (typeof app.filter_env === 'string') {
            delete envObj[app.filter_env]
            return envObj
         }

         var new_env = {};
         var allowedKeys = app.filter_env.reduce((acc, current) =>
                                                acc.filter( item => !item.includes(current)), Object.keys(envObj))
         allowedKeys.forEach( key => new_env[key] = envObj[key]);
         return new_env
      }
     ```
5. [chrome中，https网站上无法下载http协议的附件](https://www.ghacks.net/2020/10/08/chrome-is-blocking-downloads-here-is-why/)
   - <a target="_blank" href="http://download-link">download</a>，若download-link的response中设置了响应类型为attachment，chrome默认不会提示也不会下载；若是单纯打开一个http的网站则没问题
6. [node debug](https://zhuanlan.zhihu.com/p/30264842)
7. [react源码辅助理解](https://react.iamkasong.com/)
8. [react fiber as virtual stack frame](https://indepth.dev/posts/1007/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree)
