import * as vscode from 'vscode';
import * as jsbeautify from 'js-beautify';

export default class Beautifier {
    public static beautify(activeEditor: vscode.TextEditor, options?) {
        let range;
        if (!activeEditor) {
            return;
        }
        let document = activeEditor.document;

        if (range === null) {
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        let formatted = jsbeautify.css(document.getText(range), options);
        if (formatted) {
            activeEditor.edit(function (editor) {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                editor.replace(range, formatted);
            });
        }
        return formatted;
    }
}