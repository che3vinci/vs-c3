// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// const testDocumentUri = vscode.Uri.parse('untitled:test.ts');
const emptyRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));

const defaultActions = ['source.addMissingImports', 'source.removeUnused'];

const performSourceAction = async (actions: string[] = defaultActions) => {
	for (const action of actions) {
		const fixes = await vscode.commands.executeCommand<vscode.CodeAction[]>('vscode.executeCodeActionProvider',
			vscode.Uri.parse(vscode.window.activeTextEditor!.document.uri.fsPath),
			emptyRange, action
		);
		await vscode.workspace.applyEdit(fixes![0].edit!);
	}

};

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"c3.formatDocument",
		async () => {
			await performSourceAction();
			await vscode.commands.executeCommand('editor.action.formatDocument');
		}
	);
	context.subscriptions.push(disposable);

	//TODO: add an entry point for `vs command`
	const disposable1 = vscode.commands.registerCommand('c3.showAllCommand', async () => {
		const cmds = await vscode.commands.getCommands();
		for (const e of cmds) {
			console.log(e);
		}
	});
	context.subscriptions.push(disposable1);

}

// this method is called when your extension is deactivated
export function deactivate() { }
