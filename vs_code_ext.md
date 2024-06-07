# VS Codium Extensions

**Themes/Aesthetics:**

- Beautify
- Borealis Theme (install via .vsix file on vscodium)
- Cobalt2 Theme Official (blue borealis)
- Cursor Column Highlight
- GlassIt Linux (or GlassIt depending)
- Nord Deep
- multi-command
- Render Line Endings

**Extensions:**

- EsLint
- Biome
- Prettier
- Live Server
- Quick-Lint-Js
- Bracket Pair Colorizer 2
- Import Cost
- Markdown Preview Enhanced
- Vim

**Language Servers:**

- HTML CSS Support
- Python (ms-python)
- Python Debugger (ms-python)
- Go (golang)
- React - Typeescript snippets (XAcademy)
- Rust (rust-lang)
- ShellCheck
- Svelte for VS Code (svelte)
- TypeScript Vue Plugin (Volar)
- Vue - Official
- Vue Language Features (Volar) (conflicts with Vue - Official)
- YAML (redhat)

## A Note on GlassIt Linux

You'll need to edit the extensions.js file for it to work with VSCodium:
If you are using VS Codium, you need to edit the extension.js file in the extension folder: ~/.vscode-oss(OR .vscode)/extensions/s-nlf-fh.glassit-{THE VERSION}-universal/, and change "code" on line 46 to "codium".

## How to Compile via vsce

clone the repo with the source code you want to use

```bash
git clone https://github.com/extension_name
```

Once in there, run npm install to make sure you have all dependencies:

```bash
npm install
```

Finally Use vsce to compile the .vsix file you'll need:

```bash
vsce package
```

And lastly use VSCode by hand to install from .vsix (found under the ... menu in the extensions submenu of vscode)
