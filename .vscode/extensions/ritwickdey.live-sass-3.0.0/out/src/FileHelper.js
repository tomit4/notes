"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class FileHelper {
    static get Instance() {
        return new FileHelper();
    }
    writeToOneFile(targetFileUri, data) {
        return new Promise((resolve) => {
            fs.writeFile(targetFileUri, data, 'utf8', (err) => {
                resolve({
                    FileUri: targetFileUri,
                    Exception: err
                });
            });
        });
    }
    writeToMultipleFile(targetFileUris, data) {
        return new Promise((resolve) => {
            let promises = [];
            for (let i = 0; i < targetFileUris.length; i++) {
                promises.push(this.writeToOneFile(targetFileUris[i], data[i]));
            }
            Promise.all(promises).then((errList) => resolve(errList));
        });
    }
    MakeDirIfNotAvailable(dir) {
        if (fs.existsSync(dir))
            return;
        if (!fs.existsSync(path.dirname(dir))) {
            this.MakeDirIfNotAvailable(path.dirname(dir));
        }
        fs.mkdirSync(dir);
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map