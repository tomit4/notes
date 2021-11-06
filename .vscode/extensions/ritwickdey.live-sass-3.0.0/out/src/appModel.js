'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const FileHelper_1 = require("./FileHelper");
const SassCompileHelper_1 = require("./SassCompileHelper");
const OuputWindow_1 = require("./OuputWindow");
const helper_1 = require("./helper");
const StatubarUi_1 = require("./StatubarUi");
class AppModel {
    constructor() {
        this.isWatching = false;
        StatubarUi_1.StatusBarUi.init();
    }
    static get basePath() {
        return vscode.workspace.rootPath || path.basename(vscode.window.activeTextEditor.document.fileName);
    }
    /**
     * Compile All file with watch mode.
     * @param WatchingMode WatchingMode = false for without watch mode.
     */
    compileAllFiles(WatchingMode = true) {
        if (this.isWatching) {
            vscode.window.showInformationMessage('already watching...');
            return;
        }
        StatubarUi_1.StatusBarUi.working();
        let showOutputWindow = helper_1.Helper.getConfigSettings('showOutputWindow');
        this.GenerateAllCssAndMap(showOutputWindow).then(() => {
            if (!WatchingMode) {
                this.isWatching = true; // tricky to toggle status
            }
            this.toggleStatusUI();
        });
    }
    openOutputWindow() {
        OuputWindow_1.OutputWindow.Show(null, null, true);
    }
    compileOnSave() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isWatching)
                return;
            let currentFile = vscode.window.activeTextEditor.document.fileName;
            if (!this.isASassFile(currentFile, true))
                return;
            // if (!(await this.isSassFileIncluded(fileUri, '**/*.s[a|c]ss'))) return;
            OuputWindow_1.OutputWindow.Show('Change Detected...', [path.basename(currentFile)]);
            if (!this.isASassFile(currentFile)) {
                this.GenerateAllCssAndMap(false).then(() => {
                    OuputWindow_1.OutputWindow.Show('Watching...', null);
                });
            }
            else {
                let formats = helper_1.Helper.getConfigSettings('formats');
                let sassPath = currentFile;
                formats.forEach(format => {
                    let options = this.getCssStyle(format.format);
                    let cssMapPath = this.generateCssAndMapUri(sassPath, format.savePath, format.extensionName);
                    this.GenerateCssAndMap(sassPath, cssMapPath.css, cssMapPath.map, options)
                        .then(() => {
                        OuputWindow_1.OutputWindow.Show('Watching...', null);
                    });
                });
            }
        });
    }
    StopWaching() {
        if (this.isWatching) {
            this.toggleStatusUI();
        }
        else {
            vscode.window.showInformationMessage('not watching...');
        }
    }
    toggleStatusUI() {
        this.isWatching = !this.isWatching;
        let showOutputWindow = helper_1.Helper.getConfigSettings('showOutputWindow');
        if (!this.isWatching) {
            StatubarUi_1.StatusBarUi.notWatching();
            OuputWindow_1.OutputWindow.Show('Not Watching...', null, showOutputWindow);
        }
        else {
            StatubarUi_1.StatusBarUi.watching();
            OuputWindow_1.OutputWindow.Show('Watching...', null, showOutputWindow);
        }
    }
    isSassFileIncluded(sassPath, queryPatten = '**/[^_]*.s[a|c]ss') {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield this.getSassFiles(queryPatten);
            return files.find(e => e === sassPath) ? true : false;
        });
    }
    isASassFile(pathUrl, partialSass = false) {
        const filename = path.basename(pathUrl);
        return (partialSass || !filename.startsWith('_')) && (filename.endsWith('sass') || filename.endsWith('scss'));
    }
    getSassFiles(queryPatten = '**/[^_]*.s[a|c]ss') {
        let excludedList = helper_1.Helper.getConfigSettings('excludeList');
        let includeItems = helper_1.Helper.getConfigSettings('includeItems');
        let options = {
            ignore: excludedList,
            mark: true,
            cwd: AppModel.basePath
        };
        if (includeItems && includeItems.length) {
            if (includeItems.length === 1) {
                queryPatten = includeItems[0];
            }
            else {
                queryPatten = `{${includeItems.join(',')}}`;
            }
        }
        return new Promise(resolve => {
            glob(queryPatten, options, (err, files) => {
                if (err) {
                    OuputWindow_1.OutputWindow.Show('Error To Seach Files', err, true);
                    resolve([]);
                    return;
                }
                const filePaths = files
                    .filter(file => this.isASassFile(file))
                    .map(file => path.join(AppModel.basePath, file));
                return resolve(filePaths || []);
            });
        });
    }
    /**
     * [Deprecated]
     * Find ALL Sass & Scss from workspace & It also exclude Sass/Scss from exclude list settings
     * @param callback - callback(filepaths) with be called with Uri(s) of Sass/Scss(s) (string[]).
     */
    findAllSaasFilesAsync(callback) {
        this.getSassFiles().then(files => callback(files));
    }
    /**
     * To Generate one One Css & Map file from Sass/Scss
     * @param SassPath Sass/Scss file URI (string)
     * @param targetCssUri Target CSS file URI (string)
     * @param mapFileUri Target MAP file URI (string)
     * @param options - Object - It includes target CSS style and some more.
     */
    GenerateCssAndMap(SassPath, targetCssUri, mapFileUri, options) {
        let generateMap = helper_1.Helper.getConfigSettings('generateMap');
        let autoprefixerTarget = helper_1.Helper.getConfigSettings('autoprefix');
        let showOutputWindow = helper_1.Helper.getConfigSettings('showOutputWindow');
        return new Promise(resolve => {
            SassCompileHelper_1.SassHelper.instance.compileOne(SassPath, options)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result.status !== 0) {
                    OuputWindow_1.OutputWindow.Show('Compilation Error', [result.formatted], showOutputWindow);
                    StatubarUi_1.StatusBarUi.compilationError(this.isWatching);
                    if (!showOutputWindow) {
                        vscode.window.setStatusBarMessage(result.formatted.split('\n')[0], 4500);
                    }
                    resolve(true);
                }
                else {
                    let promises = [];
                    let mapFileTag = `/*# sourceMappingURL=${path.basename(targetCssUri)}.map */`;
                    if (autoprefixerTarget) {
                        result.text = yield this.autoprefix(result.text, autoprefixerTarget);
                    }
                    if (!generateMap) {
                        promises.push(FileHelper_1.FileHelper.Instance.writeToOneFile(targetCssUri, `${result.text}`));
                    }
                    else {
                        promises.push(FileHelper_1.FileHelper.Instance.writeToOneFile(targetCssUri, `${result.text}${mapFileTag}`));
                        let map = this.GenerateMapObject(result.map, targetCssUri);
                        promises.push(FileHelper_1.FileHelper.Instance.writeToOneFile(mapFileUri, JSON.stringify(map, null, 4)));
                    }
                    Promise.all(promises).then(fileResolvers => {
                        OuputWindow_1.OutputWindow.Show('Generated :', null, false, false);
                        StatubarUi_1.StatusBarUi.compilationSuccess(this.isWatching);
                        fileResolvers.forEach(fileResolver => {
                            if (fileResolver.Exception) {
                                OuputWindow_1.OutputWindow.Show('Error:', [
                                    fileResolver.Exception.errno.toString(),
                                    fileResolver.Exception.path,
                                    fileResolver.Exception.message
                                ], true);
                                console.error('error :', fileResolver);
                            }
                            else {
                                OuputWindow_1.OutputWindow.Show(null, [fileResolver.FileUri], false, false);
                            }
                        });
                        OuputWindow_1.OutputWindow.Show(null, null, false, true);
                        resolve(true);
                    });
                }
            }));
        });
    }
    /**
     * To compile all Sass/scss files
     * @param popUpOutputWindow To control output window.
     */
    GenerateAllCssAndMap(popUpOutputWindow) {
        let formats = helper_1.Helper.getConfigSettings('formats');
        return new Promise((resolve) => {
            this.findAllSaasFilesAsync((sassPaths) => {
                OuputWindow_1.OutputWindow.Show('Compiling Sass/Scss Files: ', sassPaths, popUpOutputWindow);
                let promises = [];
                sassPaths.forEach((sassPath) => {
                    formats.forEach(format => {
                        let options = this.getCssStyle(format.format);
                        let cssMapUri = this.generateCssAndMapUri(sassPath, format.savePath, format.extensionName);
                        promises.push(this.GenerateCssAndMap(sassPath, cssMapUri.css, cssMapUri.map, options));
                    });
                });
                Promise.all(promises).then((e) => resolve(e));
            });
        });
    }
    /**
     * Generate Map Object
     * @param mapObject Generated Map object form Sass.js library
     * @param targetCssUri Css URI
     */
    GenerateMapObject(mapObject, targetCssUri) {
        let map = {
            'version': 3,
            'mappings': '',
            'sources': [],
            'names': [],
            'file': ''
        };
        map.mappings = mapObject.mappings;
        map.file = path.basename(targetCssUri);
        mapObject.sources.forEach((source) => {
            // path starts with ../saas/<path> or ../< path>
            if (source.startsWith('../sass/')) {
                source = source.substring('../sass/'.length);
            }
            else if (source.startsWith('../')) {
                source = source.substring('../'.length);
            }
            if (process.platform !== 'win32') {
                source = '/' + source; // for linux, maybe for MAC too
            }
            let testpath = path.relative(path.dirname(targetCssUri), source);
            testpath = testpath.replace(/\\/gi, '/');
            map.sources.push(testpath);
        });
        return map;
        //  this.writeToFileAsync(mapFileUri, JSON.stringify(map, null, 4));
    }
    generateCssAndMapUri(filePath, savePath, _extensionName) {
        let extensionName = _extensionName || '.css'; // Helper.getConfigSettings<string>('extensionName');
        // If SavePath is NULL, CSS uri will be same location of SASS.
        if (savePath) {
            try {
                let workspaceRoot = vscode.workspace.rootPath;
                let generatedUri = null;
                if (savePath.startsWith('~'))
                    generatedUri = path.join(path.dirname(filePath), savePath.substring(1));
                else
                    generatedUri = path.join(workspaceRoot, savePath);
                FileHelper_1.FileHelper.Instance.MakeDirIfNotAvailable(generatedUri);
                filePath = path.join(generatedUri, path.basename(filePath));
            }
            catch (err) {
                console.log(err);
                OuputWindow_1.OutputWindow.Show('Error:', [
                    err.errno.toString(),
                    err.path,
                    err.message
                ], true);
                throw Error('Something Went Wrong.');
            }
        }
        let cssUri = filePath.substring(0, filePath.lastIndexOf('.')) + extensionName;
        return {
            css: cssUri,
            map: cssUri + '.map'
        };
    }
    getCssStyle(format) {
        let outputStyleFormat = format || 'expanded'; // Helper.getConfigSettings<string>('format');
        return SassCompileHelper_1.SassHelper.targetCssFormat(outputStyleFormat);
    }
    /**
     * Autoprefixes CSS properties
     *
     * @param css String representation of CSS to transform
     * @param target What browsers to be targeted, as supported by [Browserslist](https://github.com/ai/browserslist)
     */
    autoprefix(css, browsers) {
        return __awaiter(this, void 0, void 0, function* () {
            let showOutputWindow = helper_1.Helper.getConfigSettings('showOutputWindow');
            const prefixer = postcss([
                autoprefixer({
                    browsers,
                    grid: true
                })
            ]);
            return yield prefixer
                .process(css)
                .then(res => {
                res.warnings().forEach(warn => {
                    OuputWindow_1.OutputWindow.Show('Autoprefix Error', [warn.text], showOutputWindow);
                });
                return res.css;
            });
        });
    }
    dispose() {
        StatubarUi_1.StatusBarUi.dispose();
        OuputWindow_1.OutputWindow.dispose();
    }
}
exports.AppModel = AppModel;
//# sourceMappingURL=appModel.js.map