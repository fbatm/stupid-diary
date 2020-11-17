const PLUGINNAME = 'WebpackRemoveConsolePlugin';
const {ConcatSource} = require('webpack-sources');
const EXCLUDEREG = /[\\\/]node_modules[\\\/]/;

class WebpackRemoveConsolePlugin{
	constructor(consoleTypeArr = [], consoleRemoveFileTypes = ['.js', '.jsx']){
		if(consoleTypeArr.indexOf('log') === -1){
			consoleTypeArr.push('log');
		}

		const consoleNameArr = ['console', 'window.console'];

		this.consoleReg = new RegExp("(" + consoleNameArr.join("|") + ")" + ".(?:" + consoleTypeArr.join("|") + ")\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*NotClearConsole\\s*\\*\\/)\\s{0,};?", "gi");
		this.fileTypesReg = new RegExp(consoleRemoveFileTypes.join("|") + "$", "i");
	}

	apply(compiler){
		compiler.hooks.compilation.tap(PLUGINNAME, compilation => {
			// compilation.hooks.optimizeModules.tap(PLUGINNAME, modules => {
			// 	for(module of modules){
			// 		if(EXCLUDEREG.test(module.resource)){
			// 			return;
			// 		}
			// 		if(module._source && module._source._value){
			// 			console.info('---handle module---', module.resource)
			// 			module._source._value = module._source._value.replace(this.consoleReg, '');
			// 		}
			// 	}
					
			// });
			compilation.hooks.optimizeChunkModules.tap(PLUGINNAME, (chunks, modules) => {
				// for(const chunk of chunks){
				// 	console.info('---chunk files---', chunk.files)
				// 	for(const filename of chunk.files){
				// 		console.info('---handle chunk---', filename)
				// 	}
				// }
				for(module of modules){
					if(EXCLUDEREG.test(module.resource)){
						return;
					}
					if(this.fileTypesReg.test(module.resource) && module._source && module._source._value){
						console.info('---remove console in---', module.resource)
						module._source._value = module._source._value.replace(this.consoleReg, '');
					}
				}
			})
		});
	}
}

module.exports = WebpackRemoveConsolePlugin;