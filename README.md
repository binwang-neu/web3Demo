# Web3 Demo

A browser-based graph editor built with **Vue 2**, **AntV X6**, and **Element UI**.

## Start locally

```sh
npm ci
npm run serve
```

Open the URL printed by the development server.

**Compatibility note:** This project uses older Vue CLI and `node-sass` dependencies. If installation fails with a recent Node.js release, use a version compatible with the dependencies recorded in `package-lock.json`.

## Edit your graph

### Canvas navigation

| Action | Control |
| --- | --- |
| Pan the canvas | Shift + drag |
| Zoom | Ctrl + scroll |
| Open a cell's editing dialog | Right-click the cell |

### Keyboard shortcuts

Use these shortcuts while working on the canvas. On macOS, replace **Ctrl** with **Command**.

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

## Save, back up, and restore

### Automatic local saving

Graph changes are saved in the current browser's local storage and restored when the editor opens.

Local saving has two important limits:

- **No automatic synchronization:** saved graphs are specific to the browser and site origin, including the protocol, hostname, and port.
- **No protection against cleared storage:** deleting the site's browser data also deletes the saved graph.

For important work, keep an exported JSON backup.

### Download a backup

Click **Download model** in the toolbar to export the current model as a JSON file.

### Restore a backup

1. Export the current graph if you need to preserve it.
2. Open the backup JSON file in a text editor and copy its contents.
3. Click **Upload existing models**.
4. Paste the JSON into the text area.
5. Click **Submit Model**.

> **Import replaces the current graph rather than merging with it.**
>
> Exported files include graph data and configuration settings. Import currently restores **only the graph data**; configuration settings are not applied.

## Build and check source

```sh
# Create a production build in dist/
npm run build

# Check source without modifying files
npm run lint -- --no-fix

# Check source and apply supported fixes
npm run lint
```

## Deploy under the correct base path

The production build currently uses `/antV-X6-demo/` as its base path, as configured in `vue.config.js`. Deploy the contents of `dist/` at that path so the browser can load the generated JavaScript, styles, and other assets.

If your deployment uses a different location, update the production `publicPath` in `vue.config.js` **before running `npm run build`**:

| Deployment location | Production `publicPath` |
| --- | --- |
| A domain's root, such as `https://example.com/` | `/` |
| This repository's GitHub Pages path, such as `https://binwang-neu.github.io/web3Deom/` | `/web3Deom/` |

The GitHub Pages URL above is a deployment example; building the project does not publish it automatically. Rebuild after changing `publicPath`, then publish the new `dist/` contents to your hosting service.
