# Web3 Demo

A graph editor built with **Vue 2**, **AntV X6**, and **Element UI**.

The editor runs in your browser, saves graph changes locally, and supports JSON export and import.

## Quick start

```sh
npm ci
npm run serve
```

Open the local URL displayed in the terminal.

> **Compatibility:** This project uses legacy Vue CLI and `node-sass` dependencies. If installation fails on a recent Node.js release, use a version compatible with the dependencies in `package-lock.json`.

## Canvas controls

| Action | Control |
| --- | --- |
| Pan | Hold Shift and drag |
| Zoom | Hold Ctrl and scroll |
| Edit a cell | Right-click the cell |

On macOS, replace **Ctrl** with **Command**, including in the shortcuts below.

### Keyboard shortcuts

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

## Model storage and backups

### How saving works

Graph changes are automatically stored in the current browser's local storage and loaded when the editor opens again.

The saved graph belongs to that **browser and site origin**. Using another browser, device, hostname, protocol, or port does not automatically transfer your saved work.

**Clearing the site's browser data removes the saved graph.** Keep a JSON backup of important models.

### Back up a model

Click **Download model** in the toolbar. The exported JSON file contains the graph and its configuration.

### Restore a model

1. Back up the current graph if you want to keep it.
2. Open the saved JSON file in a text editor and copy its contents.
3. Click **Upload existing models**.
4. Paste the JSON into the text area.
5. Click **Submit Model**.

> **Import replaces the current graph.** It does not merge models, and it restores graph data only. Configuration settings in the exported file are not applied.

## Build and lint

| Command | Description |
| --- | --- |
| `npm run build` | Generate the production build in `dist/` |
| `npm run lint -- --no-fix` | Check Vue and JavaScript source without changing files |
| `npm run lint` | Check source and automatically apply supported fixes |

Use the non-modifying lint command when you want to inspect issues before applying changes.
