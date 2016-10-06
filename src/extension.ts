import * as vscode from 'vscode';
import Beautifier from './Beautifier';
const LANGUAGES = ["scss", "sass", "css", "less"];
const tabSize = vscode.workspace.getConfiguration('editor').get("tabSize", 4);

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('beautify.format', () => {
        if (LANGUAGES.indexOf(vscode.window.activeTextEditor.document.languageId) !== -1) {
            Beautifier.beautify(vscode.window.activeTextEditor, {
                indent_size: tabSize,
            });
        }
        else {
            vscode.commands.executeCommand('editor.action.format');
        }
    }));
}