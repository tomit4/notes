"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Helper {
    static get configSettings() {
        return vscode.workspace.getConfiguration('liveSassCompile.settings');
    }
    static getConfigSettings(val) {
        return this.configSettings.get(val);
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map