1. 老项目中为了实现多页签多账号登录，将token存放在了sessionStorage中；近期chrome升级后给target="_blank"的a标签默认给予了ref="noopener"效果，导致打开的子窗口无法共享父窗口的sessionStorage，可手动设置rel="opener"来解决。
   - 根据mdn上关于[链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)的说明，opener目前属于实验性api，得注意测试浏览器兼容性后再落实.
2. a标签的download属性此属性仅适用于同源 URL,详见mdn上[<a>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)
3. 仓库换行符选择`core.autocrlf`
   - 提交时转换为LF，检出时不转换 `git config --global core.autocrlf input`    
   用LF换行符提交，检出后交给编辑器处理
   - 提交检出均不转换 `git config --global core.autocrlf false`   
   统一编辑器的换行符设置
4. 浮点数通过左移或右移0未来取整
5. react函数组件需注意闭包问题，例如点击事件中访问到state是点击时的值