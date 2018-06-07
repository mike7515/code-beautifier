import * as vscode from 'vscode';
import Beautifier from './Beautifier';
const LANGUAGES = ["scss", "sass", "css", "less"];

export function activate(context: vscode.ExtensionContext) {

    for (var i = 0, l = LANGUAGES.length; i < l; i++) {
        registerDocType(LANGUAGES[i]);
    }

    context.subscriptions.push(vscode.commands.registerCommand('beautify.format', () => {
        if (LANGUAGES.indexOf(vscode.window.activeTextEditor.document.languageId) !== -1) {
            Beautifier.beautify(vscode.window.activeTextEditor.document);
        }
        else {
            vscode.commands.executeCommand('editor.action.format');
        }
    }));

    function registerDocType(language) {
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: language }, {
            provideDocumentFormattingEdits: (document, options, token) => {
                return Beautifier.beautify(vscode.window.activeTextEditor.document);
            }
        }));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider({ scheme: 'file', language: language }, {
            provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return Beautifier.beautify(vscode.window.activeTextEditor.document, new vscode.Range(start, end));
            }
        }));
    }
}
