# Web3 Demo

A Vue 2 graph editor built with AntV X6 and Element UI.

## Run locally

```sh
npm ci
npm run serve
```

Open the local URL printed by the development server.

## Editor controls

Use these shortcuts while working on the graph canvas. On macOS, use Command in place of Ctrl.

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

Hold Shift and drag to pan the canvas, or hold Ctrl/Command and scroll to zoom. Right-click a cell to open its editing dialog.

## Local graph storage

Graph changes are saved in the current browser's local storage and loaded again when the editor opens. The saved graph belongs to that browser and site origin; it is not automatically synchronized to other browsers or devices.

Clearing the site's browser storage also removes this saved graph. Use the toolbar's **Download model** action to keep a separate JSON copy of important models.

### Export and restore a model

1. Click **Download model** to export the current model as a JSON file.
2. To restore it, open the JSON file in a text editor and copy its contents.
3. Click **Upload existing models**, paste the JSON into the text area, and click **Submit Model**.
4. Importing replaces the current graph rather than merging with it. Export the current graph first if you need to preserve it.

The exported file includes graph data and configuration data. The current import implementation restores the graph but does not apply the exported configuration settings.

## Other commands

- `npm run build` creates a production build in `dist/`.
- `npm run lint` checks the Vue and JavaScript source and automatically fixes supported issues.
- `npm run lint -- --no-fix` checks the source without modifying files.

The project uses older Vue CLI and `node-sass` dependencies. If installation fails on a current Node.js release, use a Node.js version compatible with the versions in `package-lock.json`.
