// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import commands from './core/commands'

const extensionName = 'extension'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const { registerCommand } = vscode.commands
  Object.keys(commands).forEach((cmd: string) => {
    const replaceFunc = commands[cmd]
    const disposable = registerCommand(`${extensionName}.${cmd}`, () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        return
      }

      const originText = editor.document.getText()
      const [hasChanged, replacedText] = replaceFunc(originText)
      if (hasChanged) {
        const fullRange = new vscode.Range(
          editor.document.positionAt(0),
          editor.document.positionAt(originText.length)
        )
        editor.edit((editBuilder: vscode.TextEditorEdit) => {
          editBuilder.replace(fullRange, replacedText)
        })
      }
    })

    context.subscriptions.push(disposable)
  })
}

// this method is called when your extension is deactivated
export function deactivate() {}
