# 记录下之前升级一些依赖包的问题

## webpack1升级到4
1. resolve.modules不要用./，会导致意想不到的问题
2. MiniCssExtractPlugin要注意css引用顺序，添加ignoreOrder: true来忽略警告

## webpack4升5
1. 由于5移除了node中内置方法的polyfill，项目中引用了node中依赖的地方按照webpack控制台中的提升设置resolve即可；
2. 项目中用到了process的地方，引入process模块然后设置resolve即可（其他node变量也可参考webpack4中的打包结果找到所需引用的依赖）；

## babel6升级到7
1. babel7中require.default，引用"add-module-exports"插件来兼容老代码

## react-redux5升级到7
1. 5版采用的是childContext来传递store，升级到7后需要用react-redux的provider包裹住来传递store

## react-codemod & jscodeshift
1. react升级时批量修改代码利用官方提供的react-codemod脚本，最终是运行`jscodeshift`来执行,jscodeshift如要使用自己的babel配置文件，需要设置--parser=babylon，以使--parser-config=FILE生效
   原因见源码如下，可见官方希望使用自己的babel config时使用babylon作为parser
   ```
    //.getParser.js
    module.exports = function getParser(parserName, options) {
      switch (parserName) {
        case "babylon":
          return require("../parser/babylon")(options);
        case "flow":
          return require("../parser/flow")(options);
        case "ts":
          return require("../parser/ts")(options);
        case "tsx":
          return require("../parser/tsx")(options);
        case "babel":
        default:
          return require("../parser/babel5Compat")(options);
      }
    };
   ```
   ```
   //.babel5Compat.js
   /**
    * Wrapper to set default options. Doesn't accept custom options because in that
    * case babylon should be used instead.
    */
    module.exports = function() {
      return {
        parse(code) {
          return babylon.parse(code, options);
        },
      };
    };
   ```
   ```
   //.babylon.js
   /**
    * Wrapper to set default options
    */
    module.exports = function(options=defaultOptions) {
      return {
        parse(code) {
          return babylon.parse(code, options);
        },
      };
    };
   ```