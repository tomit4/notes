"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class OutputWindow {
    static get MsgChannel() {
        if (!OutputWindow._msgChannel) {
            OutputWindow._msgChannel = vscode.window.createOutputChannel('Live Sass Compile');
        }
        return OutputWindow._msgChannel;
    }
    static Show(msgHeadline, MsgBody, popUpToUI = false, addEndLine = true) {
        if (msgHeadline) {
            OutputWindow.MsgChannel.appendLine(msgHeadline);
        }
        if (MsgBody) {
            MsgBody.forEach(msg => {
                OutputWindow.MsgChannel.appendLine(msg);
            });
        }
        if (popUpToUI) {
            OutputWindow.MsgChannel.show(true);
        }
        if (addEndLine) {
            OutputWindow.MsgChannel.appendLine('--------------------');
        }
    }
    static dispose() {
        this.MsgChannel.dispose();
    }
}
exports.OutputWindow = OutputWindow;
//# sourceMappingURL=OuputWindow.js.map