
const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "rubber-duck-vscode-plugin" is now active!');

	let disposable = vscode.commands.registerCommand('extension.summonDuck', function () {

		const panel = vscode.window.createWebviewPanel(
			'rubberDuck', 
			'Rubber Duck',
			vscode.ViewColumn.Beside, 
			{}
		  );

		  const onDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'media', 'duck.jpeg')
		  );

		  const duckSrc = onDiskPath.with({ scheme: 'vscode-resource' });

		vscode.window.showInformationMessage('Rubber Duck summoned');
		panel.webview.html = getWebviewContent(duckSrc);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function getWebviewContent(path) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Rubber duck!</title>
  </head>
  <body>
	<h1 style="text-align: center;">Sup?</h1>  
	<img style="display: block; margin: auto;" src="${path}" width="300" />
  </body>
  </html>`;
  }

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
