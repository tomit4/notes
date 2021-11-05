"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SassCompiler = require("sasslib/sass.node.js");
class SassHelper {
    static get instance() {
        return new SassHelper();
    }
    static targetCssFormat(format) {
        return {
            style: SassCompiler.Sass.style[format],
        };
    }
    compileOne(SassPath, options) {
        return new Promise((resolve, reject) => {
            SassCompiler(SassPath, options, (result) => {
                if (result.status === 0) {
                    if (!result.text) {
                        result.text = '/* No CSS */';
                    }
                }
                else {
                    result.text = `/* \n Error: ${result.formatted} \n */`;
                }
                resolve(result);
            });
        });
    }
    compileMultiple(sassPaths, option) {
        return new Promise((resolve, reject) => {
            let promises = [];
            sassPaths.forEach(sassPath => {
                promises.push(this.compileOne(sassPath, option));
            });
            Promise.all(promises).then(results => resolve(results));
        });
    }
}
exports.SassHelper = SassHelper;
//# sourceMappingURL=SassCompileHelper.js.map