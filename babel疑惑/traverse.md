# 看到某项目中 jQuery 与 angularjs 的引用采用了 require 而非 import 所思

原代码类似这样

```javascript
const $ = require("jQuery");
window.jQuery = $;
const angular = require("angular");
```

想着 web 代码都改成 esmodule 看着爽些就把 require 改成了 import，

```javascript
import $ from "jquery";
window.jQuery = $;
import angular from "angular";
```

结果运行完报错，跟踪发现 angularjs 加载中会探测`window.jQuery`，无则采用自己的 jqlite，导致项目中注册的$并非 jQuery 最终导致模块中的代码错误。  
window.jQuery 咋没了？仔细看 source 文件，发现 webpack 生成出来的代码顺序不对劲，webpack_require 先引用了 jquery 与 angular 后才执行 window.jQuery 语句。  
再三思考发掘是 babel 在搞事情，上方 esmodule 的代码用 babel 编译后长这样

```javascript
var _jquery = _interopRequireDefault(require("jquery"));

var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

window.jQuery = _jquery.default;
```

这里跟着 babel 代码走搞到头晕，目前只看到@babel/traverse 某段代码处理后 AST 的结构发生了变化
