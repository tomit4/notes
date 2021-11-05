'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const appModel_1 = require("./appModel");
const index_1 = require("./announcement/index");
function activate(context) {
    console.log('"live-sass-compiler" is now actived! Go and Debug :P ');
    let appModel = new appModel_1.AppModel();
    index_1.checkNewAnnouncement(context.globalState);
    let disposablecompileAll = vscode.commands.registerCommand('liveSass.command.watchMySass', () => {
        appModel.compileAllFiles();
    });
    let disposableStopWaching = vscode.commands.registerCommand('liveSass.command.donotWatchMySass', () => {
        appModel.StopWaching();
    });
    let disposableOneTimeCompileSass = vscode.commands.registerCommand('liveSass.command.oneTimeCompileSass', () => {
        appModel.compileAllFiles(false);
    });
    let disposableOpenOutputWindow = vscode.commands.registerCommand('liveSass.command.openOutputWindow', () => {
        appModel.openOutputWindow();
    });
    let disposableOnDivSave = vscode.workspace.onDidSaveTextDocument(() => {
        appModel.compileOnSave();
    });
    context.subscriptions.push(disposablecompileAll, disposableStopWaching, disposableOnDivSave, disposableOneTimeCompileSass, disposableOpenOutputWindow, appModel);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map