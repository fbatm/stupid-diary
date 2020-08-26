1、resolve.modules不要用./，会导致意想不到的问题
2、MiniCssExtractPlugin要注意css引用顺序，添加ignoreOrder: true来忽略警告
2、babel7中require.default，引用"add-module-exports"插件来兼容老代码