const PLUGINNAME = 'WebpackRemoveConsolePlugin';
const {ConcatSource} = require('webpack-sources');
const EXCLUDEREG = /[\\\/]node_modules[\\\/]/;

class WebpackRemoveConsolePlugin{
	constructor(consoleTypeArr = []){
		if(consoleTypeArr.indexOf('log') === -1){
			consoleTypeArr.push('log');
		}

		const consoleNameArr = ['console', 'window.console'];

		this.consoleReg = new RegExp("(" + consoleNameArr.join("|") + ")" + ".(?:" + consoleTypeArr.join("|") + ")\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*NotClearConsole\\s*\\*\\/)\\s{0,};?", "gi");
	}

	apply(compiler){
		compiler.hooks.compilation.tap(PLUGINNAME, compilation => {
			// compilation.hooks.buildModule.tap(PLUGINNAME, module => {
			// 	if(EXCLUDEREG.test(module.resource)){
			// 		return;
			// 	}
			// 	if(module._source && module._source._value){
			// 		module._source._value = module._source._value.replace(this.consoleReg, '');

			// 	}
			// 	console.log(module)
			// });
			compilation.hooks.optimizeChunkAssets.tap(PLUGINNAME, chunks => {
				for(const chunk of chunks){
					for(const filename of chunk.files){
						const resultStr = compilation.assets[filename].source().replace(this.consoleReg, '');
						compilation.assets[filename] = new ConcatSource(resultStr);
					}
				}
			})
		});
	}
}

module.exports = WebpackRemoveConsolePlugin;