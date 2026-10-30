# Web3 Demo

A graph editor built with **Vue 2**, **AntV X6**, and **Element UI**.

Create and edit graphs in your browser, save changes locally, and export models as JSON backups.

## Quick start

```sh
npm ci
npm run serve
```

Open the development server URL shown in the terminal.

> This project uses legacy Vue CLI and `node-sass` dependencies. If installation fails, check that your Node.js version is compatible with the versions in `package-lock.json`.

## Working with the editor

### Canvas interactions

- **Pan:** hold Shift and drag.
- **Zoom:** hold Ctrl and scroll, or Command and scroll on macOS.
- **Edit a cell:** right-click it to open its editing dialog.

### Keyboard shortcuts

Use these shortcuts while working on the canvas. On macOS, use **Command** instead of **Ctrl**.

| Action | Shortcut |
| --- | --- |
| Copy selected cells | Ctrl+C |
| Cut selected cells | Ctrl+X |
| Paste | Ctrl+V |
| Undo | Ctrl+Z |
| Redo | Ctrl+Shift+Z |
| Select all nodes | Ctrl+A |
| Zoom in | Ctrl+1 |
| Zoom out | Ctrl+2 |

## Saving and restoring models

### Automatic saving

Graph changes are saved to the browser's local storage and loaded when you reopen the editor.

This is local persistence, not a separate backup. Saved graphs are tied to the browser and site origin, are not synchronized across devices, and are removed when you clear the site's browser data.

### Export a backup

Click **Download model** in the toolbar to save the current model as a JSON file.

Keep this file if you need to preserve a model independently of browser storage or transfer it to another browser.

### Restore from a backup

1. Back up the current graph if you want to keep it.
2. Open the exported JSON file in a text editor and copy its contents.
3. Click **Upload existing models** in the editor.
4. Paste the JSON into the text area.
5. Click **Submit Model**.

> **Restoring replaces the current graph.** Imported content is not merged with the existing graph.

### What a backup restores

The exported JSON contains graph data and configuration data. Import currently restores **graph data only**; exported configuration settings are not applied.

## Development commands

| Command | Description |
| --- | --- |
| `npm run serve` | Start the development server |
| `npm run build` | Generate the production build in `dist/` |
| `npm run lint -- --no-fix` | Check source without changing files |
| `npm run lint` | Check source and automatically fix supported issues |

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Installation fails | Verify Node.js compatibility with the locked Vue CLI and `node-sass` versions |
| A saved graph is missing | Confirm you are using the same browser and site origin, and that site data has not been cleared |
| Imported configuration does not take effect | Configuration restoration is not currently supported; only graph data is restored |
