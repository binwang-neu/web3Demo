# Web3 Demo

A browser-based graph editor built with **Vue 2**, **AntV X6**, and **Element UI**.

Edit graphs, use keyboard shortcuts, and export models as JSON files for backup or transfer.

## Getting started

Install dependencies and start the development server:

```sh
npm ci
npm run serve
```

Open the local URL printed in the terminal.

> **Compatibility:** This project uses older Vue CLI and `node-sass` dependencies. Use a Node.js version compatible with the dependency versions in `package-lock.json` if installation fails on a newer release.

## Editor controls

### Keyboard shortcuts

Use these shortcuts while working on the graph canvas. On macOS, replace **Ctrl** with **Command**.

| Action | Shortcut |
| --- | --- |
| Copy selected cells | Ctrl+C |
| Cut selected cells | Ctrl+X |
| Paste copied cells | Ctrl+V |
| Undo | Ctrl+Z |
| Redo | Ctrl+Shift+Z |
| Select all nodes | Ctrl+A |
| Zoom in | Ctrl+1 |
| Zoom out | Ctrl+2 |

### Mouse controls

| Action | Control |
| --- | --- |
| Pan the canvas | Hold Shift and drag |
| Zoom the canvas | Hold Ctrl/Command and scroll |
| Open a cell's editing dialog | Right-click the cell |

## Saving your work

Graph changes are automatically saved to the current browser's **local storage** and restored when the editor opens again.

Local storage is specific to the browser and site origin:

- Graphs are not automatically synchronized across browsers or devices.
- Opening the editor from a different origin uses separate storage.
- Clearing the site's browser data deletes the locally saved graph.

Use **Download model** to keep a separate JSON backup of important work.

## Exporting and restoring models

### Export a model

Click **Download model** in the toolbar to export the current model as a JSON file.

### Restore a model

1. Export the current graph if you want to keep it.
2. Open the saved JSON file in a text editor and copy its contents.
3. Click **Upload existing models**.
4. Paste the JSON into the text area.
5. Click **Submit Model**.

> **Import replaces the current graph.** It does not merge the imported model with existing content.

### Configuration limitation

Exported models include both graph data and configuration data. The current import implementation restores **only the graph data**; it does not apply the exported configuration settings.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies using `package-lock.json` |
| `npm run serve` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run lint` | Check Vue and JavaScript source and apply supported fixes |
| `npm run lint -- --no-fix` | Check source without modifying files |
