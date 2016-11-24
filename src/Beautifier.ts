import * as vscode from 'vscode';
import * as jsbeautify from 'js-beautify';
const tabSize = vscode.workspace.getConfiguration('beautify').get<number>("tabSize");
const options = vscode.workspace.getConfiguration('beautify').get<number>("options");

export default class Beautifier {
    public static beautify(document: vscode.TextDocument, range?: vscode.Range): any {
        let activeEditor = vscode.window.activeTextEditor;

        if (!activeEditor) {
            return;
        }

        if (range === null) {
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        let originalText: string = document.getText(range);
        let formattedText: string = jsbeautify.css(originalText, Object.assign({
            indent_size: tabSize
        }, options));
        if (formattedText && originalText !== formattedText) {
            activeEditor.edit(function (editor) {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                editor.replace(range, formattedText);
            });
        }
        return formattedText;
    }
}