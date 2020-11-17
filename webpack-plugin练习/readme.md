试验webpack4 plugin
1. `optimizeChunkAssets`阶段，`chunk.files`包含了`node_modules`依赖。
2. `optimizeModules`阶段，不包含`chunks`，处理不了chunk file。
3. 在处理modules的阶段可根据文件source，避开`node_modules`。

本想针对项目文件目录进行处理，但是代码分割后文件基本都在chunk中，compilation的阶段中chunk都是打包后的文件，结果问题落在了console的正则上。

试验终止。`webpack.optimize`设置`terserOption.drop_console`为`true`即可。