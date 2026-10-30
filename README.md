# Web3 Demo

A browser-based graph editor powered by **Vue 2**, **AntV X6**, and **Element UI**.

Edit graphs on the canvas, restore your last local session, and exchange models through JSON files.

## Get started

```sh
npm ci
npm run serve
```

Open the URL printed in the terminal.

**Node.js compatibility:** The project uses older Vue CLI and `node-sass` dependencies. Use a Node.js version compatible with the dependency versions recorded in `package-lock.json`.

## Edit a graph

### Mouse controls

| To… | Use… |
| --- | --- |
| Move around the canvas | Shift + drag |
| Zoom | Ctrl + scroll |
| Edit a cell | Right-click the cell |

On macOS, use **Command** instead of **Ctrl**.

### Keyboard shortcuts

These shortcuts apply while working on the graph canvas.

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Copy | Ctrl+C | ⌘C |
| Cut | Ctrl+X | ⌘X |
| Paste | Ctrl+V | ⌘V |
| Undo | Ctrl+Z | ⌘Z |
| Redo | Ctrl+Shift+Z | ⌘⇧Z |
| Select all nodes | Ctrl+A | ⌘A |
| Zoom in | Ctrl+1 | ⌘1 |
| Zoom out | Ctrl+2 | ⌘2 |

## Save and transfer your work

### Local saving

The editor automatically saves graph changes in your browser and reloads them when you return.

Saved data is specific to the **browser and site origin**—the protocol, hostname, and port. It is not automatically synchronized across browsers or devices.

> Clearing the site's browser storage deletes the locally saved graph. Export important models as JSON backups.

### Export a model

Click **Download model** in the toolbar to save a JSON file containing the current graph and its configuration.

### Import a model

1. Export the current graph if you need to preserve it.
2. Open the backup JSON file in a text editor and copy its contents.
3. Click **Upload existing models**.
4. Paste the JSON into the text area.
5. Click **Submit Model**.

**Before importing:**

- Import replaces the current graph; it does not merge models.
- Import restores graph data only. Configuration settings included in the exported file are not applied.

## Development

| Command | Result |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile |
| `npm run serve` | Start the development server |
| `npm run build` | Write a production build to `dist/` |
| `npm run lint -- --no-fix` | Check source without modifying files |
| `npm run lint` | Check source and apply supported fixes |
