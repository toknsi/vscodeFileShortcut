const vscode = require('vscode');
const ncp = require("copy-paste");

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
        let docContent = editor.document.getText();
        console.log(docContent);
        console.log(editor.document.lineAt(1).text);
        vscode.window.showInformationMessage('copyCurrentFileMarkdownLine');
    }
}