const vscode = require('vscode');
const ncp = require("copy-paste");
const fs = require('fs');

module.exports = class FileShortcut {
    constructor() {
        console.log("constructor");
    }

    copyCurrentFileMarkdownLink() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('active editor undefind');
            return;
        }
        let currentFileName = editor.document.fileName;
        currentFileName = currentFileName.match(/[^\\/]+$/)[0];
        let markdownFileLink = '';
        if (currentFileName.lastIndexOf('.') != -1) {
            markdownFileLink = `[${currentFileName.substr(0, currentFileName.lastIndexOf('.'))}](${currentFileName})`;
        } else {
            markdownFileLink = `[${currentFileName}](${currentFileName})`;
        }
        ncp.copy(markdownFileLink, () => {
            vscode.window.showInformationMessage(`copy ${markdownFileLink}`);
        });
    }
    copyLineLog() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('active editor undefind');
            return;
        }
        let position = editor.selection.active.line;
        if (editor.document.lineAt(position).text != '') {
            ncp.copy(`[${new Date().toString()}] ${editor.document.lineAt(position).text}`, () => {
                vscode.window.showInformationMessage(`copy log`);
                editor.edit(editor => {
                    let range = new vscode.Range(new vscode.Position(position, 0), new vscode.Position(position + 1, 0))
                    editor.delete(range);
                });
            });
        } else {
            return;
        }
    }
    sendLineLog() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('active editor undefind');
            return;
        }
        let position = editor.selection.active.line;
        if (editor.document.lineAt(position).text != '') {
            let currentFileName = editor.document.fileName;
            let logFile = '';
            if (currentFileName.lastIndexOf('.') != -1) {
                logFile = `${currentFileName.substr(0, currentFileName.lastIndexOf('.'))}_.log`;
            } else {
                logFile = `${currentFileName}_.log`;
            }
            console.log(logFile);
            let log = `[${new Date().toString()}] ${editor.document.lineAt(position).text}` + "\n";
            console.log(log);
            fs.appendFile(logFile, log, err => {
                vscode.window.showErrorMessage(`err ${err.name + ': ' + err.message}`);
            });
            editor.edit(editor => {
                let range = new vscode.Range(new vscode.Position(position, 0), new vscode.Position(position + 1, 0))
                editor.delete(range);
            });
        } else {
            return;
        }
    }
}