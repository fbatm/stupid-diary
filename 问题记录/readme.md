1. 老项目中为了实现多页签多账号登录，将 token 存放在了 sessionStorage 中；近期 chrome 升级后给 target="\_blank"的 a 标签默认给予了 ref="noopener"效果，导致打开的子窗口无法共享父窗口的 sessionStorage，可手动设置 rel="opener"来解决。
   - 根据 mdn 上关于[链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)的说明，opener 目前属于实验性 api，得注意测试浏览器兼容性后再落实.
2. a 标签的 download 属性此属性仅适用于同源 URL,详见 mdn 上[<a>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)
3. 仓库换行符选择`core.autocrlf`
   - 提交时转换为 LF，检出时不转换 `git config --global core.autocrlf input`  
     用 LF 换行符提交，检出后交给编辑器处理
   - 提交检出均不转换 `git config --global core.autocrlf false`  
     统一编辑器的换行符设置
4. 浮点数通过左移或右移 0 未来取整
5. react 函数组件需注意闭包问题，例如点击事件中访问到 state 是点击时的值
6. windows 下引用文件的若不注意大小写可能导致其他系统下文件查找失败
7. [pm2 用 cluster 模式启用后的 node error: spawn e2big 错误](https://zhuanlan.zhihu.com/p/74056339)

   - 跟踪代码可知 cluster 模式下调用 node 的 cluster.fork 传入的参数为 process.env 的字符串结果，部署环境中 process.env 中实际存在超多变量导致抛出异常
     ```
     // node.js cluster clients can not receive deep-level objects or arrays in the forked process, e.g.:
     // { "args": ["foo", "bar"], "env": { "foo1": "bar1" }} will be parsed to
     // { "args": "foo, bar", "env": "[object Object]"}
     // So we passing a stringified JSON here.
     clu = cluster.fork({pm2_env: JSON.stringify(env_copy), windowsHide: true});
     ```
   - 4.5.1 版本中可以通过设置`--filter_env [envs]`过滤环境变量(https://github.com/Unitech/pm2/pull/4596)
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

8. package.json 中 scripts 里的 install 命令执行时机
   - [install, postinstall: Run AFTER the package is installed](https://www.npmjs.cn/misc/scripts/)
9. 尽量不要`ReactDOM.createPortal`到 document.body 上, [see reason](https://stackoverflow.com/questions/49504546/is-it-safe-to-use-reactdom-createportal-with-document-body)
10. `transform-style: preserve-3d`会影响子元素fixed的定位: Elements with transforms act as a containing block for fixed position descendants, so position:fixed under something with a transform no longer has fixed behavior.They do work when applied to the same element; the element will be positioned as fixed, and then transformed.
   - (stackoverflow问题)[https://stackoverflow.com/questions/2637058/positions-fixed-doesnt-work-when-using-webkit-transform]
   - (W3文档)[https://www.w3.org/TR/css-transforms-1/]
11. [overflow:hidden对inline-block元素基线的影响](https://www.cnblogs.com/AliceX-J/p/5731755.html)
12. 英文中数值序列后缀st/nd/rd:
   - [规则](https://learnersdictionary.com/qa/How-To-Write-Ordinal-Numbers)
   - [示例](https://www.cnblogs.com/yu412/p/13955146.html)
