// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fileShortcut = require('./fileShortcut');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "fileshortcut" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const fileshortcut = new fileShortcut();
    let disposable = vscode.commands.registerCommand('extension.copyFileMarkdownLink', function () {
        fileshortcut.copyCurrentFileMarkdownLink();
    });
    let copyLineLog = vscode.commands.registerCommand('extension.copyLineLog', function () {
        fileshortcut.copyLineLog();
    });
    let sendLineLog = vscode.commands.registerCommand('extension.sendLineLog', function () {
        fileshortcut.sendLineLog();
    });
    context.subscriptions.push(sendLineLog);
    context.subscriptions.push(disposable);
    context.subscriptions.push(copyLineLog);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;