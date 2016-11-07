import * as vscode from 'vscode';
import Beautifier from './Beautifier';
const LANGUAGES = ["scss", "sass", "css", "less"];
const tabSize = vscode.workspace.getConfiguration('editor').get("tabSize", 4);

export function activate(context: vscode.ExtensionContext) {

    for (var i = 0, l = LANGUAGES.length; i < l; i++) {
        registerDocType(LANGUAGES[i]);
    }

    context.subscriptions.push(vscode.commands.registerCommand('beautify.format', () => {
        if (LANGUAGES.indexOf(vscode.window.activeTextEditor.document.languageId) !== -1) {
            Beautifier.beautify(vscode.window.activeTextEditor.document, null, {
                indent_size: tabSize,
            });
        }
        else {
            vscode.commands.executeCommand('editor.action.format');
        }
    }));

    function registerDocType(type) {
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
            provideDocumentFormattingEdits: (document, options, token) => {
                return Beautifier.beautify(vscode.window.activeTextEditor.document, null, {
                    indent_size: tabSize,
                });
            }
        }));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
            provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return Beautifier.beautify(vscode.window.activeTextEditor.document, new vscode.Range(start, end), {
                    indent_size: tabSize,
                });
            }
        }));
    }
}
