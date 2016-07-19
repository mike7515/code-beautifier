import * as vscode from 'vscode';
import jsbeautify = require("js-beautify");
import standardFormat = require("standard-format");
const tabSize = vscode.workspace.getConfiguration('editor').get("tabSize", 4);
const LANGUAGES: string[] = ['javascript', 'json', 'scss', 'sass', 'css', 'html'];

function formatCode(documentContent: String, languageId, options) {

  var formatFunc = null;

  switch (languageId) {
    case 'css':
    case 'sass':
    case 'scss':
      formatFunc = jsbeautify.css;
      break;
    case 'json':
      formatFunc = jsbeautify.js;
      break;
    case 'javascript':
      formatFunc = standardFormat.transform;
      break;
    case 'html':
      formatFunc = jsbeautify.html;
      break;
  }
  if (!formatFunc) return;
  return formatFunc(documentContent, {
    indent_size: tabSize
  });
}

function formatter() {
  let window = vscode.window;
  let range, options;

  let activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  let document = activeEditor.document;

  if (range === null) {
    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    range = new vscode.Range(start, end);
  }

  var result: vscode.TextEdit[] = [];
  var content = document.getText(range);

  var formatted = formatCode(content, document.languageId, options);
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

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('beautify.format', () => {
    if (LANGUAGES.indexOf(vscode.window.activeTextEditor.document.languageId) != -1) formatter()
    else vscode.commands.executeCommand('editor.action.format')
  }));
}